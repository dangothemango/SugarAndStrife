
var Ingredients = {
	chocolate: {
		known: {
			name: false,
			color: false,
			flavor: false,
			effects: false
		},
		name: 'Chocolate',
		color: [115, 55, 25],
		prettycolor: 'Brown',
		flavor: 'sweet',
		effects: { type:'none' },
		type: 'solid',
		prettyeffects: 'None'
	},
	
	blood: {
		known: {
			name: false,
			color: false,
			flavor: false,
			effects: false
		},
		name: 'Sinner\'s Blood',
		color: [217,4,26],
		prettycolor: 'Red',
		flavor: 'salty',
		effects: { type:'none' },
		type: 'liquid',
		prettyeffects: 'None'
	},
	
	bone_marrow: {
		known: {
			name: false,
			color: false,
			flavor: false,
			effects: false
		},
		name: 'Bone Marrow',
		color: [245,221,39],
		prettycolor: 'Yellow',
		flavor: 'flavorless',
		effects: { type:'tentacles', value: -1 },
		type: 'solid',
		prettyeffects: 'Neutralizes Tentacle Forming'
	},	
	bleach: {
		known: {
			name: false,
			color: false,
			flavor: false,
			effects: false
		},
		name: 'Bleach',
		color: [0,0,0],
		prettycolor: 'Removes all Color',
		flavor: 'bitter',
		effects: { type:'poison', value: 1 },
		type: 'liquid',
		prettyeffects: 'Poisonous'
	},

	caviar: {
		known: {
			name: false,
			color: false,
			flavor: false,
			effects: false
		},
		name: 'Cursed Caviar',
		color: [0,0,0],
		prettycolor: 'Colorless',
		flavor: 'salty',
		effects: { type:'poison', value: -1 },
		type: 'solid',
		prettyeffects: 'Neutralizes Poison'
	},

	cyanide: {
		known: {
			name: false,
			color: false,
			flavor: false,
			effects: false
		},
		name: 'Cyanide',
		color: [0,0,0],
		prettycolor: 'Colorless',
		flavor: 'sweet',
		effects: { type:'poison', value: 1 },
		type: 'liquid',
		prettyeffects: 'Poisonous'
	},
	
	demon_flesh: {
		known: {
			name: false,
			color: false,
			flavor: false,
			effects: false
		},
		name: 'Demon Flesh',
		color: [40,209,40],
		prettycolor: 'Green',
		flavor: 'savory',
		effects: { type:'explosive', value: 1 },
		type: 'solid',
		prettyeffects: 'Explosive',
	},
	
	eye_of_newt: {
		known: {
			name: false,
			color: false,
			flavor: false,
			effects: false
		},
		name: 'Eye Of Newt',
		color: [0,0,0],
		prettycolor: 'Colorless',
		flavor: 'bitter',
		effects: { type:'mind_control', value: -1 },
		type: 'solid',
		prettyeffects: 'Neutralizes Mind Control'
	},
		
	fairy_wings: {
		known: {
			name: false,
			color: false,
			flavor: false,
			effects: false
		},
		name: 'Powdered Fairy Wings',
		color: [0,0,0],
		prettycolor: 'Sparkly',
		flavor: 'sweet',
		effects: { type:'implosion', value: -1 },
		type: 'powder',
		prettyeffects: 'Neutralizes Implosion'
	},
		
	frog_legs: {
		known: {
			name: false,
			color: false,
			flavor: false,
			effects: false
		},
		name: 'Frog Legs',
		color: [97,245,39],
		prettycolor: 'Green',
		flavor: 'savory',
		effects: { type:'none' },
		type: 'solid',
		prettyeffects: 'None'
	},
		
	nightshade: {
		known: {
			name: false,
			color: false,
			flavor: false,
			effects: false
		},
		name: 'Essence Of Nightshade',
		color: [132, 39, 245],
		prettycolor: 'Purple',
		flavor: 'flavorless',
		effects: { type:'poison', value: 1 },
		type: 'powder',
		prettyeffects: 'Poisonous'
	},
	ghost_pepper: {
		known: {
			name: false,
			color: false,
			flavor: false,
			effects: false
		},
		name: 'Ghost Pepper',
		color: [237,17,17],
		prettycolor: 'Red',
		flavor: 'spicy',
		effects: { type:'explosive', value: 1 },
		type: 'solid',
		prettyeffects: 'Explosive'
	},
	
	dirt: {
		known: {
			name: false,
			color: false,
			flavor: false,
			effects: false
		},
		name: 'Horrible Dirt',
		color: [86,78,60],
		prettycolor: 'Brown',
		flavor: 'flavorless',
		effects: { type:'dirt', value: 1 },
		type: 'powder',
		prettyeffects: 'Overwhelms Everything'
	},
	
	insect_parts: {
		known: {
			name: false,
			color: false,
			flavor: false,
			effects: false
		},
		name: 'Insect Parts',
		color: [0,0,0],
		prettycolor: 'Colorless',
		flavor: 'sour',
		effects: { type:'explosive', value: -1 },
		type: 'solid',
		prettyeffects: 'Neutralizes Explosives'
	},
	
	lemons: {
		known: {
			name: false,
			color: false,
			flavor: false,
			effects: false
		},
		name: 'Pozest Lemons',
		color: [237,237,47],
		prettycolor: 'Yellow',
		flavor: 'sour',
		effects: { type:'implosion', value: 1 },
		type: 'solid',
		prettyeffects: 'Implosion'
	},
	
	leopard_spots: {
		known: {
			name: false,
			color: false,
			flavor: false,
			effects: false
		},
		name: 'Leopard Spots',
		color: [0,0,0],
		prettycolor: 'Black',
		flavor: 'spicy',
		effects: { type:'none' },
		type: 'solid',
		prettyeffects: 'None'
	},
	
	liquid_smoke: {
		known: {
			name: false,
			color: false,
			flavor: false,
			effects: false
		},
		name: 'Liquid Smoke',
		color: [19,188,240],
		prettycolor: 'Blue',
		flavor: 'flavorless',
		effects: { type:'explosive', value: 1 },
		type: 'liquid',
		prettyeffects: 'Explosive'
	},	
	
	lizard_eggs: {
		known: {
			name: false,
			color: false,
			flavor: false,
			effects: false
		},
		name: 'Lizard Eggs',
		color: [233,242,245],
		prettycolor: 'White',
		flavor: 'flavorless',
		effects: { type:'slimification', value: -1 },
		type: 'solid',
		prettyeffects: 'Neutralizes Slimification'
	},
	
	mandrake: {
		known: {
			name: false,
			color: false,
			flavor: false,
			effects: false
		},
		name: 'Mandrake',
		color: [28,108,237],
		prettycolor: 'Blue',
		flavor: 'bitter',
		effects: { type:'mind_control', value: 1 },
		type: 'solid',
		prettyeffects: 'Mind Control'
	},
	
	quicksilver: {
		known: {
			name: false,
			color: false,
			flavor: false,
			effects: false
		},
		name: 'Quicksilver',
		color: [0,0,0],
		prettycolor: 'Colorless',
		flavor: 'spicy',
		effects: { type:'poison', value: 1 },
		type: 'liquid',
		prettyeffects: 'Poisonous'
	},
	
	pufferfish: {
		known: {
			name: false,
			color: false,
			flavor: false,
			effects: false
		},
		name: 'Pufferfish',
		color: [237,234,28],
		prettycolor: 'Yellow',
		flavor: 'flavorless',
		effects: { type:'poison', value: 1 },
		type: 'solid',
		prettyeffects: 'Poisonous'
	},
	
	slime: {
		known: {
			name: false,
			color: false,
			flavor: false,
			effects: false
		},
		name: 'Slime',
		color: [15,242,34],
		prettycolor: 'Green',
		flavor: 'salty',
		effects: { type:'slimification', value: 1 },
		type: 'liquid',
		prettyeffects: 'Slimification'
	},
	
	snake_venom: {
		known: {
			name: false,
			color: false,
			flavor: false,
			effects: false
		},
		name: 'Snake Venom',
		color: [0,0,0],
		prettycolor: 'Colorless',
		flavor: 'sweet',
		effects: { type:'poison', value: 1 },
		type: 'liquid',
		prettyeffects: 'Poisonous'
	},
	
	squid_ink: {
		known: {
			name: false,
			color: false,
			flavor: false,
			effects: false
		},
		name: 'Squid Ink',
		color: [0,0,0],
		prettycolor: 'Black',
		flavor: 'flavorless',
		effects: { type:'tentacles', value: 1 },
		type: 'liquid',
		prettyeffects: 'Tentacle Forming'
	},
	
	tentacles: {
		known: {
			name: false,
			color: false,
			flavor: false,
			effects: false
		},
		name: 'Tentacles',
		color: [178,33,207],
		prettycolor: 'Purple',
		flavor: 'savory',
		effects: { type:'tentacles', value: 1 },
		type: 'solid',
		prettyeffects: 'Tentacle Forming'
	},
	
	toadstool: {
		known: {
			name: false,
			color: false,
			flavor: false,
			effects: false
		},
		name: 'Toadstool',
		color: [0,0,0],
		prettycolor: 'Colorless',
		flavor: 'savory',
		effects: { type:'mind_control', value: 1 },
		type: 'solid',
		prettyeffects: 'Mind Control'
	},
	
	dark_matter: {
		known: {
			name: false,
			color: false,
			flavor: false,
			effects: false
		},
		name: 'Dark Matter',
		color: [0,0,0],
		prettycolor: 'Black',
		flavor: 'I can\'t feel my tongue',
		effects: { type:'clear' },
		type: 'solid',
		prettyeffects: 'Destroys Everything'
	},
}
