const Joi = require('joi');
const express = require('express');
const EventEmitter = require('events');
const app = express();
const TeamModel = require('./app/models/team');
const mongoose = require('mongoose');
const Team = require('./app/team');
const picker = require('./app/picker');

app.use(express.json());

mongoose.connect('mongodb://tea-picker:tea-picker@tea-picker-shard-00-00-g1llr.mongodb.net:27017,tea-picker-shard-00-01-g1llr.mongodb.net:27017,tea-picker-shard-00-02-g1llr.mongodb.net:27017/test?ssl=true&replicaSet=tea-picker-shard-0&authSource=admin&retryWrites=true', 
{
    useMongoClient: true
});

// Is there a better way of using events rather than loading the object in constructors?
const emitter = new EventEmitter();

app.get('/api/create-team', (request, response) => {
    // To Do - Move this code into the team class
    const team = new TeamModel({
        _id: new mongoose.Types.ObjectId(),
    })
    return team.save().then(result => {
        const teamId = result._id;
        response.send(JSON.stringify(teamId));
        return;
    })
    .catch(err => {
        console.log(err);
    })
    
});

// Add users to a team
app.post('/api/add-user', (request, response) => {
    // TO DO - Add Team ID
    const schema = {
        name: Joi.string().min(3).required(),
        drink: Joi.string().min(2).required()
    };

    const validate = Joi.validate(request.body, schema);

    if (validate.error) {
        response.status(400).send(validate.error.details[0].message);
        return;
    }

    const user = request.body;
    const team = new Team(emitter);
    // To Do - update the team in the database to include the new user
    response.send(JSON.stringify(team.addUser(user)));
});

// Pick the user 
app.post('/api/picker', (request, response) => {
    // TO DO - validate the team objects as well
    const schema = {
        team: Joi.array().min(2).required()
    };

    const validate = Joi.validate(request.body, schema);

    if (validate.error) {
        response.status(400).send(validate.error.details[0].message);
        return;
    }

    const team = request.body.team;
    const teaPicker = new picker(team, emitter);
    response.send(JSON.stringify(teaPicker.pick()));
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));

// Testing emitters
emitter.on('userPicked', (arg) => {
    console.log('user picked!', arg);
});
