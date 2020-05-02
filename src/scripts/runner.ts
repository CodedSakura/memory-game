window.addEventListener("load", () => {
  const ScoreAPI = {
    getScore: async (size): Promise<Score[]> => await fetch(`/API/score/${size}`).then(r => r.json()),
    postScore: (name, score, time, size, cb) => {
      fetch(`/API/score/${size}`, {
        method: "POST",
        body: JSON.stringify({name: name, score: score, time: time}),
        headers: {"content-type": "application/json"}
      }).catch(e => {throw e}).then(() => cb && cb());
    }
  };

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
        target.getElementsByClassName(CLASS_NAMES.FRONT)[0].appendChild(game.entries[index].getSVG());
        target.classList.add(CLASS_NAMES.SHOWN);
        break;
      case MemoryGame.RESULT_STATE.FAIL:
        incrMoves();
        target.classList.remove(CLASS_NAMES.HIDDEN);
        target.getElementsByClassName(CLASS_NAMES.FRONT)[0].appendChild(game.entries[index].getSVG());
        target.classList.add(CLASS_NAMES.SHOWN);
        target.classList.add(CLASS_NAMES.ANIMATIONS.UNMATCH);
        last.classList.add(CLASS_NAMES.ANIMATIONS.UNMATCH);
        stats.running = true;
        setTimeout(() => {
          stats.running = false;
          target.classList.remove(CLASS_NAMES.SHOWN);
          last.classList.remove(CLASS_NAMES.SHOWN);
          target.getElementsByClassName(CLASS_NAMES.FRONT)[0].clearChildren();
          (last.getElementsByClassName(CLASS_NAMES.FRONT)[0] as Element).clearChildren();
          target.classList.add(CLASS_NAMES.HIDDEN);
          last.classList.add(CLASS_NAMES.HIDDEN);
        }, FAIL_ANIM_TIMEOUT);
        break;
      case MemoryGame.RESULT_STATE.MATCH:
        incrMoves();
        target.classList.remove(CLASS_NAMES.HIDDEN);
        target.getElementsByClassName(CLASS_NAMES.FRONT)[0].appendChild(game.entries[index].getSVG());
        target.classList.add(CLASS_NAMES.SHOWN);
        target.classList.add(CLASS_NAMES.ANIMATIONS.MATCH);
        last.classList.add(CLASS_NAMES.ANIMATIONS.MATCH);
        if (game.won) {
          stats.time.end = Date.now();
          setTimeout(() => {
            document.getElementById(ID_NAMES.WIN_BANNER).classList.remove(CLASS_NAMES.WIN_BANNER_HIDDEN);
            setTimeout(() => {
              const name = prompt("Your name:");
              if (name) ScoreAPI.postScore(name, stats.moves, stats.time.end - stats.time.start, game.entries.length, updateScoreboard);
            });
          }, WIN_BANNER_TIMEOUT);
        }
        break;
      default:
        throw new Error("unknown return state from game.select")
    }
  }

  function generateField(size: {width: number, height: number}) {
    game = new MemoryGame(size);
    tiles = [];
    stats.running = false;
    stats.time = {start: 0, end: 0};
    resetMoves();
    container.clearChildren();
    const {innerWidth, innerHeight} = window;
    if (size.width/size.height > innerWidth/innerHeight) container.parentElement.classList.add(CLASS_NAMES.VERTICAL_LAYOUT);
    else container.parentElement.classList.remove(CLASS_NAMES.VERTICAL_LAYOUT);
    document.getElementById(ID_NAMES.WIN_BANNER).classList.add(CLASS_NAMES.WIN_BANNER_HIDDEN);
    const tileSize = Math.min((innerWidth-22)/size.width-6, (innerHeight-22)/size.height-6) << 0;
    for (let y = 0; y < size.height; y++) {
      const row = document.createElement("div");
      row.className = CLASS_NAMES.ROW;
      for (let x = 0; x < size.width; x++) {
        const tile = document.createElement("div");
        tile.className = [CLASS_NAMES.TILE, CLASS_NAMES.HIDDEN].join(" ");
        tile.style.width  = `${tileSize}px`;
        tile.style.height = `${tileSize}px`;
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
    document.getElementById(ID_NAMES.STATS.SIZE).innerText = `${game.entries.length}`;
    updateScoreboard().then(_ => {});
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

  async function updateScoreboard(alert?: boolean) {
    const scores = await ScoreAPI.getScore(game.entries.length);
    document.getElementById(ID_NAMES.STATS.HIGHSCORE.SIZE).innerText = `${game.entries.length}`;
    console.log(scores);
    const hsE = document.getElementById(ID_NAMES.STATS.HIGHSCORE.CONT) as HTMLDivElement;
    hsE.clearChildren();
    for (const s of scores) {
      const {score, name, time} = s;
      const divE = document.createElement("div");
      divE.appendChild(document.createTextNode(`${name}: ${score} (${msToString(time)})`));
      hsE.appendChild(divE);
    }
    if (alert) document.dispatchEvent(new CustomEvent(ALERT_EVENT, {detail: {type: AlertType.SUCCESS, message: "Scoreboard refreshed"}}));
  }

  generateField(getDefaultSize());
  setInterval(updateTime, TIME_UPDATE_SPEED);

  document.getElementById(ID_NAMES.SIZE.GENERATE).addEventListener("click", () => {
    let widthE = document.getElementById(ID_NAMES.SIZE.WIDTH) as HTMLInputElement;
    let heightE = document.getElementById(ID_NAMES.SIZE.HEIGHT) as HTMLInputElement;
    let wv = parseInt(widthE.value), hv = parseInt(heightE.value);
    try {
      generateField({width: wv, height: hv});
    } catch (e) {
      document.dispatchEvent(new CustomEvent(ALERT_EVENT, {detail: {type: AlertType.ERROR, message: e.message}}));
    }
  });

  document.getElementById(ID_NAMES.STATS.HIGHSCORE.REFRESH).addEventListener("click", () => updateScoreboard(true));
});

document.addEventListener(ALERT_EVENT, ({detail: {type, message, head}}: AlertEvent) => {
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