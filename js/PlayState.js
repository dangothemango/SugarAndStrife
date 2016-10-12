var PlayState = {

	preload: function(){
		game.load.atlasJSONHash('submitButton', 'assets/images/buttons/blank_buttons.png','assets/images/buttons/blank_buttons.json');
        game.load.atlas('items', 'assets/images/items.png', 'assets/images/items.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        game.load.image('cauldron', 'assets/images/cauldron alt.png');
        game.load.image('bg', 'assets/images/background vector.png');
        game.load.image('square', 'assets/images/square.png');
        game.load.atlasJSONHash('right_arrow', 'assets/images/rightarrow.png', 'assets/images/rightarrow.json');
        game.load.atlasJSONHash('left_arrow', 'assets/images/leftarrow.png', 'assets/images/leftarrow.json');
        game.load.image('bookScreen','assets/images/flat_book_desaturated.png');
        game.load.image('notFound','assets/images/notfoundicon.png');
        game.load.spritesheet('bookNoShit','assets/images/closedBook_noBlueShit.png',449,327,13);
        game.load.atlas('candy','assets/images/candy/candysheet.png','assets/images/candy/candysheet.json',Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

        game.load.bitmapFont('corbel', 'assets/corbel.png', 'assets/corbel.fnt');
        game.load.bitmapFont('sleekfont', 'assets/sleek.png', 'assets/sleek.fnt');
        
        //sound
        game.load.audio('bgm', 'assets/sounds/backgroundMusicSkewedPaths.ogg');
        game.load.audio('dm_soundeffect', 'assets/sounds/addDarkmatter.wav');
        game.load.audio('liquid_soundeffect', 'assets/sounds/addLiquid.wav');
        game.load.audio('powder_soundeffect', 'assets/sounds/addPowder.wav');
        game.load.audio('solid_soundeffect', 'assets/sounds/addSolid.wav');
    
	},

	winState: null,

	levelNum: 0 ,

	create: function () {

	    PlayState.reset_all();

	    if (debug){
	    	for (var i =0; i<=debugLevel; i++){
	    		PlayState.unlock_items(i);
	    	}
	    	winState=WinConditions[debugLevel];
	    } else{
    	    winState=WinConditions[this.levelNum];
    
    	    PlayState.unlock_items(this.levelNum);
    	}

	    console.log("Play State");

		//debug text
		text = game.add.text(100, 500, 'Nothing in the cauldron', { font: "15px Arial", fill: "#ff0044", align: "center" });

		crabCount = 0;
		ing = Ingredients;

		/////////////////////

		game.add.sprite(0,0, 'bg');
		bgm = game.add.audio('bgm');
		bgm.play();
		
		//soundfx
		dm_soundeffect = game.add.audio('dm_soundeffect');
		liquid_soundeffect = game.add.audio('liquid_soundeffect');
		powder_soundeffect = game.add.audio('powder_soundeffect');
		solid_soundeffect = game.add.audio('solid_soundeffect');
		
		
		square = game.add.sprite(1165, 498, 'square');
		square.anchor.set(0.5);
		square.width = 220;
		square.height = 50;

		cauldron = game.add.sprite(1165,560, 'cauldron');
		cauldron.anchor.set(0.5);
		cauldron.width = 325;
		cauldron.height = 325;

		closedBook = game.add.sprite(1334/2+50,525, 'bookNoShit');
		closedBook.scale.set(.5,.5);
		closedBook.animations.frame=8;
		closedBook.inputEnabled=true;
		closedBook.events.onInputDown.add(PlayState.openBook,game);
		closedBook.animations.add('idle',[9,10,11,12,0,1,2,3,4,5,6,7,8]);
		
		//group of sprites/items
		group = game.add.group();
		group.x = cornerX;
		group.y = cornerY;
		group.inputEnableChildren = true;

		//load from atlas file; sprite name|frameName
		group.createMultiple(1,'items', items_left, true);
		//resize all sprites
		group.forEach(function(sprite) {sprite.scale.set(0.5,0.5)});
		//if touched, allow drag
		group.onChildInputDown.add(_drag,this); 
		//align on shelves or something
		group.align(shelfwidth, shelfheight, itemwidth, itemheight, Phaser.CENTER);

		right_button = game.add.button(990, 200, 'right_arrow', PlayState.rightpage, this, 'Down', 'Static', 'Down', 'Down');
		left_button = game.add.button(25, 200, 'left_arrow', PlayState.leftpage, this, 'Down', 'Static', 'Down', 'Down');
		left_button.visible = false;
		if (items_right.length === 0) {
		    right_button.visible = false;
		}


		var startButton = game.add.button(100, game.world.height - 100, 'submitButton', submitCandy, this, 'Static', 'Static', 'Down', 'Up');
		startButton.width = 100;
		startButton.height = 50;


        // TRACKING UI
        //game.add.sprite(995,25, 'flavorlist');
        flav1 = game.add.text(990, 26, '', uiStyle);
        flav2 = game.add.text(990, 60, '', uiStyle);
        flav3 = game.add.text(990, 94, '', uiStyle);
        flav4 = game.add.text(990, 128, '', uiStyle);
        flav5 = game.add.text(990, 162, '', uiStyle);
	},

	openBook: function(sprite, pointer){
		Book.open();
	},

	update: function() {
	    //if (Book.isOpen && game.inpu)

	    if (closedBook.animations.currentAnim != null && closedBook.animations.currentAnim.isPlaying){

	    } else if (rand.weightedPick([false,false,false,false,false,true])){
			closedBook.animations.play('idle',15,false);
	    }


	    if (dragged_item != null) {
	        dragged_item.x = game.input.mousePointer.x - 70;
	        dragged_item.y = game.input.mousePointer.y - 110;
	    }

	    if (game.input.activePointer.isUp && dragged_item != null) {
	        PlayState.dropHandler(dragged_item);
	    }

	    if (totalIngred === 0) {
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
	    sparkles=false;
	    winCondition = 0;
	    shelf_index = 0;
	    dirty = false;
	},

    toTitleCase: function (str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    },

	updateFlavorUI: function () {

        if(flavorList.length>0) {
	        flav5.text=PlayState.toTitleCase(flavorList[flavorList.length-1]);
	    }
	    else {
            flav5.text='';
	    }

        if(flavorList.length>1) {
	        flav4.text=PlayState.toTitleCase(flavorList[flavorList.length-2]);
	    }

	    else {
            flav4.text='';
	    }

        if(flavorList.length>2) {
	        flav3.text=PlayState.toTitleCase(flavorList[flavorList.length-3]);
	    }
	    else {
            flav3.text='';
	    }

        if(flavorList.length>3) {
	        flav2.text=PlayState.toTitleCase(flavorList[flavorList.length-4]);
	    }
	    else {
            flav2.text='';
	    }

        if(flavorList.length>4) {
	        flav1.text=PlayState.toTitleCase(flavorList[flavorList.length-5]);
	    }
	    else {
            flav1.text='';
	    }
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

	mouseOverBook: function () {
	    var over = false;
	    if (game.input.mousePointer.x > closedBook.x) {
	        if (game.input.mousePointer.y > closedBook.y - (closedBook.height)) {
        		if (game.input.mousePointer.x < closedBook.x + (closedBook.width)) {
       				if (game.input.mousePointer.y < closedBook.y + (closedBook.height)) {
            			return true;
            		}
            	}
	        }
	    }
	    return false;
	},

	componentToHex: function(c) {
        var hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
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
	    if( r === max )
	        h = ( g - b ) / delta;
	    else if( g === max )
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
	        if (col === 'orange' || col === 'yellow'){
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

		if (PlayState.mouseOverBook()){
			Book.open();
			Book.findIngredient(PlayState.getIngredientFromName(item.frameName).name);
		}

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

            // if the item has a flavor and there's no dirt in the cauldron
	        if (currentIngredient.flavor != 'flavorless' && !dirty) {
                // put it in the list
	            flavorList.push(currentIngredient.flavor);
	            Ingredients[item.frameName].known.flavor=true;

                // if we have more than 5 flavors
	            if (flavorList.length > 5) {
                    // remove the first one
	                flavorList.splice(0, 1);
	            }
	        }



	        ///////// COLOR
			Ingredients[item.frameName].known.color=true;
	        if (!(currentIngredient.prettycolor === 'Colorless' || currentIngredient.prettycolor === 'Sparkly') && !dirty) {
	            currentColor[0] = Math.round((currentIngredient.color[0] + currentColor[0] * numCol) / (numCol + 1));
	            currentColor[1] = Math.round((currentIngredient.color[1] + currentColor[1] * numCol) / (numCol + 1));
	            currentColor[2] = Math.round((currentIngredient.color[2] + currentColor[2] * numCol) / (numCol + 1));
	            numCol++;

	            square.tint = PlayState.hexFromArray(currentColor);
	        } else if (currentIngredient.prettycolor === 'Sparkly'){
            	console.log('SPARJL');
            	sparkles=true;
            }

	        ///////// EFFECTS

	        if (currentIngredient.effects.type != 'none') {

	            var effect_index = effects.indexOf(currentIngredient.effects.type);

	            if (effect_index === -1) {
	                if (currentIngredient.effects.value === 1) {
	                    effects.push(currentIngredient.effects.type);
	                    Ingredients[item.frameName].known.effects=true;
	                }
	            }
	            else {
	                if (currentIngredient.effects.value === -1) {
	                    effects.splice(effect_index, 1);
	                    Ingredients[item.frameName].known.effects=true;
	                }
	            }
	        }

	        ////////// SPECIAL ITEMS

	        if (item.frameName === 'bleach') {
		    
		    	Ingredients[item.frameName].known.effects=true;
	            currentColor = [255, 255, 255];
	            numCol = 0;
	            square.tint = PlayState.hexFromArray(currentColor);
	        }

	        if (item.frameName === 'dark_matter') {
	        	Ingredients[item.frameName].known.effects=true;
		        dm_soundeffect.play();
		        PlayState.erase_all();
	        }

	        if (item.frameName === 'dirt') {
	        	Ingredients[item.frameName].known.effects=true;
	        	Ingredients[item.frameName].known.flavor=true;
	            dirty = true;
	            flavorList = ['dirt', 'dirt', 'dirt', 'dirt', 'dirt'];
	            currentColor = currentIngredient.color;
	            square.tint = PlayState.hexFromArray(currentColor);
	        }

		    //sound effects for specific items

		    if (item.frameName === 'bone_marrow' || item.frameName === 'caviar' || item.frameName === 'chocolate' || 
		        item.frameName === 'demon_flesh' ||  item.frameName === 'eye_of_newt' || item.frameName === 'frog_legs' 
		        || item.frameName === 'ghost_pepper' || item.frameName === 'insect_parts' || item.frameName === 'lemons' 
		        || item.frameName === 'leopard_spots' || item.frameName === 'lizard_eggs' || item.frameName === 'mandrake' 
		        || item.frameName === 'pufferfish' || item.frameName === 'tentacles' || item.frameName === 'toadstool') {

			    solid_soundeffect.play();
		    }

		    if (item.frameName === 'bleach' || item.frameName === 'blood' || item.frameName === 'cyanide' || 
		        item.frameName === 'liquid_smoke' || item.frameName === 'slime' || item.frameName === 'snake_venom' 
		        || item.frameName === 'squid_ink' || item.frameName === 'mercury') {
			    liquid_soundeffect.play();
		    }

		    if (item.frameName === 'fairy_wings' || item.frameName === 'nightshade' || item.frameName === 'dirt') {
			    powder_soundeffect.play();
		    }
		    
	        ////////// REACTIONS

		    var reactant; // the other ingredient in the reaction
		    var has_reaction = false;
		    var ingredient_index;


		    if (item.frameName === 'cyanide') {

		        if (ingredientsInCauldron.indexOf('nightshade') != -1) {
		            reactant = 'nightshade';
		            has_reaction = true;

		            // add mind control
		            PlayState.add_mind_control();
		        }

		    }
		    else if (item.frameName === 'demon_flesh') {

		        if (ingredientsInCauldron.indexOf('fairy_wings') != -1) {
		            reactant = 'fairy_wings';
		            has_reaction = true;

		            // erase contents of cauldron
		            PlayState.erase_all();
		        }
		        else if (ingredientsInCauldron.indexOf('lemons') != -1) {
		            reactant = 'lemons';
		            has_reaction = true;

		            // remove implosion and explosion effects
		            PlayState.remove_imp_exp();
		        }

		    }
		    else if (item.frameName === 'fairy_wings') {

		        if (ingredientsInCauldron.indexOf('demon_flesh') != -1) {
		            reactant = 'demon_flesh';
		            has_reaction = true;

		            // erase contents of cauldron
		            PlayState.erase_all();
		        }

		    }
		    else if (item.frameName === 'nightshade') {

		        if (ingredientsInCauldron.indexOf('cyanide') != -1) {
		            reactant = 'cyanide';
		            has_reaction = true;

		            // add mind control
		            PlayState.add_mind_control();
		        }

		    }
		    else if (item.frameName === 'ghost_pepper') {

		        if (ingredientsInCauldron.indexOf('lemons') != -1) {
		            reactant = 'lemons';
		            has_reaction = true;

		            // remove implosion and explosion effects
		            PlayState.remove_imp_exp();
		        }

		    }
		    else if (item.frameName === 'lemons') {

		        if (ingredientsInCauldron.indexOf('demon_flesh') != -1) {
		            reactant = 'demon_flesh';
		            has_reaction = true;

		            // remove implosion and explosion effects
		            PlayState.remove_imp_exp();
		        }
		        else if (ingredientsInCauldron.indexOf('ghost_pepper') != -1) {
		            reactant = 'ghost_pepper';
		            has_reaction = true;

		            // remove implosion and explosion effects
		            PlayState.remove_imp_exp();
		        }
		        else if (ingredientsInCauldron.indexOf('liquid_smoke') != -1) {
		            reactant = 'liquid_smoke';
		            has_reaction = true;

		            // remove implosion and explosion effects
		            PlayState.remove_imp_exp();
		        }
		    }
		    else if (item.frameName === 'liquid_smoke') {

		        if (ingredientsInCauldron.indexOf('lemons') != -1) {
		            reactant = 'lemons';
		            has_reaction = true;

		            // remove implosion and explosion effects
		            PlayState.remove_imp_exp();
		        }

		    }
		    else if (item.frameName === 'snake_venom') {

		        if (ingredientsInCauldron.indexOf('squid_ink') != -1) {
		            reactant = 'squid_ink';
		            has_reaction = true;

		            // remove tentacles effect
		            PlayState.remove_tentacles();
		        }
		        else if (ingredientsInCauldron.indexOf('tentacles') != -1) {
		            reactant ='tentacles';
		            has_reaction = true;

		            // remove tentacles effect
		            PlayState.remove_tentacles();
		        }

		    }
		    else if (item.frameName === 'squid_ink') {

		        if (ingredientsInCauldron.indexOf('snake_venom') != -1) {
		            reactant = 'snake_venom';
		            has_reaction = true;

		            // remove tentacles effect
		            PlayState.remove_tentacles();
		        }

		    }
		    else if (item.frameName === 'tentacles') {

		        if (ingredientsInCauldron.indexOf('snake_venom') != -1) {
		            reactant = 'snake_venom';
		            has_reaction = true;

		            // remove tentacles effect
		            PlayState.remove_tentacles();
		        }

		    }


		    if (has_reaction) {
		        // stop tracking both of the ingredients so we don't get the same effect again
		        // note that the reaction might have erased everything already
		        if (ingredientsInCauldron.length > 0) {
		            ingredient_index = ingredientsInCauldron.indexOf(reactant);

                    ingredientsInCauldron.splice(ingredient_index, 1);
                    ingredientsInCauldron.splice(ingredientsInCauldron.length - 1, 1);
		        }

		        console.log("REACTION BETWEEN " + item.frameName + " AND " + reactant);
		        var r1 = game.add.sprite(1068, 315, 'items', item.frameName);
		        var r2 = game.add.sprite(1168, 315, 'items', reactant);
		        r1.scale.set(0.4, 0.4);
		        r2.scale.set(0.4, 0.4);

		        game.time.events.add(Phaser.Timer.SECOND*1.5, function (image){ PlayState.delete_reaction_sprites(r1, r2)}, this);
		    }

            PlayState.updateFlavorUI();

	        ////////// DEBUG PRINT

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
	    }

		item.destroy();
		dragged_item = null;
	},

	delete_reaction_sprites: function (sprite1, sprite2) {
	    sprite1.destroy();
	    sprite2.destroy();
	},

	erase_all: function () {
	    ingredientsInCauldron = [];
	    flavorList = [];
	    effects = [];
	    sparkles=false;
	    currentColor = [255, 255, 255];
	    numCol = 0;
	    totalIngred = 0;
	    dirty = false;
	    square.tint = PlayState.hexFromArray(currentColor);
	},

	add_mind_control: function () {
	    var mind_index = effects.indexOf('mind_control');

	    if (mind_index === -1) {
	        effects.push('mind_control');
	    }
	},

	remove_imp_exp: function () {
	    var imp_index = effects.indexOf('implosion');
	    var exp_index = effects.indexOf('explosive');

	    if (imp_index != -1 && exp_index != -1) {
	        effects.splice(imp_index, 1);
	        effects.splice(exp_index, 1);
	    }
	},

	remove_tentacles: function () {
	    var tent_index = effects.indexOf('tentacles');

	    if (tent_index != -1) {
	        effects.splice(tent_index, 1);
	    }
	},

	rightpage: function () {
	    if (shelf_index === 0) {

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
	    if (shelf_index === 1) {
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
	    if (level === 0){
	        add_item('dark_matter');
	        add_item('bleach');
	        add_item('chocolate');
	        add_item('cyanide');
	        add_item('eye_of_newt');
	        add_item('dirt');
	    }
	    if (level === 1) {
	        add_item('blood');
	        add_item('caviar');
	        add_item('demon_flesh');
	        add_item('frog_legs');
	        add_item('liquid_smoke');
	        add_item('mandrake');
	        add_item('quicksilver');
	    }
	    if (level === 2) {
	        add_item('ghost_pepper');
	        add_item('insect_parts');
	        add_item('lizard_eggs');
	        add_item('squid_ink');
	        add_item('tentacles');
	    }
	    if (level === 3) {
	        add_item('fairy_wings');
	        add_item('nightshade');
	        add_item('snake_venom');
	    }
	    if (level === 4) {
	        add_item('pufferfish');
	        add_item('slime');
	        add_item('toadstool');
	    }
	    if (level === 5) {
	        add_item('bone_marrow');
	        add_item('lemons');
	        add_item('leopard_spots');
	    }
	},

	getIngredientFromName: function(name){
	    return ing[name];
	},

	generateCandy: function(){
		/*

	    flavorList = [];
	    effects = [];
	    currentColor = [255, 255, 255];
	    numCol = 0;
	    totalIngred = 0;
	    dirty = false;
	    square.tint = PlayState.hexFromArray(currentColor);*/
	    FinalCandy.createSprite(effects,currentColor,sparkles);
	},

	checkWin: function(){
		/*

	    flavorList = [];
	    effects = [];
	    currentColor = [255, 255, 255];
	    numCol = 0;
	    totalIngred = 0;
	    dirty = false;
	    square.tint = PlayState.hexFromArray(currentColor);*/
	    var winChecker
	    console.log(winState);
	    for (winChecker in winState.flavors){
	    	if (!winState.flavors.hasOwnProperty(winChecker)) {continue;}
	    	if (PlayState.countItems(flavorList,winChecker) !==winState.flavors[winChecker]){
	    		console.log(winChecker);
	    		return false;
	    	}
	    }
	    winChecker=effects.slice();
	    for (var iC =0; iC<winState.effects.length; iC++){
	    	var winEffectIndex=winChecker.indexOf(winState.effects[iC]);
	        if (winEffectIndex !== -1){
	        	winChecker.splice(winEffectIndex, 1);
            } else {
            	return false;
            }
	    }
	    if (winChecker.length!==0){
	    	console.log(winChecker);
	    	return false;
	    }
	    winChecker=PlayState.colorStringFromArray(currentColor);
	    if (winChecker!==winState.color){
	    	console.log(winChecker);
	    	return false;
	    }
	    return true;
	},

	countItems: function(array,item){
		iCount=0;
		for (var iC =0; iC<array.length; iC++){
			if (array[iC] === item){
				iCount++;
			}
		}
		return iCount;
	}
}
