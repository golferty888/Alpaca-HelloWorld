var game = new Phaser.Game(300, 500, Phaser.AUTO, "game");
var main = { preload : preload , create: create , update : update};
game.state.add('main', main);
game.state.start('main');
function preload() {
    game.load.image('mamegoma','image/mamegoma.jpg')
    game.load.image('window','image/window.jpg')
    game.load.image('platfrom','image/platfrom.jpg')
}
function create() {
    game.add.sprite(0, 0, 'window')
    // game.add.sprite(100,400,'platfrom')  
    // game.add.sprite(0,0,'mamegoma')

    game.physics.startSystem(Phaser.Physics.ARCADE)

    char = game.add.sprite(game.world.centerX, game.world.centerY, 'mamegoma')
    game.physics.enable(char, Phaser.Physics.ARCADE)
    char.body.velocity.y = 300
    char.body.collideWorldBounds = true
    char.body.bounce.set(1)
    char.body.gravity.y = 300

    game.canvas.addEventListener('mousedown', requestLock);
    game.input.addMoveCallback(move, this);
}

function requestLock() {
    game.input.mouse.requestPointerLock();
}

function move(pointer, x, y, click) {
    if (game.input.mouse.locked && !click)
    {
        char.x += game.input.mouse.event.movementX;
    }
}

function update() {
    
}