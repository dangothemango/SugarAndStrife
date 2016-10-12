
var Cutscene = {

	scene: null,

	filePath: null,

	curFrame:0,

	curText:null,

	sceneData: null,

	preload: function(){
		game.load.spritesheet('scene','assets/images/Cutscenes/'+Cutscene.sceneData.path,1600,900,Cutscene.sceneData.frames);
	},
	
	create: function() {
		Cutscene.curFrame=0;
		console.log("CutScene");

		Cutscene.scene=game.add.sprite(0,0,'scene');
		Cutscene.scene.width=game.world.width;
		Cutscene.scene.height=game.world.height;
		game.input.onDown.add(this.nextScreen);

		Cutscene.curText=game.add.text(0,0,Cutscene.sceneData.text[Cutscene.curFrame],CSStyle);

	},

	update: function() {

	},

	nextScreen: function(z){
		Cutscene.curFrame++;
		Cutscene.curText.destroy();
		if (Cutscene.curFrame<Cutscene.sceneData.frames){
			Cutscene.curText=game.add.text(Cutscene.sceneData.tCoords[Cutscene.curFrame].x,Cutscene.sceneData.tCoords[Cutscene.curFrame].y,Cutscene.sceneData.text[Cutscene.curFrame],CSStyle);
			Cutscene.scene.animations.frame=Cutscene.curFrame;
		} else {
			game.state.start("Play");
		}
	}



}