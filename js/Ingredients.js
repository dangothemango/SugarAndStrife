
var Ingredients = {
	chocolate: {
		known: {
			name: true,
			color: true,
			flavor: true,
			effects: false
		},
		name: 'Chocolate',
		color: [115, 55, 25],
		prettycolor: 'Brown',
		flavor: 'sweet',
		effects: { type:'none' },
		prettyeffects: 'None'
	},
	
	blood: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Sinner\'s Blood',
		color: [217,4,26],
		prettycolor: 'Red',
		flavor: 'salty',
		effects: { type:'none' },
		prettyeffects: 'None'
	},
	
	bone_marrow: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Bone Marrow',
		color: [245,221,39],
		prettycolor: 'Yellow',
		flavor: 'flavorless',
		effects: { type:'tentacles', value: -1 },
		prettyeffects: 'Neutralizes Tentacle Forming'
	},	
	bleach: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Bleach',
		color: [0,0,0],
		prettycolor: 'Removes all Color',
		flavor: 'bitter',
		effects: { type:'poison', value: 1 },
		prettyeffects: 'Poisonous'
	},

	caviar: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Cursed Caviar',
		color: [0,0,0],
		prettycolor: 'Colorless',
		flavor: 'salty',
		effects: { type:'poison', value: -1 },
		prettyeffects: 'Neutralizes Poison'
	},

	cyanide: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Cyanide',
		color: [0,0,0],
		prettycolor: 'Colorless',
		flavor: 'sweet',
		effects: { type:'poison', value: 1 },
		prettyeffects: 'Poisonous'
	},
	
	demon_flesh: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Demon Flesh',
		color: [40,209,40],
		prettycolor: 'Green',
		flavor: 'savory',
		effects: { type:'explosive', value: 1 },
		prettyeffects: 'Explosive',
	},
	
	eye_of_newt: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Eye of Newt',
		color: [0,0,0],
		prettycolor: 'Colorless',
		flavor: 'bitter',
		effects: { type:'mind_control', value: -1 },
		prettyeffects: 'Neutralizes Mind Control'
	},
		
	fairy_wings: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Powdered Fairy Wings',
		color: [0,0,0],
		prettycolor: 'Sparkly',
		flavor: 'sweet',
		effects: { type:'implosion', value: -1 },
		prettyeffects: 'Neutralizes Implosion'
	},
		
	frog_legs: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Frog Legs',
		color: [97,245,39],
		prettycolor: 'Green',
		flavor: 'savory',
		effects: { type:'none' },
		prettyeffects: 'None'
	},
		
	nightshade: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Essence of Nightshade',
		color: [132, 39, 245],
		prettycolor: 'Purple',
		flavor: 'flavorless',
		effects: { type:'poison', value: 1 },
		prettyeffects: 'Poisonous'
	},
	ghost_pepper: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Ghost Pepper',
		color: [237,17,17],
		prettycolor: 'Red',
		flavor: 'spicy',
		effects: { type:'explosive', value: 1 },
		prettyeffects: 'Explosive'
	},
	
	dirt: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Horrible Dirt',
		color: [99,74,47],
		prettycolor: 'Brown',
		flavor: 'flavorless',
		effects: { type:'dirt', value: 1 },
		prettyeffects: 'Overwhelms Everything'
	},
	
	insect_parts: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Insect Parts',
		color: [0,0,0],
		prettycolor: 'Colorless',
		flavor: 'sour',
		effects: { type:'explosive', value: -1 },
		prettyeffects: 'Explosive'
	},
	
	lemons: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Pozest Lemons',
		color: [237,237,47],
		prettycolor: 'Yellow',
		flavor: 'sour',
		effects: { type:'implosion', value: 1 },
		prettyeffects: 'Implosion'
	},
	
	leopard_spots: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Leopard Spots',
		color: [0,0,0],
		prettycolor: 'Black',
		flavor: 'spicy',
		effects: { type:'none' },
		prettyeffects: 'None'
	},
	
	liquid_smoke: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Liquid Smoke',
		color: [19,188,240],
		prettycolor: 'Blue',
		flavor: 'flavorless',
		effects: { type:'explosive', value: 1 },
		prettyeffects: 'Explosive'
	},	
	
	lizard_eggs: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Lizard Eggs',
		color: [233,242,245],
		prettycolor: 'White',
		flavor: 'flavorless',
		effects: { type:'slimification', value: -1 },
		prettyeffects: 'Neutralizes Slimification'
	},
	
	mandrake: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Mandrake',
		color: [28,108,237],
		prettycolor: 'Blue',
		flavor: 'bitter',
		effects: { type:'mind_control', value: 1 },
		prettyeffects: 'Mind Control'
	},
	
	quicksilver: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Quicksilver',
		color: [0,0,0],
		prettycolor: 'Colorless',
		flavor: 'spicy',
		effects: { type:'poison', value: 1 },
		prettyeffects: 'Poisonous'
	},
	
	pufferfish: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Pufferfish',
		color: [237,234,28],
		prettycolor: 'Yellow',
		flavor: 'flavorless',
		effects: { type:'poison', value: 1 },
		prettyeffects: 'Poisonous'
	},
	
	slime: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Slime',
		color: [15,242,34],
		prettycolor: 'Green',
		flavor: 'salty',
		effects: { type:'slimification', value: 1 },
		prettyeffects: 'Slimification'
	},
	
	snake_venom: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Snake Venom',
		color: [0,0,0],
		prettycolor: 'Colorless',
		flavor: 'sweet',
		effects: { type:'poison', value: 1 },
		prettyeffects: 'Poisonous'
	},
	
	squid_ink: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Squid Ink',
		color: [0,0,0],
		prettycolor: 'Black',
		flavor: 'flavorless',
		effects: { type:'tentacles', value: 1 },
		prettyeffects: 'Tentacle Forming'
	},
	
	tentacles: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Tentacles',
		color: [178,33,207],
		prettycolor: 'Purple',
		flavor: 'savory',
		effects: { type:'tentacles', value: 1 },
		prettyeffects: 'Tentacle Forming'
	},
	
	toadstool: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Toadstool',
		color: [0,0,0],
		prettycolor: 'Colorless',
		flavor: 'savory',
		effects: { type:'mind_control', value: 1 },
		prettyeffects: 'Mind Control'
	},
	
	dark_matter: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Dark Matter',
		color: [0,0,0],
		prettycolor: 'Black',
		flavor: 'I can\'t feel my tongue',
		effects: { type:'clear' },
		prettyeffects: 'Destroys Everything'
	},
}
