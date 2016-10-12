

var Book = {
	
	curPage: 0,

	background: null,

	spriteGroup: null,

	open: function(){
		//game.input.onDown.add(Book.handleInput,game);
		Book.curPage=0;
		if (Book.background == null){
			Book.background = game.add.sprite(0,0, 'bookScreen');
			Book.background.width=game.world.width;
			Book.background.height=game.world.height;
			Book.background.inputEnabled=true;
			Book.background.events.onInputDown.add(Book.handleInput,game);
		} else {
			Book.background.revive();
			Book.background.bringToTop();
		}
		if (bookPages != null){
			bookPages.destroy(true,false);
		} if (Book.spriteGroup != null) {
			Book.spriteGroup.destroy(true, false);
		}
		Book.spriteGroup = game.add.group();
		bookPages = game.add.group();
		for (var ingItr in Ingredients){
			if (!Ingredients.hasOwnProperty(ingItr)){ continue; }
			var tmpIngGroup=game.add.group();
			var spriteQ;
			if (Ingredients[ingItr].known.name){
				//Add sprite to book
				console.log( Ingredients[ingItr].name);
				spriteQ = game.add.sprite(0,0,'items',ingItr);
				spriteQ.anchor.set(.5,0);
			} else {
				continue;
			}
			Book.spriteGroup.add(spriteQ);
			for (var attrib in Ingredients[ingItr].known){
				if (!Ingredients[ingItr].known.hasOwnProperty(attrib))
					{continue;}
				if (Ingredients[ingItr].known[attrib]){
					var ingBookKey = attrib;
					if (typeof Ingredients[ingItr][attrib] !== typeof 'string'){
						console.log(typeof Ingredients[ingItr][attrib]);
						ingBookKey = 'pretty'+ingBookKey;
					}
					if (ingBookKey == 'name'){
                        var bookText = new Phaser.Text(game, 0, 0, PlayState.toTitleCase(Ingredients[ingItr][ingBookKey]), bookTitle);
					}
                    else {
					    var bookText = new Phaser.Text(game, 0, 0, '      \u2022 ' + PlayState.toTitleCase(Ingredients[ingItr][ingBookKey]), bookStyle);
                    }
				} else if (attrib==='effects' && Ingredients[ingItr][attrib].type==='none'){
					var bookText = new Phaser.Text(game, 0, 0, '', bookStyle);
				} else {
				    var bookText = new Phaser.Text(game, 0, 0, '      \u2022 ???????', bookStyle);
				}
				tmpIngGroup.add(bookText);
			}
			bookPages.add(tmpIngGroup);
		}
		Book.loadPage();
	},

	nextPage: function(){
		console.log('nextPage');
		Book.curPage+=1;
		Book.loadPage();
	},

	prevPage: function(){
		console.log('prevPage');
		Book.curPage-=1;
		Book.loadPage();
	},

	loadPage: function(){
		var bookWidth=game.world.width/8*7;
		if (Book.curPage*2 >= bookPages.length){
				Book.curPage-=1;
				return;
			} else if (Book.curPage<0){
				Book.curPage+=1;
				return;
			}
		bookPages.forEach(Book.killAllText,this,false);
		Book.spriteGroup.forEach(Book.textKill,this,false);
		for (var pageItr = 0; pageItr<2; pageItr++){
			console.log(Book.curPage*2+pageItr);
			if (Book.curPage*2+pageItr >= bookPages.length){
				return;
			}
			var pageContent=bookPages.getAt(Book.curPage*2+pageItr);
			pageContent.forEach(Book.textRevive,this,false);
			pageContent.x=game.world.width/8*(1+4*pageItr) - 40;
			pageContent.y=260;
			pageContent.align(1,4,-1,(game.world.height-260)/4,Phaser.TOP_LEFT);
			var spriteQ=Book.spriteGroup.getAt(Book.curPage*2+pageItr);
			spriteQ.revive();
			spriteQ.x=game.world.width/4*(1+2*pageItr);
		}
	},

	findIngredient: function(searchee){
		var foundIng=false;
		Book.curPage=0;

		while (Book.curPage*2<bookPages.length){
			console.log(bookPages.getAt(Book.curPage*2).getAt(0).text);
			if (bookPages.getAt(Book.curPage*2).getAt(0).text===searchee){
				foundIng=true;
				break;
			} else if (Book.curPage*2+1 < bookPages.length && bookPages.getAt(Book.curPage*2+1).getAt(0).text===searchee){
				foundIng=true;
				break;
			}
			Book.curPage+=1;
		}
		if (!foundIng){
			Book.curPage=0;
		}
		Book.loadPage();
	},

	killAllText: function(page){
		page.forEach(Book.textKill,this,true);
	},

	textKill: function(t){
		t.kill();
	},

	textRevive: function(t){
		t.revive();
	},

	handleInput: function(sprite, pointer){
		console.log('Click');
		if (pointer.x<game.world.width/12*5){
			console.log('left');
			Book.prevPage();
		} else if (pointer.x<game.world.width/12*7){
			console.log('mid');
			Book.close();
		} else {
			console.log('right');
			Book.nextPage();
		}
	},

	close: function(){
		Book.background.kill();
		bookPages.forEach(Book.killAllText,this,false);
		Book.spriteGroup.forEach(Book.textKill,this,false);
	}

}