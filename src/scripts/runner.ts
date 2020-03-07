window.addEventListener("load", () => {
  const container = document.getElementById(ID_NAMES.MAIN);
  const stats = {
    time: {
      start: 0,
      end: 0
    },
    moves: 0,
    running: false,
    elems: {
      time: document.getElementById(ID_NAMES.STATS.TIME),
      moves: document.getElementById(ID_NAMES.STATS.MOVES)
    }
  };
  let game: MemoryGame;
  let tiles: HTMLDivElement[];

  function click({target}) {
    target = target.parentElement;
    if (stats.running) return;
    const index = tiles.indexOf(target);
    if (index < 0) return;
    target.classList.remove(...Object.values(CLASS_NAMES.ANIMATIONS));
    target.getBoundingClientRect(); // force DOM update

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
        stats.running = true;
        setTimeout(() => {
          stats.running = false;
          target.classList.remove(CLASS_NAMES.SHOWN);
          last.classList.remove(CLASS_NAMES.SHOWN);
          target.getElementsByClassName(CLASS_NAMES.FRONT)[0].innerText = "";
          (last.getElementsByClassName(CLASS_NAMES.FRONT)[0] as HTMLDivElement).innerText = "";
          target.classList.add(CLASS_NAMES.HIDDEN);
          last.classList.add(CLASS_NAMES.HIDDEN);
        }, WIN_ANIM_TIMEOUT);
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
    stats.running = false;
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
    stats.elems.time.innerText = msToString(
      stats.time.end ? stats.time.end-stats.time.start :
        stats.time.start ? Date.now() - stats.time.start : 0);
  }
  function incrMoves() {
    stats.elems.moves.innerText = `${++stats.moves}`;
  }
  function resetMoves() {
    stats.moves = 0;
    stats.elems.moves.innerText = `${stats.moves}`;
  }

  generateField(getDefaultSize());
  setInterval(updateTime, TIME_UPDATE_SPEED);

  document.getElementById(ID_NAMES.SIZE.GENERATE).addEventListener("click", () => {
    let widthE = document.getElementById(ID_NAMES.SIZE.WIDTH) as HTMLInputElement;
    let heightE = document.getElementById(ID_NAMES.SIZE.HEIGHT) as HTMLInputElement;
    let wv = parseInt(widthE.value), hv = parseInt(heightE.value);
    generateField({x: wv, y: hv});
  });
});

document.addEventListener(ALERT_EVENT, ({detail: {type, message, head}}: AlertEvent) => {
  console.log("yeet?");
  const alertCont = document.getElementById(ID_NAMES.ALERT_CONTAINER);
  const alert = document.createElement("div");
  alert.classList.add(CLASS_NAMES.ALERT.COLORS[type]);
  alert.classList.add(CLASS_NAMES.ALERT.ANIMATIONS.ENTER);
  if (head) {
    const aHead = document.createElement("div");
    aHead.classList.add(CLASS_NAMES.ALERT.HEAD);
    aHead.appendChild(document.createTextNode(head));
  }
  alert.appendChild(document.createTextNode(message));
  alertCont.prepend(alert);
  setTimeout(() => {
    alert.classList.add(CLASS_NAMES.ALERT.ANIMATIONS.EXIT);
    setTimeout(() => {
      alertCont.removeChild(alert);
    }, ALERT_REMOVE);
  }, ALERT_TIMEOUT);
});