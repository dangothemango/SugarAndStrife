
var PlayState = {

	preload: function(){
		game.load.atlasJSONHash('submitButton', 'assets/images/buttons/blank_buttons.png','assets/images/buttons/blank_buttons.json');
	    	//temp -- include ingredient json file when completed
		game.load.atlas('seacreatures', 'assets/images/seacreatures_json.png', 'assets/images/seacreatures_json.json');
		game.load.image('cauldron', 'assets/images/cauldron.png');
		//game.load.script('Ingredients', 'assets/ingredients.js');
	},

	create: function() {

		console.log("Play State");

		//debug text
		text = game.add.text(100, 500, 'Nothing in the cauldron', { font: "15px Arial", fill: "#ff0044", align: "center" });

		crabCount = 0;
		ing = ingredients;

		/////////////////////

		var startButton = game.add.button(100,game.world.height-300,'submitButton',submitCandy,this,'Static','Static','Down','Up');

		//  This is just a visual debug grid, it's not needed for the actual Group.align to work
		game.add.sprite(0, 0, game.create.grid('grid', 100 * 15, 100 * 3, 200, 100, 'rgba(0, 250, 0, 1)'));

		cauldron = game.add.sprite(1050,475, 'cauldron');
		cauldron.anchor.set(0.5);
		cauldron.width = 600;
		cauldron.height = 600;

		//group of sprites/items
		group = game.add.group();
		group.inputEnableChildren = true;

		//load from atlas file; sprite name|frameName
		group.createMultiple(1, 'seacreatures', ['blueJellyfish0000', 'crab10000', 'flyingFish0000'], true);

		//if touched, allow drag
		group.onChildInputDown.add(_drag,this); 

		//align on shelves or something
		group.align(15, 3, 200, 100, Phaser.CENTER);
		totalIngred = group.total;

	},

	update: function() {
		/*if pressed submit button | one time thing 
		currently pressing 1 checks win conditions */
		var help = game.input.keyboard.addKey(Phaser.Keyboard.ONE)
		help.onDown.add(checkWin);
	},
	
	render: function() {
		game.debug.text('Available Ingredients: ' + group.total, 74, 600);
		game.debug.text('Drop in cauldron to remove item from the Group', 10, 24);
    
	},

	dropHandler: function(item, pointer) {
		//removes from group if lands in cauldron
		if (checkOverlap(item, cauldron)) {
		totalIngred += 1;


		//keep track of attributes
		// adjust main candy accordingly

		//if BLEACH

		//color
		for (var i=0; i < wincandy.length; i++) {
			//item.attributes
			attri[i] += ing.bleach.color[i];
		}

		//take care of flavoring
		attri[3] = ing.bleach.flavor;

		//effects
		attri[4] = ing.bleach.effects[0];
		//first item
		attri[5] = ing.bleach.effects[1];
		//the rest
		//attri[5] += ing.bleach.effects[1]; 

		//  Remove the item from the Group.
		// keep track of what was put in the cauldron
		if (item.frameName == 'crab10000') {
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
