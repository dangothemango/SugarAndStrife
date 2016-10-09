
var PlayState = {

	preload: function(){
		game.load.atlasJSONHash('submitButton', 'assets/images/buttons/blank_buttons.png','assets/images/buttons/blank_buttons.json');
		game.load.atlas('items', 'assets/images/items.png', 'assets/images/items.json');
		game.load.image('cauldron', 'assets/images/cauldron alt.png');
		game.load.image('bg', 'assets/images/background vector.png');
		//game.load.script('Ingredients', 'assets/ingredients.js');
	},

	create: function () {

	    var itemheight = 100; // height of an item slot in pixels
	    var itemwidth = 100; // width of an item slot in pixels
	    var shelfwidth = 5; // number of items that fit on the shelf horizontally
	    var shelfheight = 4; // number of items that fit on the shelf vertically


		console.log("Play State");

		//debug text
		text = game.add.text(100, 500, 'Nothing in the cauldron', { font: "15px Arial", fill: "#ff0044", align: "center" });

		crabCount = 0;
		ing = Ingredients;

		/////////////////////

		var startButton = game.add.button(100,game.world.height-300,'submitButton',submitCandy,this,'Static','Static','Down','Up');
		
		game.add.sprite(0,0, 'bg');
		//  This is just a visual debug grid, it's not needed for the actual Group.align to work
		game.add.sprite(0, 0, game.create.grid('grid', itemwidth * shelfwidth, itemheight * shelfheight, itemwidth, itemheight, 'rgba(0, 250, 0, 1)'));
        

		cauldron = game.add.sprite(1165,560, 'cauldron');
		cauldron.anchor.set(0.5);
		cauldron.width = 325;
		cauldron.height = 325;
		
		//group of sprites/items
		group = game.add.group();
		group.inputEnableChildren = true;

		//load from atlas file; sprite name|frameName
		group.createMultiple(3, 'items', ['bleach', 'chocolate', 'demon_flesh'], true);
		//resize all sprites
		group.forEach(function(sprite) {sprite.scale.set(0.5,0.5)});
		//if touched, allow drag
		group.onChildInputDown.add(_drag,this); 

		//align on shelves or something
		group.align(shelfwidth, shelfheight, itemwidth, itemheight, Phaser.CENTER);

	},

	update: function() {
		/*if pressed submit button | one time thing 
		currently pressing 1 checks win conditions */
		var help = game.input.keyboard.addKey(Phaser.Keyboard.ONE)
		help.onDown.add(this.checkWin);
	    //if (Book.isOpen && game.inpu)


		if (dragged_item != null) {
		    dragged_item.x = game.input.mousePointer.x - 70;
		    dragged_item.y = game.input.mousePointer.y - 70;
		}

		if (game.input.activePointer.isUp && dragged_item != null) {
		    PlayState.dropHandler(dragged_item);
		}
	},
	
	render: function() {
		game.debug.text('Available Ingredients: ' + group.total, 74, 600);
		game.debug.text('Drop in cauldron to remove item from the Group', 10, 24);
    
	},

    // let's be pretty generous with this hit detection
	mouseOverCauldron: function () {
	    var over = false;
	    if (game.input.mousePointer.x > cauldron.x - (cauldron.width / 2)) {
	        if (game.input.mousePointer.y > cauldron.y - (cauldron.height)) {
	            return true;
	        }
	    }
	    return false;
	},

	dropHandler: function(item, pointer) {
		//removes from group if mouse is over cauldron
	    if (PlayState.mouseOverCauldron()) {
	        console.log("good");
			totalIngred += 1;
			//keep track of attributes
			// adjust main candy accordingly

			//  Remove the item from the Group.
			    // keep track of what was put in the cauldron
			    if (item.frameName == 'bleach') {
				//color
				for (var i=0; i < wincandy.length; i++) {
					//item.attributes
					attri[i] += ing.bleach.color[i];
				}
				    
				//take care of flavoring
				attri[3] = ing.bleach.flavor;

				//effects
				attri[4] = ing.bleach.effects[0];
					attri[5] = ing.bleach.effects[1];
				crabCount += 1;

				text.text = 'Dropped ' + item.frameName + ' into the cauldron' + '\n' +  ' ' + crabCount + ' ' + item.frameName 
				+ '\n' + "is currently: " + attri
				+  '\n' + "needs to be: " + wincandy;
			    }
			    else
			    {
				text.text = 'Dropped ' +  item.frameName + ' into the cauldron';
			    }
			}

		item.destroy();
		dragged_item = null;
	},

	checkWin: function(){
		for (var k=0; k < wincandy.length; k++) {
			if (attri[k] == wincandy[k]){
				winCondition += 1;
			}
		}

		if (winCondition == 6) {
			text.text = winCondition + ' YOU WINNN!!!!!!!!!!!'
				+ '\n' + "is currently: " + attri
			+  '\n' + "needs to be: " + wincandy;
		}
		else
		{
			//if submitting wrong candy

			text.text = winCondition + ' NOT QUITE YET!'
				+ '\n' + "is currently: " + attri
			+  '\n' + "needs to be: " + wincandy;
		    winCondition = 0;
		}
	}
}
