
var Ingredients = {
	bleach: {
		known: {
			name: true,
			color: false,
			flavor: true,
			effects: false
		},
		name: 'Bleach',
		color: [-1,-1,-1],
		flavor: 'bitter',
		effects: { type:'poison', value: 1 }
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
		flavor: 'salty',
		effects: { type:'poison', value: -1 }
	}
}