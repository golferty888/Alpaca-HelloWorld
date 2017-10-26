var game = new Phaser.Game(550, 850, Phaser.AUTO, "game");
var main = { preload : preload , create: create , update : update};
game.state.add('main', main);
game.state.start('main');
function preload() {
    game.load.image('monster','picture/monster.png')
    game.load.image('ground','picture/ground.png')
    game.load.image('path','picture/path.png')
}
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    path = game.add.sprite(120,650,'path');
    path.scale.setTo(0.02)
    game.physics.arcade.enable(path,Phaser.Physics.ARCADE);
    path.body.immovable = true;

    monster = game.add.sprite(240,705,'monster');
    monster.scale.setTo(0.08)
    game.physics.arcade.enable(monster,Phaser.Physics.ARCADE);
    game.canvas.addEventListener('mousedown', requestLock);
    game.input.addMoveCallback(move, this);
    monster.body.velocity.y = 450
    monster.body.collideWorldBounds = true
    monster.body.bounce.set(1)
    monster.body.gravity.y = 570

    ground = game.add.sprite(215,780,'ground');
    ground.scale.setTo(1)
    game.physics.arcade.enable(ground,Phaser.Physics.ARCADE);
    ground.body.immovable = true;
    
    ground2 = game.add.sprite(0,780,'ground');
    ground2.scale.setTo(1)
    game.physics.arcade.enable(ground2,Phaser.Physics.ARCADE)
    ground2.body.immovable = true;

    monster.body.checkCollision.up = false;
    monster.body.checkCollision.left = false;
    monster.body.checkCollision.right = false;
  
    this.stage.backgroundColor = 'F9DD89'
    
}
function requestLock() {
    game.input.mouse.requestPointerLock();
}
function move(pointer, x,y, click) {

        if (game.input.mouse.locked && !click)
        {
            monster.x += game.input.mouse.event.movementX;
        }
    
    }
function update() {
    game.physics.arcade.collide(monster, ground);
    game.physics.arcade.collide(monster, ground2);
    game.physics.arcade.collide(monster, path);
    
}