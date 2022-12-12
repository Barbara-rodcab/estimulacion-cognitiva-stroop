const obstaclesData = [
    {
        color: 'green',
        text: 'blue',
        img: 'blueGreen.png',
    },
    {
        color: 'purple',
        text: 'blue',
        img: 'bluePurple.png',
    },
    {
        color: 'red',
        text: 'blue',
        img: 'blueRed.png',
    },
    {
        color: 'blue',
        text: 'green',
        img: 'greenBlue.png',
    },
    {
        color: 'purple',
        text: 'green',
        img: 'greenPurple.png',
    },
    {
        color: 'red',
        text: 'green',
        img: 'greenRed.png',
    },
    {
        color: 'blue',
        text: 'purple',
        img: 'purpleBlue.png',
    },

    {
        color: 'green',
        text: 'purple',
        img: 'purpleGreen.png',
    },
    {
        color: 'red',
        text: 'purple',
        img: 'purpleRed.png',
    },

    {
        color: 'blue',
        text: 'red',
        img: 'redBlue.png',
    },
    {
        color: 'green',
        text: 'red',
        img: 'redGreen.png',
    },
    {
        color: 'purple',
        text: 'red',
        img: 'redPurple.png',
    },
]

const titleColorArray = [
    "blue",
    "green",
    "purple",
    "red",
]

class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.gameOverPic = new GameOverPic(this.ctx);
        this.bg = new Background(this.ctx);
        this.groundBackground = new GroundBackground(this.ctx);
        this.planetBackground = new PlanetBackground(this.ctx);
        this.player = new Player(this.ctx, this.canvas.width / 2, this.canvas.height - 100);
        this.intervalId = null;
        this.obstacles = [];
        this.tick = 0;
        this.selectedType = '';
        this.score = 0;
        this.type = '';
       
    }

    start() {
        this.setNewType();
        this.intervalId = setInterval(() => {
            this.draw(); // clear me borra el background y start
            this.move();
            this.checkCollisions();
            this.clearObstacles();
            this.tick++;
            if (this.tick % 80 === 0) {
                this.addObstacle();
            }
            if (this.tick % 480 === 0) {
                this.setNewType();
            }
        }, 1000 / 60);
    }

    draw() {
        this.bg.draw();
        this.groundBackground.draw();
        this.planetBackground.draw();
        this.player.draw();
        this.obstacles.forEach(obstacle => {
            obstacle.draw();
        });
        this.drawScore();
        this.drawSelected();
    }

    move() {
        this.bg.move();
        this.groundBackground.move();
        this.planetBackground.move();
        this.player.move();
        this.obstacles.forEach(obstacle => {
            obstacle.move();
        });
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    clearObstacles() {
        this.obstacles = this.obstacles.filter(obstacle => {
            if (obstacle.y < this.canvas.height) {
                return true;
            }
            if (obstacle.type === this.selectedType) {
                this.gameOver();

            }
            return false;
        });
    }

    addObstacle() {
        const randomIndex = Math.floor(Math.random() * obstaclesData.length);
        //console.log(randomIndex);
        const randomWidth = Math.random() * 100 + 50;
        const randomX = Math.random() * (this.canvas.width - randomWidth);
        const obstacle = new Obstacle(
            this.ctx, randomX,
            - this.player.height,
            randomWidth,
            obstaclesData[randomIndex].img,
            obstaclesData[randomIndex][this.type]
        );
        this.obstacles.push(obstacle);
    }

    checkCollisions() {
        const collidingObs = this.obstacles.find(obstacle => this.player.isColliding(obstacle))
        if (collidingObs) {

            if (collidingObs.type === this.selectedType) {
                this.score++;
                this.obstacles.splice(this.obstacles.indexOf(collidingObs), 1)
            } 
            else {
                this.gameOver();
            }
        }
    }

    gameOver() {
        clearInterval(this.intervalId);

        this.ctx.save();

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.restore();
        this.gameOverPic.draw();

        const playAgainBtn = document.querySelector(".buttons-playagain")
        console.log ("entro")
        playAgainBtn.classList.remove('hidden')

        
    

        /* this.ctx.font = '64px sans-serif';
        this.ctx.fillStyle = 'white';
        */

        if (this.score === 0) {
            this.ctx.textAlign = "center";
            this.ctx.fillText(`You dont have any points!`, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 70);

        } else if (this.score === 1) {

            this.ctx.textAlign = "center";
            this.ctx.fillText(`You have ${this.score} point!!`, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 70);

        } else {
            this.ctx.textAlign = "center";
            this.ctx.fillText(`You have ${this.score} points!!`, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 70);
        }

    }

    drawScore() {
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = '24px Arial';
        this.ctx.fillText("Score:" + this.score, 10, 30);
    }
    drawSelected() {
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = '35px Arial';
        console.log(this.type);
        this.ctx.fillText(this.type + ': ' + this.selectedType, 30, 60);
    }

    setNewType() {
        this.selectedType = titleColorArray[Math.floor(Math.random() * titleColorArray.length)];
    }
}
