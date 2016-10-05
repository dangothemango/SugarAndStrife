
var MenuState = {
	
	preload: function() {
		game.load.atlasJSONHash('startButton', 'assets/images/buttons/play_buttons.png','assets/images/buttons/play_buttons.json');
	},


	create: function() {

		console.log("Menu State");

		var startButton = game.add.button(game.world.centerX-247,game.world.centerY-79,'startButton',startGame,this,'Static','Static','Down','Up');

	},

	update: function () {

	}


}