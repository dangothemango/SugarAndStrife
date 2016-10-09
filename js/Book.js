

var Book = {
	
	curPage: 0,

	open: function(pageNum){
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
					var bookText = new Phaser.Text(game, 0, 0, '\u2022' + Ingredients[ingItr][attrib], style);
				} else {
					var bookText = new Phaser.Text(game, 0, 0, '\u2022 ???????', style);
				}
				tmpIngGroup.add(bookText);
				console.log(Ingredients[ingItr][attrib]);
			}
			bookPages.add(tmpIngGroup);
		}
		this.goToPage(pageNum);
	},

	goToPage: function(pageNum){
		this.curPage=pageNum;
		this.loadPage();
	},

	nextPage: function(){
		this.curPage+=1;
		this.loadPage();
	},

	prevPage: function(){
		this.curPage-=1;
		this.loadPage();
	},

	loadPage: function(){
		for (var pageItr = 0; pageItr<2; pageItr++){
			console.log('hollow world');
			console.log(this.curPage*2+pageItr);
			var pageContent=bookPages.getAt(this.curPage*2+pageItr);
			console.log(pageContent.getAt(3));
		}
	},

	getPageNum: function(){

	},

	close: function(){

	},

	nextPage: function(){

	},

	prevPage: function(){

	}

}