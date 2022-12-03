class GameOverPic {
    constructor(ctx) {
        this.ctx = ctx;
        this.width = this.ctx.canvas.width / 2;
        this.x = (this.ctx.canvas.width / 2) - (this.width / 2);

        this.img = new Image();
        this.img.src = './images/GameOverpic.png';
        this.img.isReady = false;
        this.img.onload = () => {
            this.height = this.width * this.img.height / this.img.width;
            this.y = (this.ctx.canvas.height / 2) - (this.height / 2);
            this.img.isReady = true;
        }
    }

    draw() {
        if (this.img.isReady) {
            this.ctx.drawImage(
                this.img,
                this.x,
                this.y,
                this.width,
                this.height
            )
        
    }

}

}