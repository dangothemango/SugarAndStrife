

var Book = {
	
	curPage: 0,

	background: null,

	spriteGroup: null,

	open: function(){
		//game.input.onDown.add(Book.handleInput,game);
		//generate pages and set current state vars
		Book.curPage=0;
		Book.background = game.add.sprite(0,0, 'bookScreen');
		Book.background.width=game.world.width;
		Book.background.height=game.world.height;
		Book.background.inputEnabled=true;
		Book.background.events.onInputDown.add(Book.handleInput,game);
		if (bookPages != null){
			bookPages.destroy(true,false);
		} if (Book.spriteGroup != null) {
			Book.spriteGroup.destroy(true, false);
		}
		Book.spriteGroup = game.add.group();
		bookPages = game.add.group();

        var blanksprite = game.add.sprite(0,0, 'blank');
        var tmpGoalGroup=game.add.group();
        Book.spriteGroup.add(blanksprite);

        var goaltext0 = new Phaser.Text(game, 0, 0, "OBJECTIVES:", bookTitle);
        tmpGoalGroup.add(goaltext0);

        //Objectives for the book, we should pull this from winconditions.js in the future
        if (PlayState.levelNum === 0){
            var goaltext1 = new Phaser.Text(game, 0, 0, "   \u2022 Brown", bookStyle);
            var goaltext2 = new Phaser.Text(game, 0, 0, "   \u2022 Extremely Bitter", bookStyle);
            var goaltext3 = new Phaser.Text(game, 0, 0, "   \u2022 Poisonous Only", bookStyle);

            tmpGoalGroup.add(goaltext1);
            tmpGoalGroup.add(goaltext2);
            tmpGoalGroup.add(goaltext3);
        }
        else if (PlayState.levelNum === 1){
            var goaltext1 = new Phaser.Text(game, 0, 0, "   \u2022 Red", bookStyle);
            var goaltext2 = new Phaser.Text(game, 0, 0, "   \u2022 Very Spicy", bookStyle);
            var goaltext3 = new Phaser.Text(game, 0, 0, "   \u2022 Explosive Only", bookStyle);

            tmpGoalGroup.add(goaltext1);
            tmpGoalGroup.add(goaltext2);
            tmpGoalGroup.add(goaltext3);
        }
        else if (PlayState.levelNum === 2){
            var goaltext1 = new Phaser.Text(game, 0, 0, "   \u2022 Blue", bookStyle);
            var goaltext2 = new Phaser.Text(game, 0, 0, "   \u2022 Irresponsibly Salty", bookStyle);
            var goaltext3 = new Phaser.Text(game, 0, 0, "   \u2022 Tentacles Only", bookStyle);

            tmpGoalGroup.add(goaltext1);
            tmpGoalGroup.add(goaltext2);
            tmpGoalGroup.add(goaltext3);
        }
        else if (PlayState.levelNum === 3){
            var goaltext1 = new Phaser.Text(game, 0, 0, "   \u2022 Purple", bookStyle);
            var goaltext2 = new Phaser.Text(game, 0, 0, "   \u2022 Very Sweet", bookStyle);
            var goaltext3 = new Phaser.Text(game, 0, 0, "   \u2022 Mind Control Only", bookStyle);

            tmpGoalGroup.add(goaltext1);
            tmpGoalGroup.add(goaltext2);
            tmpGoalGroup.add(goaltext3);
        }
        else if (PlayState.levelNum === 4){
            var goaltext1 = new Phaser.Text(game, 0, 0, "      \u2022 Yellow", bookStyle);
            var goaltext2 = new Phaser.Text(game, 0, 0, "      \u2022 Mildly Savory", bookStyle);
            var goaltext3 = new Phaser.Text(game, 0, 0, "      \u2022 Not Salty", bookStyle);
            var goaltext4 = new Phaser.Text(game, 0, 0, "      \u2022 Slimification Only", bookStyle);

            tmpGoalGroup.add(goaltext1);
            tmpGoalGroup.add(goaltext2);
            tmpGoalGroup.add(goaltext3);
            tmpGoalGroup.add(goaltext4);
        }
        else if (PlayState.levelNum === 5){
            var goaltext1 = new Phaser.Text(game, 0, 0, "   \u2022 Blue", bookStyle);
            var goaltext2 = new Phaser.Text(game, 0, 0, "   \u2022 Reasonably Sour", bookStyle);
            var goaltext3 = new Phaser.Text(game, 0, 0, "   \u2022 Reasonably Spicy", bookStyle);
            var goaltext4 = new Phaser.Text(game, 0, 0, "   \u2022 Implosion Only", bookStyle);

            tmpGoalGroup.add(goaltext1);
            tmpGoalGroup.add(goaltext2);
            tmpGoalGroup.add(goaltext3);
            tmpGoalGroup.add(goaltext4);
        }

        bookPages.add(tmpGoalGroup);

        var blanksprite2 = game.add.sprite(0,0, 'blank');
        var tmpGoalGroup2=game.add.group();
        Book.spriteGroup.add(blanksprite2);

        var goaltext00 = new Phaser.Text(game, 0, 0, " ", bookTitle);
        tmpGoalGroup2.add(goaltext00);
        bookPages.add(tmpGoalGroup2);

     	//find all ingredients that are unlocked and add them to the book  
		for (var ingItr in Ingredients){
			if (!Ingredients.hasOwnProperty(ingItr)){ continue; }
			var tmpIngGroup=game.add.group();
			var spriteQ;
			if (Ingredients[ingItr].known.name){
				//Add sprite to book
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
						ingBookKey = 'pretty'+ingBookKey;
					}
					if (ingBookKey == 'name'){
                        var bookText = new Phaser.Text(game, 0, 0, PlayState.toTitleCase(Ingredients[ingItr][ingBookKey]), bookTitle);
					}
                    else {
					    var bookText = new Phaser.Text(game, 0, 0, '   \u2022 ' + PlayState.toTitleCase(Ingredients[ingItr][ingBookKey]), bookStyle);
                    }
				} else if (attrib==='effects' && Ingredients[ingItr][attrib].type==='none'){
					var bookText = new Phaser.Text(game, 0, 0, '', bookStyle);
				} else {
				    var bookText = new Phaser.Text(game, 0, 0, '   \u2022 ???????', bookStyle);
				}
				tmpIngGroup.add(bookText);
			}
			bookPages.add(tmpIngGroup);
		}
		Book.loadPage();
	},

	nextPage: function(){
		Book.curPage+=1;
		Book.loadPage();
	},

	prevPage: function(){
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
			if (Book.curPage*2+pageItr >= bookPages.length){
				return;
			}
			var pageContent=bookPages.getAt(Book.curPage*2+pageItr);
			pageContent.forEach(Book.textRevive,this,false);
			pageContent.x=game.world.width/8*(1+4*pageItr) - 40;
			pageContent.y=260;
			pageContent.align(1,5,0,70,Phaser.TOP_LEFT);
			var spriteQ=Book.spriteGroup.getAt(Book.curPage*2+pageItr);
			spriteQ.revive();
			spriteQ.x=game.world.width/4*(1+2*pageItr);
		}
	},

	findIngredient: function(searchee){
		var foundIng=false;
		Book.curPage=0;

		while (Book.curPage*2<bookPages.length){
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
		if (pointer.x<game.world.width/12*5){
			Book.prevPage();
		} else if (pointer.x<game.world.width/12*7){
			Book.close();
		} else {
			Book.nextPage();
		}
	},

	close: function(){
		Book.background.destroy();
		bookPages.forEach(Book.killAllText,this,false);
		Book.spriteGroup.forEach(Book.textKill,this,false);
	}

}