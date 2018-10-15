const TeamModel = require('./models/team');
const mongoose = require('mongoose');

class Team {
    constructor(emitter) {
        this.team = [];
        this.emitter = emitter;
    }

    // Adds a user to a team
    addUser(user) {
        this.team.push(user);
        // Fire an event when user added
        this.emitter.emit('userAddedToTeam', this.team);
        // Return the new team
        return this.team;
    }
}

module.exports = Team;
