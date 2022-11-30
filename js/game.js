const obstaclesImages = [
    'blueGreen.png',
    'bluePurple.png',
    'blueRed.png',
    'greenBlue.png',
    'greenPurple.png',
    'greenRed.png',
    'purpleBlue.png',
    'purpleGreen.png',
    'redBlue.png',
    'redGreen.png',
    'redPurple.png', 
]

class Game {
    constructor(canvasId){
        this.canvas = document.getElementById(canvasId);
		this.ctx = this.canvas.getContext("2d");
        this.bg = new Background(this.ctx);
        this.player = new Player(this.ctx, this.canvas.width / 2, this.canvas.height - 100);
        this.intervalId = null;
        this.obstacles= [];
		this.tick = 0;
    }

    start(){
        this.intervalId = setInterval (() => {
            this.draw(); // clear me borra el background y start
            this.move();
            this.checkCollisions();
            this.tick++;
			if (this.tick % 80 === 0) {
				this.addObstacle();
			}
        }, 1000 / 60);
    }

    draw(){
        this.bg.draw();
        this.player.draw();
        this.obstacles.forEach(obstacle => {
			obstacle.draw();
		});
    }

    move() {
        this.bg.move();
		this.player.move();
        this.obstacles.forEach(obstacle => {
			obstacle.move();
		}); 
    }

    clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.obstacles = this.obstacles.filter(obstacle => obstacle.y < this.canvas.height);
    }

    addObstacle() {
        const randomIndex = Math.floor(Math.random() * obstaclesImages.length);
        console.log(randomIndex);
		const randomWidth = Math.random() * 100 + 50;
		const randomX = Math.random() * (this.canvas.width - randomWidth);
		const obstacle = new Obstacle(this.ctx, randomX, - this.player.height, randomWidth, obstaclesImages[randomIndex]);
		this.obstacles.push(obstacle);
	}
   
   checkCollisions() {
		if (this.obstacles.some(obstacle => this.player.isColliding(obstacle))) {
			this.gameOver();
		}
	}

	gameOver() {
		clearInterval(this.intervalId);
		this.ctx.fillStyle = "rgba(50, 50, 50, 0.7)";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.fillStyle = "rgb(255, 255, 255)";
		this.ctx.font = "40px Arial";
		this.ctx.textAlign = "center";
		this.ctx.fillText("Game Over", this.canvas.width / 2, this.canvas.height / 2);
	}
    
}