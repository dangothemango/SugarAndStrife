

var Book = {
	
	open: function(){
		for (var ing in Ingredients){
			if (!Ingredients.hasOwnProperty(ing)){ continue; }
			for (var attrib in Ingredients[ing].known){
				if (!Ingredients[ing].known.hasOwnProperty(attrib))
					{continue;}
				if (Ingredients[ing].known[attrib]){
					var ingredientDetailText = game.add.text(game.world.centerX,game.world.centerY,Ingredients[ing][attrib],style );
					console.log(Ingredients[ing][attrib]);
				}
			}
		}
	},

	close: function(){

	},

	nextPage: function(){

	},

	prevPage: function(){

	}

}