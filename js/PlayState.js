var PlayState = {

	preload: function(){
		game.load.atlasJSONHash('submitButton', 'assets/images/buttons/blank_buttons.png','assets/images/buttons/blank_buttons.json');
		game.load.atlas('items', 'assets/images/items.png', 'assets/images/items.json');
		game.load.image('cauldron', 'assets/images/cauldron alt.png');
		game.load.image('bg', 'assets/images/background vector.png');
		game.load.image('square', 'assets/images/square.png');
		game.load.atlasJSONHash('right_arrow', 'assets/images/rightarrow.png', 'assets/images/rightarrow.json');
		game.load.atlasJSONHash('left_arrow', 'assets/images/leftarrow.png', 'assets/images/leftarrow.json');
		game.load.image('bookScreen','assets/images/book_open_resized.png');
		
		//sound
		game.load.audio('bgm', 'assets/audio/backgroundMusicSkewedPaths.ogg')
	},

	create: function () {

	    PlayState.reset_all();

	    PlayState.winState(1);
	    PlayState.winState(2);
	    PlayState.winState(3);
	    PlayState.winState(4);
	    PlayState.winState(5);
 	    PlayState.winState(6);

	    PlayState.unlock_items(1);
	    PlayState.unlock_items(2);
	    PlayState.unlock_items(3);
	    PlayState.unlock_items(4);
	    PlayState.unlock_items(5);
	    PlayState.unlock_items(6);

	    console.log("Play State");

		//debug text
		text = game.add.text(100, 500, 'Nothing in the cauldron', { font: "15px Arial", fill: "#ff0044", align: "center" });

		crabCount = 0;
		ing = Ingredients;

		/////////////////////

		game.add.sprite(0,0, 'bg');
		bgm = game.add.audio('bgm');
		bgm.play();
		
		square = game.add.sprite(1165, 498, 'square');
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
		group.createMultiple(1, 'items', items_left, true);
		//resize all sprites
		group.forEach(function(sprite) {sprite.scale.set(0.5,0.5)});
		//if touched, allow drag
		group.onChildInputDown.add(_drag,this); 
		//align on shelves or something
		group.align(shelfwidth, shelfheight, itemwidth, itemheight, Phaser.CENTER);

		right_button = game.add.button(990, 200, 'right_arrow', PlayState.rightpage, this, 'Down', 'Static', 'Down', 'Down');
		left_button = game.add.button(25, 200, 'left_arrow', PlayState.leftpage, this, 'Down', 'Static', 'Down', 'Down');
		left_button.visible = false;
		if (items_right.length == 0) {
		    right_button.visible = false;
		}


		var startButton = game.add.button(100, game.world.height - 100, 'submitButton', submitCandy, this, 'Static', 'Static', 'Down', 'Up');
		startButton.width = 100;
		startButton.height = 50;
	},

	update: function() {
	    /*if pressed submit button | one time thing 
		currently pressing 1 checks win conditions */
	    var help = game.input.keyboard.addKey(Phaser.Keyboard.ONE)
	    help.onDown.add(this.checkWin);
	    //if (Book.isOpen && game.inpu)


	    if (dragged_item != null) {
	        dragged_item.x = game.input.mousePointer.x - 70;
	        dragged_item.y = game.input.mousePointer.y - 110;
	    }

	    if (game.input.activePointer.isUp && dragged_item != null) {
	        PlayState.dropHandler(dragged_item);
	    }

	    if (ingredientsInCauldron.length == 0) {
	        square.tint = PlayState.hexFromArray([85, 76, 91]);
	    }
	    else {
	        square.tint = PlayState.hexFromArray(currentColor);
	    }
	},
	
	render: function() {
		game.debug.text('Available Ingredients: ' + group.total, 74, 600);
		game.debug.text('Drop in cauldron to remove item from the Group', 10, 24);
    
	},

	reset_all: function () {
	    ingredientsInCauldron = [];
	    flavorList = [];
	    effects = [];
	    currentColor = [255, 255, 255];
	    numCol = 0;
	    totalIngred = 0;
	    winCondition = 0;
	    shelf_index = 0;
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
	    return parseInt(hex);
	},

	hsvFromArray: function (arr) {
	    var r = arr[0]/256.0;
	    var g = arr[1]/256.0;
	    var b = arr[2]/256.0;

	    var h = 0;
	    var s = 0;
	    var v = 0;

	    var min;
	    var max;
	    var delta;

	    min = Math.min(r, g, b);
	    max = Math.max(r, g, b);
	    v = max;
	    delta = max - min;

	    if( max != 0 )
	        s = delta / max;
	    else {
	        h = 0;
	        s = 0;
	        v = 0;
	    }
	    if( r == max )
	        h = ( g - b ) / delta;
	    else if( g == max )
	        h = 2 + ( b - r ) / delta;
	    else
	        h = 4 + ( r - g ) / delta;
	    h *= 60;
	    if( h < 0 )
	        h += 360;

	    s *= 100;
	    v *= 100;

	    return [h,s,v];
	},

	colorStringFromArray: function (arr) {
	    var hsv = PlayState.hsvFromArray(arr);
	    var hue = hsv[0];
	    var sat = hsv[1];
        var val = hsv[2]

	    var col;

	    if (hue < 13){
	        col = 'red';
	    }
	    else if (hue < 52) {
	        col = 'orange';
	    }
	    else if (hue < 66) {
	        col = 'yellow';
	    }
	    else if (hue < 159) {
	        col = 'green';
	    }
	    else if (hue < 255) {
	        col = 'blue';
	    }
	    else if (hue < 307) {
	        col = 'purple';
	    }
	    else {
	        col = 'red';
	    }

	    if (val < 60){
	        if (col == 'orange' || col == 'yellow'){
	            col = 'brown';
	        }
	    }

	    if (val < 10){
	        col = 'black';
	    }
	    if (val > 95 && sat < 5) {
	        col = 'white';
	    }

	    return col;
	},

    // TODO: unhide properties for the book?
	dropHandler: function(item, pointer) {
		//removes from group if mouse is over cauldron
	    if (PlayState.mouseOverCauldron()) {
	        totalIngred += 1;
			//keep track of attributes
			// adjust main candy accordingly

	        var currentIngredient = PlayState.getIngredientFromName(item.frameName);
	        console.log('');
	        console.log("added "+currentIngredient.name);

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


	        ///////// COLOR

	        if (!(currentIngredient.prettycolor == 'Colorless' || currentIngredient.prettycolor == 'Sparkly')) {
	            currentColor[0] = Math.round((currentIngredient.color[0] + currentColor[0] * numCol) / (numCol + 1));
	            currentColor[1] = Math.round((currentIngredient.color[1] + currentColor[1] * numCol) / (numCol + 1));
	            currentColor[2] = Math.round((currentIngredient.color[2] + currentColor[2] * numCol) / (numCol + 1));
	            numCol++;

	            square.tint = PlayState.hexFromArray(currentColor);
	        }

	        ///////// EFFECTS

	        if (currentIngredient.effects.type != 'none') {

	            var effect_index = effects.indexOf(currentIngredient.effects.type);

	            if (effect_index == -1) {
	                if (currentIngredient.effects.value == 1) {
	                    effects.push(currentIngredient.effects.type);
	                }
	            }
	            else {
	                if (currentIngredient.effects.value == -1) {
	                    effects.splice(effect_index, 1);
	                }
	            }
	        }

	        ////////// SPECIAL ITEMS

	        if (item.frameName == 'bleach') {
	            currentColor = [255, 255, 255];
	            numCol = 0;
	            square.tint = PlayState.hexFromArray(currentColor);
	        }

	        if (item.frameName == 'dark_matter') {
	            ingredientsInCauldron = [];
	            flavorList = [];
	            effects = [];
	            currentColor = [255, 255, 255];
	            numCol = 0;
	            totalIngred = 0;
	            square.tint = PlayState.hexFromArray(currentColor);
	        }

	        console.log('-------------');
	        console.log("mixture is now "+PlayState.colorStringFromArray(currentColor));
	        console.log('-----');
	        console.log('FLAVORS:');
	        for (var i = 0; i < flavorList.length; i++) {
	            console.log(' - ' + flavorList[i]);
	        }
	        console.log('-----');
	        console.log('EFFECTS:');
	        for (var i = 0; i < effects.length; i++) {
	            console.log(' - '+effects[i]);
	        }
	        console.log('-----');

			
			//deal with mixing effects

	    }

		item.destroy();
		dragged_item = null;
	},

	rightpage: function () {
	    if (shelf_index == 0) {

	        group.destroy();

	        group = game.add.group();
	        group.x = cornerX;
	        group.y = cornerY;
	        group.inputEnableChildren = true;
            
	        //load from atlas file; sprite name|frameName
	        group.createMultiple(1, 'items', items_right, true);
	        //resize all sprites
	        group.forEach(function (sprite) { sprite.scale.set(0.5, 0.5) });
	        //if touched, allow drag
	        group.onChildInputDown.add(_drag, this);
	        //align on shelves or something
	        group.align(shelfwidth, shelfheight, itemwidth, itemheight, Phaser.CENTER);

	        right_button.visible = false;
	        left_button.visible = true;
	        shelf_index = 1;
	    }
	},

	leftpage: function () {
	    if (shelf_index == 1) {
	        group.destroy();

	        group = game.add.group();
	        group.x = cornerX;
	        group.y = cornerY;
	        group.inputEnableChildren = true;

	        //load from atlas file; sprite name|frameName
	        group.createMultiple(1, 'items', items_left, true);
	        //resize all sprites
	        group.forEach(function (sprite) { sprite.scale.set(0.5, 0.5) });
	        //if touched, allow drag
	        group.onChildInputDown.add(_drag, this);
	        //align on shelves or something
	        group.align(shelfwidth, shelfheight, itemwidth, itemheight, Phaser.CENTER);

	        right_button.visible = true;
	        left_button.visible = false;
	        shelf_index = 0;
	    }
	},

	unlock_items: function (level) {
	    if (level == 1){
	        add_item('dark_matter');
	        add_item('bleach');
	        add_item('chocolate');
	        add_item('cyanide');
	        add_item('eye_of_newt');
	        add_item('dirt');
	    }
	    if (level == 2) {
	        add_item('blood');
	        add_item('caviar');
	        add_item('demon_flesh');
	        add_item('frog_legs');
	        add_item('liquid_smoke');
	        add_item('mandrake');
	        add_item('quicksilver');
	    }
	    if (level == 3) {
	        add_item('ghost_pepper');
	        add_item('insect_parts');
	        add_item('lizard_eggs');
	        add_item('squid_ink');
	        add_item('tentacles');
	    }
	    if (level == 4) {
	        add_item('fairy_wings');
	        add_item('nightshade');
	        add_item('snake_venom');
	    }
	    if (level == 5) {
	        add_item('pufferfish');
	        add_item('slime');
	        add_item('toadstool');
	    }
	    if (level == 6) {
	        add_item('bone_marrow');
	        add_item('lemons');
	        add_item('leopard_spots');
	    }
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

	winState: function(level) {
	// 	if (level == 1){
	//         wincandy = brown, extremely bitter, poison
	//     }
	//     if (level == 2) {
	//         wincandy = red, very spicy, explosive
	//     }
	//     if (level == 3) {
	//         wincandy = blue, irresponsibly salty, tentacles
	//     }
	//     if (level == 4) {
	//         wincandy = purple, very sweet, mind control
	//     }
	//     if (level == 5) {
	//         wincandy = yellow, mildly savory, slime, not salty
	//     }
	//     if (level == 6) {
	//        wincandy = blue, sour, spicy, implosion
	//     }
	}
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
