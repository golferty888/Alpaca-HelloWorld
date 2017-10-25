var game = new Phaser.Game(1500, 600, Phaser.AUTO, "game");
var main = { preload : preload , create: create , update : update};
game.state.add('main', main);
game.state.start('main');
function preload() {
    console.log("preload")
}
function create() {
    console.log("create")
}
function update() {
    console.log("This is Monster Jump")
}