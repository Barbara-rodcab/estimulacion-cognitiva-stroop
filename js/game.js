class Game {
    constructor(canvasId){
        this.canvas = document.getElementById(canvasId);
		this.ctx = this.canvas.getContext("2d");
        this.intervalId = null;
        this.bg = new Background(this.ctx);
    }
}