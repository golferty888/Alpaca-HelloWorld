var game = new Phaser.Game(600 , 800, Phaser.AUTO, "game");
var main = { preload : preload , create: create , update : update};
var background;
game.state.add('main', main);
game.state.start('main');
function preload() {
    console.log("Hello")
    game.load.image('background','images/stars.png')
    game.load.image('pro-hero', 'images/pro-hero.png');
    game.load.image('floor','images/floor.png')
    // game.load.image('floor','images/floor.png')
}
function create() {
    console.log("World")
    game.physics.startSystem(Phaser.Physics.ARCADE);
    background = game.add.tileSprite(0,0,600,700,'background');
    hero = game.add.sprite(game.world.centerX, game.world.centerY, 'pro-hero');
    hero.scale.setTo(0.25,0.25)
    game.physics.enable( hero, Phaser.Physics.ARCADE); 
    //physics.arcade.enable( hero );
    hero.body.gravity.y = 500;
    hero.body.checkCollision.up = false;
    hero.body.checkCollision.left = false;
    hero.body.checkCollision.right = false;
    hero.body.velocity.y = 500
    hero.body.collideWorldBounds = true;    
    hero.body.bounce.set(1);

    // this.floor = game.add.sprite(250,600,'floor')
    // this.floor2 = game.add.sprite(150,400,'floor')
    floors = game.add.group()
    floors.enableBody = true;
    //floors.scale.setTo(0.25,0.125)
    floors.scale.set( 0.25,0.25 )
    floors.physicsBodytype = Phaser.Physics.ARCADE;
    // floor1 = this.floors.create(250,600,'floor')
    // floor2 = this.floors.create(150,400,'floor')
    // game.stage.backgroundColor = '#3E86F9';
    // for (var i = 0; i < 16; i++)
    // {
    // floor1 = floors.create(0,0, 'floor');
    // floor2 = floors.create(400,500, 'floor');
    // floor3 = floors.create(600,700, 'floor');
    floor3 = floors.create(game.world.centerX, game.world.centerY, 'floor');

    // }
   
 
    // floor2.scale.setTo(0.25,0.125)
    game.canvas.addEventListener('mousedown', requestLock);
    game.input.addMoveCallback(move, this);


    //game.physics.enable([ hero, floors ], Phaser.Physics.ARCADE);
    // game.physics.enable([this.hero,floor2], Phaser.Physics.ARCADE);
    
    // floor2.physicsBodytype = Phaser.Physics.ARCADE;

    //physics.arcade.enable( hero );
    

    // this.hero.body.velocity.setTo(200, 200);
    
    //  This makes the game world bounce-able
    
    //this.hero.body.gravity.set(0, 180);

    // this.floors.body.immovable == true;
    // floor2.body.immovable = true;
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

    if(game.physics.arcade.collide(hero, floors)){
        background.tilePosition.y += 10;
    }
    
    if(game.physics.arcade.collide(hero,floors)){
        background.tilePosition.y += 10;
    }
}