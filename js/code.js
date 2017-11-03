var game = new Phaser.Game(600 , 800, Phaser.AUTO, "game")
var main = { preload : preload , create: create , update : update}
var background
var player;
var ledges;
var bads;
var score;
var compa;
var badsCompa
var scoreText;
var end
game.state.add('main', main)
game.state.start('main')

function preload() {
    game.load.image('wallpapere','images/wallpapere.jpg')
    game.load.image('demon', 'images/demon.png')
    game.load.image('platform','images/platform.png')
    game.load.image('obstacle','images/obstacle.png')
}
function create() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		back = game.add.tileSprite(0,0,600,800,'wallpapere')
		game.camera.bounds = null
		ledges = game.add.group()
		ledges.enableBody = true
		ledges.physicsBodyTypes = Phaser.Physics.ARCADE
		bads = game.add.group()
		bads.enableBody = true
		bads.physicsBodyTypes = Phaser.Physics.ARCADE
		
		scoreText = game.add.text(25, 25, "" , { font: '30px Courrier New', fill: '#fff' })

		bool = true
		bool2 = false

		badsCompa = game.camera.y
		compa = game.camera.y
        score = game.camera.y
        
		spawnPlayer()
		loadLedge()
		spawnLedge()
		loadBad()
        spawnBad()
        
        game.canvas.addEventListener('mousedown', requestLock)
        game.input.addMoveCallback(move, this)
    }

function requestLock() {
    game.input.mouse.requestPointerLock()
}

function move(pointer, x, y, click) {
    if (game.input.mouse.locked && !click)
    {
        player.x += (game.input.mouse.event.movementX)/10
    }
}

function update() {
	score = - game.camera.y;
	game.physics.arcade.collide(player, ledges)
	
	game.physics.arcade.overlap(player, bads, killPlayer, null , this)

	if(game.camera.y < badsCompa-1000) {
		spawnBad(game.camera.y)
		badsCompa = game.camera.y
	}		
	if(game.camera.y < compa) {
		if(bool2) {
			spawnLedge(game.camera.y)
			bool2 = false
		}
		else {
			var rnd = game.rnd.integerInRange(0, 20)
			if(rnd<4){
				spawnLedge(game.camera.y)
			}
			bool2 = true
		}
		compa = game.camera.y -100;
	}
    if(player.y -350 < game.camera.y) {
		game.camera.y = player.y-350
		back.y = player.y-350
		scoreText.y = player.y-325
    }
	if(game.physics.arcade.distanceBetween(game.camera.y,player) > 800) {
		killPlayer();
	}
	if(game.physics.arcade.distanceBetween(ledges.y,player) > 500) {
		killLedge()
	}
	scoreText.setText("score : " + score)
}

    function spawnPlayer() {
        player = game.add.sprite(game.world.centerX, game.world.centerY, 'demon')
        player.scale.setTo(0.25,0.25)
		game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = false
        player.body.checkCollision.up = false
        player.body.checkCollision.left = false
        player.body.checkCollision.right = false
        player.body.bounce.setTo(2)
        player.body.gravity.y = 500
        player.body.velocity.y = 700
    }
    
	function loadLedge() {
		for(var i = 0; i < 10; i++) {
			var x = game.rnd.integerInRange(10, 500)
            var ledge = ledges.create(x,i*200, "platform")
			ledge.body.checkCollision.down = false
			ledge.body.immovable = true
		}
    }
    
	function spawnLedge(y) {
		var x = game.rnd.integerInRange(10, 500);		
        var ledge = ledges.create(x, y-100, "platform")
		ledge.body.checkCollision.down = false
		ledge.body.immovable = true
    }
    
	function loadBad() {
		for(var i = 0; i < 0; i++) {
			var x = game.rnd.integerInRange(10, 500)
        	var bad = bads.create(x,i*200, "obstacle")
			bad.body.checkCollision.down = false
			bad.body.immovable = true
		}
	}
	
	function spawnBad(y) {
		var x = game.rnd.integerInRange(10, 500)			
        var bad = bads.create(x, y-100, "obstacle")
		bad.body.checkCollision.down = false
		bad.body.immovable = true
	}
    
	function killPlayer() {
		console.log("lalalalalal")
		end = game.add.text(player.x-150, player.y, "GAME OVER!! \n F5 to restart!" , { font: '60px Courrier New', fill: '#EFF700' });
		player.kill();
    }
 	function killLedge(ledge){
		ledge.kill();
    }   
	function killBad(bad) {
		bad.kill();
	}