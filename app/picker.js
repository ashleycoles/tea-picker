class Picker {
	constructor(team, emitter) {
		this.team = team;
		this.emitter = emitter;
	}
	// Picks a member of the team to make the drinks
	pick() {
		let teamCount = this.team.length;
		// Pick the team member using a random number
		let pickedId = Math.floor(Math.random() * teamCount);
		this.picked = this.team[pickedId];

		let result = {
			"picked": this.picked,
			"drinks": this.getDrinks()
		};
		// Fire an event when a user is picked, could be used to send email etc
		this.emitter.emit('userPicked', result);

		return result;
	}
	// Returns the list drinks to be made
	getDrinks() {
		// Just returning the team for now
		return this.team;
	}
}

module.exports = Picker;
