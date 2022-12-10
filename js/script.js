
const game = new Game("canvas-test");

//const startBtn = document.getElementById("start-btn");

window.onload = function() {

  document.getElementById('start-btn').onclick = () => {
      document.getElementById("center-container").hidden = true;
      document.getElementById('buttons-container').classList.remove('hidden');
  }

  document.getElementById('color-btn').onclick = () => {
    console.log('color-btn')
    document.getElementById("buttons-container").classList.add('hidden');
    game.type = 'color';
    game.start();
  }

  document.getElementById('text-btn').onclick = () => {
    console.log('text-btn')
    document.getElementById("buttons-container").classList.add('hidden');
    game.type = 'text';
    game.start();
  }
}

document.addEventListener('keydown', (event) => {
	game.player.onKeyEvent(event);
});


document.addEventListener('keyup', () => {
	game.player.onKeyEvent(event)
})

