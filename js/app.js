// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (this.x + dt*50)%606;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    //define a player
    this.sprite = 'images/char-horn-girl.png';
    this.x = x;
    this.y = y;
}

//Update the player's positon when there is a collision with any enermy
Player.prototype.update = function() {
    for(var i=0; i<allEnemies.length;i++) {
        var enemy = allEnemies[i];
        if(Math.sqrt(Math.pow(this.x-enemy.x,2)+Math.pow(this.y-enemy.y,2))<50) {
            this.resetPlayer();
            break;
        }
    }
};


//Update the player's score when it reaches to the water
Player.prototype.updateScore = function(prev_y) {
    if(this.y==0 && prev_y!=0) {
        score += 1;
        document.getElementById("score").innerHTML = score;
    }
};

//Reset the player's position to the starting point
Player.prototype.resetPlayer = function() {
    this.x = 101;
    this.y = 415;
}

//Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Handle keyboard input: update the player's postion, then check if there is a collsion or win
Player.prototype.handleInput = function(key) {
    var prev_y = this.y;
    if(key=='left') {
        if(this.x>=101) this.x -= 101;
    } else if(key=='right') {
        if(this.x<=404) this.x += 101;
    } else if(key=='up') {
        if(this.y>=83) this.y -= 83;
    } else if(key=='down') {
        if(this.y<=332) this.y += 83;
    }
    this.update();
    this.updateScore(prev_y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var Enemy1 = new Enemy(0,83);
var Enemy2 = new Enemy(101,246);
var Enemy3 = new Enemy(202,166);
var allEnemies = [Enemy1, Enemy2, Enemy3];

var player = new Player(101,415);

//initialize score
var score = 0;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
