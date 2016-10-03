

var game = new Phaser.Game(750,1334, Phaser.AUTO, '', { preload:preload, create: create, update:update});

game.state.add('Menu',MenuState);
game.state.add('Play',PlayState);
game.state.add('Cut',Cutscene);
game.state.add('Win',WinState);


game.state.start('Menu');

function preload() {

}

function create() {

}

function update() {

}