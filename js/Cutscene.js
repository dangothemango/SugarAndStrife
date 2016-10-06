
var Cutscene = {

	preload: function(){

	},
	
	create: function() {

		console.log("CutScene");

		var style = { font: "65px Arial", fill:"ffffff", align: "center"}

		var cutsceneTextRender = game.add.text(game.world.centerX-300,game.world.height-200,
												cutsceneText,style);

		

	},

	update: function() {
		if (game.input.activePointer.isDown){
			game.state.start('Play');
		}
	}

}