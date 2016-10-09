
var Cutscene = {

	preload: function(){

	},
	
	create: function() {

		console.log("CutScene");

		var cutsceneTextRender = game.add.text(game.world.centerX-300,game.world.height-200,
												cutsceneText,style);

		game.input.onDown.add(this.nextScreen);

		

	},

	update: function() {

	},

	nextScreen: function(){
		game.state.start("Play");
	}



}