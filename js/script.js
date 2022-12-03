const game = new Game("canvas-test") ;

//const startBtn = document.getElementById("start-btn");

window.onload = function() {

  document.getElementById('start-btn').onclick = () => {
      document.getElementById("center-container").hidden = true;
      game.start();

  }
}

document.addEventListener('keydown', (event) => {
	game.player.onKeyEvent(event);
});


document.addEventListener('keyup', () => {
	game.player.onKeyEvent(event)
})

/*
oneKeyDown(keyCode) {
  this.player.oneKeyDown(keyCode);    
}

oneKeyUp(keyCode) {
  this.player.oneKeyUp(keyCode);
}

*/