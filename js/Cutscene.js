
var Cutscene = {

	preload: function(){

	},
	
	create: function() {

		console.log("CutScene");

		var cutsceneTextRender = game.add.text(game.world.centerX-300,game.world.height-200,
												cutsceneText,style);

		

	},

	update: function() {
		if (game.input.activePointer.isDown){
			game.state.start('Play');
		}
	}

}