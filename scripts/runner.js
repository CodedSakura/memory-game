window.addEventListener("load", () => {
  const size = {x: 4, y: 6};
  const game = new MemoryGame(size);
  const container = document.getElementById("game");
  const tiles = [];

  function click({target}) {
    const index = tiles.indexOf(target);
    // if (game.select(index)) {
    //   while (target.hasChildNodes()) target.removeChild(target.lastChild);
    //   target.appendChild(document.createTextNode(game.revealed[index] ? game.entries[index] : "[?]"))
    // }
  }

  for (let y = 0; y < size.y; y++) {
    const row = document.createElement("div");
    row.className = "__row";
    for (let x = 0; x < size.x; x++) {
      const child = document.createElement("div");
      // child.appendChild(document.createTextNode(game.entries[size.x*y+x]));
      child.appendChild(document.createTextNode("[?]"));
      child.className = "__tile hidden";
      child.addEventListener("click", click);
      tiles.push(child);
      row.appendChild(child);
    }
    container.appendChild(row);
  }
});