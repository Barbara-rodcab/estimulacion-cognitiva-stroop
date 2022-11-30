const game = new Game("canvas-test") ;
const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", () => {
  const startGameDiv =document.querySelector ('#startGame');
  startGameDiv.remove()
  game.start();

});

document.addEventListener('keydown', (event) => {
	game.player.onKeyEvent(event);
});

document.addEventListener('keyup', () => {
	game.player.onKeyEvent(event)
})
