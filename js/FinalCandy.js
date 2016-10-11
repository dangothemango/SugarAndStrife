
var FinalCandy= {
	
	sprite:  null,

	effectOrder: ['tentacles','explosive','implosion','mind_control','poison','slimification'],

	createSprite: function(effects, currentColor,sparkly){
		this.sprite=game.add.sprite(1165,420,'candy','base');
		this.sprite.tint=PlayState.hexFromArray(currentColor);
		this.sprite.addChild(game.add.sprite(0,0,'candy','overlay'));
		for (var eItr = 0; eItr<this.effectOrder.length; eItr++){
			var es = this.effectOrder[eItr];
			if (effects.indexOf(es)!==-1){
				this.sprite.addChild(game.add.sprite(0,0,'candy',es));
			}
		}
		if (sparkly){
			this.sprite.addChild(game.add.sprite(0,0,'candy','sparkly'));
		}
		this.sprite.anchor.set(.5,.5);
		for (var sC = 0; sC<this.sprite.children.length; sC++){
			this.sprite.children[sC].anchor.set(.5,.5);
		}
	}

}