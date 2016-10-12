
var Cutscene = {

	scene: null,

	filePath: null,

	curFrame:0,

	curText:null,

	preload: function(){
		game.load.spritesheet('scene','assets/images/Cutscenes/Act-1/1_1.png',1600,900,6);
	},
	
	create: function() {
		Cutscene.curFrame=0;
		console.log("CutScene");

		Cutscene.scene=game.add.sprite(0,0,'scene');
		Cutscene.scene.width=game.world.width;
		Cutscene.scene.height=game.world.height;
		game.input.onDown.add(this.nextScreen);

		

	},

	update: function() {

	},

	nextScreen: function(z){
		Cutscene.curFrame++;
		if (Cutscene.curFrame<Cutscene.scene.animations.frameTotal){
			Cutscene.scene.animations.frame=Cutscene.curFrame;
		} else {
			game.state.start("Play");
		}
	}



}