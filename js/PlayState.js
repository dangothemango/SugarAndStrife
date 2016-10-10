var PlayState = {

	preload: function(){
		game.load.atlasJSONHash('submitButton', 'assets/images/buttons/blank_buttons.png','assets/images/buttons/blank_buttons.json');
		game.load.atlas('items', 'assets/images/items.png', 'assets/images/items.json');
		game.load.image('cauldron', 'assets/images/cauldron alt.png');
		game.load.image('bg', 'assets/images/background vector.png');
		game.load.image('square', 'assets/images/square.png');
		//game.load.script('Ingredients', 'assets/ingredients.js');
	},

	create: function () {

	    PlayState.reset_all();

	    var itemheight = 119.5; // height of an item slot in pixels
	    var itemwidth = 207; // width of an item slot in pixels
	    var shelfwidth = 4; // number of items that fit on the shelf horizontally
	    var shelfheight = 4; // number of items that fit on the shelf vertically

	    var cornerX = 112;
	    var cornerY = 46;

	    console.log("Play State");

		//debug text
		text = game.add.text(100, 500, 'Nothing in the cauldron', { font: "15px Arial", fill: "#ff0044", align: "center" });

		crabCount = 0;
		ing = Ingredients;

		/////////////////////

		var startButton = game.add.button(100,game.world.height-300,'submitButton',submitCandy,this,'Static','Static','Down','Up');
		
		game.add.sprite(0,0, 'bg');
		//  This is just a visual debug grid, it's not needed for the actual Group.align to work
		game.add.sprite(cornerX, cornerY, game.create.grid('grid', itemwidth * shelfwidth, itemheight * shelfheight, itemwidth, itemheight, 'rgba(0, 250, 0, 1)'));
        

		square = game.add.sprite(1165, 500, 'square');
		square.anchor.set(0.5);
		square.width = 220;
		square.height = 50;

		cauldron = game.add.sprite(1165,560, 'cauldron');
		cauldron.anchor.set(0.5);
		cauldron.width = 325;
		cauldron.height = 325;
		
		//group of sprites/items
		group = game.add.group();
		group.x = cornerX;
		group.y = cornerY;
		group.inputEnableChildren = true;

		//load from atlas file; sprite name|frameName
		group.createMultiple(1, 'items', ['chocolate', 'blood', 'bone_marrow', 'bleach',
                                          'caviar', 'cyanide', 'demon_flesh', 'eye_of_newt',
		                                  'fairy_wings', 'frog_legs', 'nightshade', 'ghost_pepper',
		                                  'dirt', 'insect_parts', 'lemons', 'leopard_spots'], true);
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

	reset_all: function () {
	    ingredientsInCauldron = [];
	    flavorList = [];
	    currentColor = [0, 0, 0];
	    numCol = 0;
	    totalIngred = 0;
	    winCondition = 0;
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

	componentToHex: function(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    },

	hexFromArray: function (arr) {
	    var hex = "0x" + PlayState.componentToHex(arr[0]) + PlayState.componentToHex(arr[1]) + PlayState.componentToHex(arr[2]);
	    console.log(hex);
	    return parseInt(hex);
	},

    // TODO: unhide properties for the book?
	dropHandler: function(item, pointer) {
		//removes from group if mouse is over cauldron
	    if (PlayState.mouseOverCauldron()) {
	        totalIngred += 1;
			//keep track of attributes
			// adjust main candy accordingly

	        var currentIngredient = PlayState.getIngredientFromName(item.frameName);
	        console.log(currentIngredient.name);

	        // add the current ingredient to the list
	        ingredientsInCauldron.push(item.frameName);


            ///////// FLAVOR

            // if the item has a flavor
	        if (currentIngredient.flavor != 'flavorless') {
                // put it in the list
	            flavorList.push(currentIngredient.flavor);

                // if we have more than 5 flavors
	            if (flavorList.length > 5) {
                    // remove the first one
	                flavorList.splice(0, 1);
	            }
	        }


	        console.log('-----');
	        for (var i = 0; i < flavorList.length; i++) {
	            console.log(flavorList[i]);
	        }
	        console.log('-----');


	        ///////// COLOR

	        if (!(currentIngredient.prettycolor == 'Colorless' || currentIngredient.prettycolor == 'Sparkly')) {
	            currentColor[0] = Math.round((currentIngredient.color[0] + currentColor[0] * numCol) / (numCol + 1));
	            currentColor[1] = Math.round((currentIngredient.color[1] + currentColor[1] * numCol) / (numCol + 1));
	            currentColor[2] = Math.round((currentIngredient.color[2] + currentColor[2] * numCol) / (numCol + 1));
	            numCol++;

	            square.tint = PlayState.hexFromArray(currentColor);
	        }

	        if (item.frameName == 'bleach') {
	            currentColor = [255, 255, 255];
	            numCol = 0;

	            square.tint = PlayState.hexFromArray(currentColor);
	        }

            /*

			if (item.frameName == 'bleach') {
				//color
				for (var i=0; i < wincandy.length; i++) {
				    //item.attributes
					attri[i] += ing.bleach.color[i];
				}

				//take care of flavoring
				attri[3] = ing.bleach.flavor;

				//effects
				attri[4] = ing.bleach.effects.type;
				attri[5] = ing.bleach.effects.value;
				crabCount += 1;

				text.text = 'Dropped ' + item.frameName + ' into the cauldron' + '\n' +  ' ' + crabCount + ' ' + item.frameName 
				+ '\n' + "is currently: " + attri
				+  '\n' + "needs to be: " + wincandy;
				}
			else
			{
				text.text = 'Dropped ' +  item.frameName + ' into the cauldron';
			}*/

		    
			if (attri[4] == ing.bleach.effects.type) {
				console.log("added something else");
				ing.bleach.effects.value += 1;
			}
			
			//deal with mixing effects
		   	else {
				
			}
	    }

		item.destroy();
		dragged_item = null;
	},

	getIngredientFromName: function(name){

	    switch (name) {
            case 'chocolate':
                return ing.chocolate;
	        case 'blood':
	            return ing.blood;
	        case 'bone_marrow':
	            return ing.bone_marrow;
	        case 'bleach':
	            return ing.bleach;
	        case 'caviar':
	            return ing.caviar;
	        case 'cyanide':
	            return ing.cyanide;
	        case 'demon_flesh':
	            return ing.demon_flesh;
	        case 'eye_of_newt':
	            return ing.eye_of_newt;
	        case 'fairy_wings':
	            return ing.fairy_wings;
	        case 'frog_legs':
	            return ing.frog_legs;
	        case 'nightshade':
	            return ing.nightshade;
	        case 'ghost_pepper':
	            return ing.ghost_pepper;
	        case 'dirt':
	            return ing.dirt;
	        case 'insect_parts':
	            return ing.insect_parts;
	        case 'lemons':
	            return ing.lemons;
	        case 'leopard_spots':
	            return ing.leopard_spots;
	        case 'liquid_smoke':
	            return ing.liquid_smoke;
	        case 'lizard_eggs':
	            return ing.lizard_eggs;
	        case 'mandrake':
	            return ing.mandrake;
	        case 'quicksilver':
	            return ing.quicksilver;
	        case 'pufferfish':
	            return ing.pufferfish;
	        case 'slime':
	            return ing.slime;
	        case 'snake_venom':
	            return ing.snake_venom;
	        case 'squid_ink':
	            return ing.squid_ink;
	        case 'tentacles':
	            return ing.tentacles;
	        case 'toadstool':
	            return ing.toadstool;
	        case 'dark_matter':
	            return ing.dark_matter;
	        default:
	            return null;
	    }
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
