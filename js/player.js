class Player {
	constructor(ctx, x, y) {
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.width = 70;
		this.xFrame = 0;
		this.yFrame = 0;
		this.horizontalFrames = 4;
		this.verticalFrames = 4;
		this.speed = 5;
		this.vx = 0;
		this.vy = 0;
		this.img = new Image();
		this.tick = 0;

		this.img.src = "./images/spacemanSpriteOk.png";
		this.isReady = false;
		this.img.onload = () => {
			this.height = this.width * this.img.height / this.img.width;
			this.isReady = true;
		}
		this.movements = {
			up: false,
			down: false,
			left: false,
			right: false,
		};
			
		this.moving = false
	}

	draw() {
		if (this.isReady) {
			this.ctx.drawImage(
				this.img,
				this.img.width / this.horizontalFrames * this.xFrame,
				this.img.height / this.verticalFrames * this.yFrame,
				this.img.width / this.horizontalFrames,
				this.img.height / this.verticalFrames, 
				 this.x, 
				 this.y, 
				 this.width, 
				 this.height
				 );
				 this.tick++;
		}

	}

	move() {
		if (Object.values(this.movements).every(movement => movement === false)) {
			this.yFrame = 0
			this.xFrame = 0
		} else {
			if (this.tick % 120 === 0) {
				this.xFrame++;
				if (this.xFrame >= this.horizontalFrames - 1) {
					this.xFrame = 0;
				}
			}
		}
		if (this.movements.left) {
			this.vx = -this.speed;
			this.yFrame = 1;
		} else if (this.movements.right) {
			this.vx = this.speed;
			this.yFrame = 2;
		} else {
			this.vx = 0;
		}

		if (this.movements.up) {
			this.vy = -this.speed;
			this.yFrame = 3;
		} else if (this.movements.down) {
			this.vy = this.speed;
		} else {
			this.vy = 0;
		}

		
		this.x += this.vx;
		this.y += this.vy;

		if (this.x <= 0) {
			this.x = 0;
		} else if (this.x + this.width >= this.ctx.canvas.width) {
			this.x = this.ctx.canvas.width - this.width;
		}

		if (this.y <= 0) {
			this.y = 0;
		} else if (this.y + this.height >= this.ctx.canvas.height) {
			this.y = this.ctx.canvas.height - this.height;
		}
	}

	onKeyEvent(event) {
		const status = event.type === "keydown";

		if (event.keyCode === 37) {
			this.movements.left = status;
		} else if (event.keyCode === 39) {
			this.movements.right = status;
		} else if (event.keyCode === 38) {
			this.movements.up = status;
		} else if (event.keyCode === 40) {
			this.movements.down = status;
		}
	}

    isColliding(obstacle) {
		const threshold = 20;
		return this.x + threshold < obstacle.x + obstacle.width
			&& this.x + this.width > obstacle.x + threshold
			&& this.y + threshold < obstacle.y + obstacle.height
			&& this.y + this.height > obstacle.y + threshold;
	}
	
}