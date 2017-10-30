var game = new Phaser.Game(600, 700, Phaser.AUTO, "game");
var main = { preload : preload , create: create , update : update};
var background;
game.state.add('main', main);
game.state.start('main');
function preload() {
    console.log("Hello")
    game.load.image('background','images/stars.png')
    game.load.image('pro-hero', 'images/pro-hero.png');
    game.load.image('floor','images/floor.png')
    game.load.image('floor','images/floor.png')
}
function create() {
    console.log("World")
    background = game.add.tileSprite(0,0,600,700,'background');
    this.hero = game.add.sprite(game.world.centerX, game.world.centerY, 'pro-hero');
    this.floor = game.add.sprite(250,600,'floor')
    this.floor2 = game.add.sprite(150,400,'floor')
    // background = game.add.tileSprite(0,0,600,700,'background');
    // game.stage.backgroundColor = '#3E86F9';
    this.hero.scale.setTo(0.25,0.25)
    this.floor.scale.setTo(0.25,0.125)
    this.floor2.scale.setTo(0.25,0.125)
    game.canvas.addEventListener('mousedown', requestLock);
    game.input.addMoveCallback(move, this);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable([this.hero,this.floor], Phaser.Physics.ARCADE);
    game.physics.enable([this.hero,this.floor2], Phaser.Physics.ARCADE);

    this.physics.arcade.enable( this.hero );
    this.hero.body.gravity.y = 500;
    this.hero.body.checkCollision.up = false;
    this.hero.body.checkCollision.left = false;
    this.hero.body.checkCollision.right = false;
 
    
    this.hero.body.velocity.y = 500

    // this.hero.body.velocity.setTo(200, 200);
    
    //  This makes the game world bounce-able
    this.hero.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal  and vertical vectors (as an x,y point). "1" is 100% energy return
    this.hero.body.bounce.set(1);

    //this.hero.body.gravity.set(0, 180);

    this.floor.body.immovable = true;
    this.floor2.body.immovable = true
    // tilesprite.body.allowGravity = false;

}
function requestLock() {
    game.input.mouse.requestPointerLock();
}

function move(pointer, x, y, click) {
    if (game.input.mouse.locked && !click)
    {
        this.hero.x += (game.input.mouse.event.movementX)/10;
    }
}

function update() {

    if(game.physics.arcade.collide(this.hero, this.floor)){
        background.tilePosition.y += 10;
    }
    
    if(game.physics.arcade.collide(this.hero,this.floor2)){
        background.tilePosition.y += 10;
    }
}