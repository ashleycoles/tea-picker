const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    team: [
        {
            name: String,
            drink: String
        }
    ]
});

module.exports = mongoose.model('Team', teamSchema);