window.addEventListener("load", () => {
  const size = {x: 4, y: 6};
  const game = new MemoryGame(size);
  const container = document.getElementById("game");
  const tiles = [];
  let running = false;

  function click({target}) {
    target = target.parentElement;
    if (running) return;
    const index = tiles.indexOf(target);
    if (index < 0) return;
    target.classList.remove(...Object.values(CLASS_NAMES.ANIMATIONS));
    target.getBoundingClientRect(); // update DOM

    const last = tiles[game.selected];
    switch (game.select(index)) {
      case MemoryGame.RESULT_STATE.CANCEL:
        target.classList.add(CLASS_NAMES.ANIMATIONS.CANCEL);
        break;
      case MemoryGame.RESULT_STATE.CONTINUE:
        target.classList.remove(CLASS_NAMES.HIDDEN);
        target.getElementsByClassName(CLASS_NAMES.FRONT)[0].innerText = game.entries[index];
        target.classList.add(CLASS_NAMES.SHOWN);
        break;
      case MemoryGame.RESULT_STATE.FAIL:
        target.classList.remove(CLASS_NAMES.HIDDEN);
        target.getElementsByClassName(CLASS_NAMES.FRONT)[0].innerText = game.entries[index];
        target.classList.add(CLASS_NAMES.SHOWN);
        running = true;
        setTimeout(() => {
          running = false;
          target.classList.remove(CLASS_NAMES.SHOWN);
          last.classList.remove(CLASS_NAMES.SHOWN);
          target.getElementsByClassName(CLASS_NAMES.FRONT)[0].innerText = "";
          last.getElementsByClassName(CLASS_NAMES.FRONT)[0].innerText = "";
          target.classList.add(CLASS_NAMES.HIDDEN);
          last.classList.add(CLASS_NAMES.HIDDEN);
        }, WinAnimTimeout);
        break;
      case MemoryGame.RESULT_STATE.MATCH:
        target.classList.remove(CLASS_NAMES.HIDDEN);
        target.getElementsByClassName(CLASS_NAMES.FRONT)[0].innerText = game.entries[index];
        target.classList.add(CLASS_NAMES.SHOWN);
        if (game.won) {
          // pass
        }
        break;
      default:
        throw new Error("unknown return state from game.select")
    }
  }

  for (let y = 0; y < size.y; y++) {
    const row = document.createElement("div");
    row.className = CLASS_NAMES.ROW;
    for (let x = 0; x < size.x; x++) {
      const tile = document.createElement("div");
      tile.className = [CLASS_NAMES.TILE, CLASS_NAMES.HIDDEN].join(" ");
      tile.addEventListener("click", click);
      const front = document.createElement("div");
      front.className = CLASS_NAMES.FRONT;
      const back = document.createElement("div");
      back.className = CLASS_NAMES.BACK;
      tile.appendChild(front);
      tile.appendChild(back);
      row.appendChild(tile);
      tiles.push(tile);
    }
    container.appendChild(row);
  }
});