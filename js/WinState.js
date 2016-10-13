
var WinState = {
	
	preload: function() {
		
	},

	create: function() {

		console.log("Win State");

		PlayState.levelNum=0;

		PlayState.won=true;

		game.state.start('Menu');

	},

	update: function() {

	},

}