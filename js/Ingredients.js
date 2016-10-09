
var Ingredients = {

	<name (all lower case no spaces)>: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: '<name, (as you would read it)>',
		color: [<H>,<S>,<V>],
		prettycolor: '<Color (as you would read it)>',
		flavor: '<flavor (all lower case)>',
		effects: { type:'<poison, explosive, tentacles, etc>', value: <1 if adds effect, -1 if negates it> },
		prettyeffects: '<Effect (as you would read it)>'
	},

	bleach: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Bleach',
		color: [-1,-1,-1],
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

	chocolate: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Chocolate',
		color: [30,100,40],
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
		color: [348,91,86],
		prettycolor: 'Red',
		flavor: 'salty',
		effects: { type:'none' },
		prettyeffects: 'None'
	},

	darkmatter: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Dark Matter',
		color: [0,0,-1],
		prettycolor: 'Black',
		flavor: 'I cant feel my tongue',
		effects: { type:'clear' },
		prettyeffects: 'Destroys Everything'
	}
}