window.addEventListener("load", () => {
  const container = document.getElementById(ID_NAMES.MAIN);
  const statsElems = {
    time: document.getElementById(ID_NAMES.STATS.TIME),
    moves: document.getElementById(ID_NAMES.STATS.MOVES)
  };
  const stats = {
    time: {
      start: 0,
      end: 0
    },
    moves: 0
  };
  let game: MemoryGame;
  let tiles: HTMLDivElement[];
  let running: boolean;

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
        if (!stats.time.start) stats.time.start = Date.now();
        incrMoves();
        target.classList.remove(CLASS_NAMES.HIDDEN);
        target.getElementsByClassName(CLASS_NAMES.FRONT)[0].innerText = game.entries[index];
        target.classList.add(CLASS_NAMES.SHOWN);
        break;
      case MemoryGame.RESULT_STATE.FAIL:
        incrMoves();
        target.classList.remove(CLASS_NAMES.HIDDEN);
        target.getElementsByClassName(CLASS_NAMES.FRONT)[0].innerText = game.entries[index];
        target.classList.add(CLASS_NAMES.SHOWN);
        target.classList.add(CLASS_NAMES.ANIMATIONS.UNMATCH);
        last.classList.add(CLASS_NAMES.ANIMATIONS.UNMATCH);
        running = true;
        setTimeout(() => {
          running = false;
          target.classList.remove(CLASS_NAMES.SHOWN);
          last.classList.remove(CLASS_NAMES.SHOWN);
          target.getElementsByClassName(CLASS_NAMES.FRONT)[0].innerText = "";
          (last.getElementsByClassName(CLASS_NAMES.FRONT)[0] as HTMLDivElement).innerText = "";
          target.classList.add(CLASS_NAMES.HIDDEN);
          last.classList.add(CLASS_NAMES.HIDDEN);
        }, WinAnimTimeout);
        break;
      case MemoryGame.RESULT_STATE.MATCH:
        incrMoves();
        target.classList.remove(CLASS_NAMES.HIDDEN);
        target.getElementsByClassName(CLASS_NAMES.FRONT)[0].innerText = game.entries[index];
        target.classList.add(CLASS_NAMES.SHOWN);
        target.classList.add(CLASS_NAMES.ANIMATIONS.MATCH);
        last.classList.add(CLASS_NAMES.ANIMATIONS.MATCH);
        if (game.won) {
          stats.time.end = Date.now();
        }
        break;
      default:
        throw new Error("unknown return state from game.select")
    }
  }

  function generateField(size: {x: number, y: number}) {
    game = new MemoryGame(size);
    tiles = [];
    running = false;
    stats.time = {start: 0, end: 0};
    resetMoves();
    while (container.lastChild) container.removeChild(container.lastChild);
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
  }

  function updateTime() {
    statsElems.time.innerText = msToString(
      stats.time.end ? stats.time.end-stats.time.start :
        stats.time.start ? Date.now() - stats.time.start : 0);
  }
  function incrMoves() {
    statsElems.moves.innerText = `${++stats.moves}`;
  }
  function resetMoves() {
    stats.moves = 0;
    statsElems.moves.innerText = `${stats.moves}`;
  }

  generateField(getDefaultSize());
  setInterval(updateTime, TimeUpdateSpeed)
});