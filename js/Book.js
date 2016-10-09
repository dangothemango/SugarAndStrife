

var Book = {
	
	curPage: 0,

	open: function(pageNum){
		game.input.onDown.add(Book.handleInput,game);
		if (bookPages != null){
			bookPages.destroy(true,false);
		}
		bookPages = game.add.group();
		for (var ingItr in Ingredients){
			if (!Ingredients.hasOwnProperty(ingItr)){ continue; }
			var tmpIngGroup=game.add.group();
			for (var attrib in Ingredients[ingItr].known){
				if (!Ingredients[ingItr].known.hasOwnProperty(attrib))
					{continue;}
				if (Ingredients[ingItr].known[attrib]){
					var bookText = new Phaser.Text(game, 0, 0, '\u2022 ' + Ingredients[ingItr][attrib], bookStyle);
				} else {
					var bookText = new Phaser.Text(game, 0, 0, '\u2022 ???????', bookStyle);
				}
				tmpIngGroup.add(bookText);
			}
			bookPages.add(tmpIngGroup);
		}
		Book.goToPage(pageNum);
	},

	goToPage: function(pageNum){
		Book.curPage=pageNum;
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
		if (Book.curPage*2 >= bookPages.length){
				Book.curPage-=1;
				return;
			} else if (Book.curPage<0){
				Book.curPage+=1;
				return;
			}
		bookPages.forEach(Book.killAllText,this,false);
		var bookGridOffset=game.world.width/8
		for (var pageItr = 0; pageItr<2; pageItr++){
			console.log(Book.curPage*2+pageItr);
			if (Book.curPage*2+pageItr >= bookPages.length){
				return;
			}
			var pageContent=bookPages.getAt(Book.curPage*2+pageItr);
			pageContent.forEach(Book.textRevive,this,false);
			pageContent.x=bookGridOffset*4*pageItr+bookGridOffset;
			pageContent.align(1,4,-1,game.world.height/4,Phaser.LEFT_CENTER);
		}
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

	handleInput: function(pointer){
		console.log('Click');
		if (pointer.x<game.world.width/3){
			console.log('left');
			Book.prevPage();
		} else if (pointer.x<game.world.width/3*2){
			console.log('mid');
			Book.close();
		} else {
			console.log('right');
			Book.nextPage();
		}
	},

	getPageNum: function(){

	},

	close: function(){

	}

}