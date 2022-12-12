
const game = new Game("canvas-test");

window.onload = function() {

  document.getElementById('start-btn').onclick = () => {
      document.getElementById("center-container").hidden = true;
      document.getElementById('buttons-container').classList.remove('hidden');
      //document.getElementById('buttons-playagain').classList.remove('hidden');
  }

  document.getElementById('color-btn').onclick = () => {
    document.getElementById("buttons-container").classList.add('hidden');
    game.type = 'color';
    game.start();
  }

  document.getElementById('text-btn').onclick = () => {
    document.getElementById("buttons-container").classList.add('hidden');
    game.type = 'text';
    game.start();
  }
  
  document.querySelector(".buttons-playagain button").onclick = () => {
    //console.log ("entro scrip");
    document.location.reload();
  }
}

document.addEventListener('keydown', (event) => {
	game.player.onKeyEvent(event);
});


document.addEventListener('keyup', () => {
	game.player.onKeyEvent(event)
})

