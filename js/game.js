const obstaclesData = [
    {
        type: 'green',
        img: 'blueGreen.png',
    },
    {
        type: 'purple',
        img: 'bluePurple.png',
    },
    {
        type: 'red',
        img: 'blueRed.png',
    },
    {
        type: 'blue',
        img: 'greenBlue.png',
    },
    {
        type: 'purple',
        img: 'greenPurple.png',
    },
    {
        type: 'red',
        img: 'greenRed.png',
    },
    {
        type: 'blue',
        img: 'purpleBlue.png',
    },

    {
        type: 'green',
        img:  'purpleGreen.png',
    },
    {
        type: 'blue',
        img:  'redBlue.png',
    },
    {
        type: 'green',
        img:  'redGreen.png',
    },
    {
        type: 'purple',
        img:  'redPurple.png', 
    },
]

const titlearray =[
    "blue",
    "green",
    "purple", 
    "red",
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
        this.selectedType = '';
        this.score = 0;
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
        this.selectedType = titlearray[Math.floor(Math.random() * titlearray.length)];
    }

    draw(){
        this.bg.draw();
        this.player.draw();
        this.obstacles.forEach(obstacle => {
			obstacle.draw();
		});
        this.drawScore();
        this.drawSelected();
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
        const randomIndex = Math.floor(Math.random() * obstaclesData.length);
        console.log(randomIndex);
		const randomWidth = Math.random() * 100 + 50;
		const randomX = Math.random() * (this.canvas.width - randomWidth);
		const obstacle = new Obstacle(
            this.ctx, randomX,
            - this.player.height,
            randomWidth,
            obstaclesData[randomIndex].img,
            obstaclesData[randomIndex].type
        );
		this.obstacles.push(obstacle);
	}
   
   checkCollisions() {
    const collidingObs = this.obstacles.find(obstacle => this.player.isColliding(obstacle))
		if (collidingObs) {
            console.log(collidingObs.type);
            if (collidingObs.type === this.selectedType) {
                this.score++;
                this.obstacles.splice(this.obstacles.indexOf(collidingObs), 1)
            } else {
                this.gameOver();
            }
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

    drawScore() {
		this.ctx.fillStyle = '#000';
		this.ctx.font = '24px Arial';
		this.ctx.fillText("Score:" + this.score, 10, 30);
	}
    drawSelected () {
        this.ctx.fillStyle = '#000';
		this.ctx.font = '30px Arial';
		this.ctx.fillText("Color:" + this.selectedType, 40, 60);
	}
    }