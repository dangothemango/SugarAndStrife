
var FinalCandy= {
	
	sprite:  null,

	effectOrder: ['tentacles','explosive','implosion','mind_control','poison','slimification'],

	createSprite: function(effects, currentColor,sparkly){
		FinalCandy.sprite=game.add.sprite(1165,515,'candy','base');
		FinalCandy.sprite.tint=PlayState.hexFromArray(currentColor);
		FinalCandy.sprite.addChild(game.add.sprite(0,0,'candy','overlay'));
		for (var eItr = 0; eItr<FinalCandy.effectOrder.length; eItr++){
			var es = FinalCandy.effectOrder[eItr];
			if (effects.indexOf(es)!==-1){
				FinalCandy.sprite.addChild(game.add.sprite(0,0,'candy',es));
			}
		}
		if (sparkly){
			FinalCandy.sprite.addChild(game.add.sprite(0,0,'candy','sparkly'));
		}
		FinalCandy.sprite.anchor.set(.5,1);
		FinalCandy.sprite.scale.set(0,0);
		for (var sC = 0; sC<FinalCandy.sprite.children.length; sC++){
			FinalCandy.sprite.children[sC].anchor.set(.5,1);
		}

		game.add.tween(FinalCandy.sprite.scale).to({ x: 1, y: 1}, 1250, Phaser.Easing.Quadratic.In, true, 1000);
		game.add.tween(FinalCandy.sprite).to({y:-250}, 2500, Phaser.Easing.Quadratic.In, true, 2750).onComplete.add(FinalCandy.animFinish,game);
	},

	animFinish:function(target,tween){
		console.log('finish');
	}

}