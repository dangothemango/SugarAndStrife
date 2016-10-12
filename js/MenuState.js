
var MenuState = {
	
	preload: function() {
		game.load.atlasJSONHash('startButton', 'assets/images/buttons/play_buttons.png','assets/images/buttons/play_buttons.json');
		game.load.image('menubg', 'assets/images/title.png');
	},

	
	create: function() {

		console.log("Menu State");
		bg = game.add.sprite(0,0, 'menubg');
		var startButton = game.add.button(game.world.centerX-155,game.world.centerY + 85,'startButton',startLevel,this,'Up', 'Static', 'Down', 'Static');
		
		startButton.scale.set(0.6,0.6);
	},

	update: function () {

	}

}
