
var PlayState = {

	preload: function(){
		game.load.atlasJSONHash('tmpButton', 'assets/images/buttons/blank_buttons.png','assets/images/buttons/blank_buttons.json');
	},

	create: function() {

		console.log("Play State");

		var tmpButton = game.add.button(game.world.centerX-247,game.world.centerY-79,'tmpButton',playstateTest,this,'Static','Static','Down','Up');

	},

	update: function() {


	}

}