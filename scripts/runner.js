window.addEventListener("load", () => {
  const size = {x: 4, y: 6};
  const game = new MemoryGame(size);
  const container = document.getElementById("game");
  const tiles = [];
  let running = false;

  function click({target}) {
    if (running) return;
    const index = tiles.indexOf(target);
    // if (!index) return;
    target.classList.remove("__anim-cancel", "__anim-");
    target.getBoundingClientRect();

    const last = tiles[game.selected];
    switch (game.select(index)) {
      case MemoryGame.RESULT_STATE.CANCEL:
        target.classList.add("__anim-cancel");
        break;
      case MemoryGame.RESULT_STATE.CONTINUE:
        target.classList.remove("hidden");
        target.innerText = game.entries[index];
        target.classList.add("shown");
        break;
      case MemoryGame.RESULT_STATE.FAIL:
        target.classList.remove("hidden");
        target.innerText = game.entries[index];
        target.classList.add("shown");
        running = true;
        console.log(setTimeout(() => {
          running = false;
          target.classList.remove("shown");
          last.classList.remove("shown");
          target.innerText = "[?]";
          last.innerText = "[?]";
          target.classList.add("hidden");
          last.classList.add("hidden")
        }, 1000));
        break;
      case MemoryGame.RESULT_STATE.MATCH:
        target.classList.remove("hidden");
        target.innerText = game.entries[index];
        target.classList.add("shown");
        break;
      default:
        throw new Error("unknown return state from game.select")
    }
  }

  for (let y = 0; y < size.y; y++) {
    const row = document.createElement("div");
    row.className = "__row";
    for (let x = 0; x < size.x; x++) {
      const child = document.createElement("div");
      child.appendChild(document.createTextNode("[?]"));
      child.className = "__tile hidden";
      child.addEventListener("click", click);
      tiles.push(child);
      row.appendChild(child);
    }
    container.appendChild(row);
  }
});