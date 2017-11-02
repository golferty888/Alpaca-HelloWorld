var game = new Phaser.Game(600 , 800, Phaser.AUTO, "game");
var main = { preload : preload , create: create , update : update};
var background;
var i;
var score = 0;
var scoreText;
var coin = 0;
var coinText;
game.state.add('main', main);
game.state.start('main');
function preload() {
    console.log("Hello")
    game.load.image('background','images/wallpapere.jpg')
    game.load.image('pro-hero', 'images/demon.png');
    game.load.image('floor','images/platform.png')
    game.load.image('obstacle','images/obstacle.png')
    // game.load.image('floor','images/floor.png')
}
function create() {
    console.log("World")
    game.physics.startSystem(Phaser.Physics.ARCADE);

    background = game.add.tileSprite(0,0,600,800,'background');

    hero = game.add.sprite(game.world.centerX, game.world.centerY, 'pro-hero');
    hero.scale.setTo(0.25,0.25)
    game.physics.enable( hero, Phaser.Physics.ARCADE); 
    hero.body.gravity.y = 500;
    hero.body.checkCollision.up = false;
    hero.body.checkCollision.left = false;
    hero.body.checkCollision.right = false;
    hero.body.velocity.y = 500
    hero.body.collideWorldBounds = true;    
    hero.body.bounce.set(1);

    floors = game.add.group()
    floors.physicsBodytype = Phaser.Physics.ARCADE;
    floors.enableBody = true;
    floor =[]
    for (var i = 0; i < 15; i++){
        floor[i] = floors.create( Math.random() * 650, Math.random() * 650, 'floor');
        floor[i].body.immovable = true;
        floor[i].body.velocity.y = 100;
        floor[i].body.checkCollision.down = false;
        floor[i].body.checkCollision.left = false;
        floor[i].body.checkCollision.right = false;
        
    }
    
    scoreText = game.add.text(25, 20, 'score: 0', { font: "30px Arial", fill: "#ffffff", align: "left" });
    coinText = game.add.text(25,50,'coin: 0', { font: "30px Arial", fill: "#ffffff", align: "left" });

    obstacleCreate()

    game.canvas.addEventListener('mousedown', requestLock);
    game.input.addMoveCallback(move, this);

}
function requestLock() {
    game.input.mouse.requestPointerLock();
}

function move(pointer, x, y, click) {
    if (game.input.mouse.locked && !click)
    {
        hero.x += (game.input.mouse.event.movementX)/10;
    }
}

function obstacleCreate() {
    obsta = game.add.group()
    obsta.physicsBodytype = Phaser.Physics.ARCADE
    obsta.enableBody = true
    for (var i = 0; i < 2; i++){
        let obstas = obsta.create(Math.random() * 400, Math.random() * 400, 'obstacle')
        obstas.body.immovable = true
        obstas.body.velocity.y = 100;
    }
}

function update() {
    if(game.physics.arcade.collide(hero, floor[i])){
        floor[i].body.velocity.y = 100;
    }
    // if (herohitfloor){
    //     score += 10;
    //     scoreText.text = 'score: ' + score;
    // }
    // if (herohitcoin){
    //     coin += 1;
    //     coinText.text = 'coin: '+ coin;
    // }

}