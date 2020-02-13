class MemoryGame {
  selected = -1;
  revealed = [];
  entries = [];
  size = {};

  constructor(size) {
    if (!size.hasOwnProperty("x") || !size.hasOwnProperty("y")) throw new Error("size must be an object with properties x and y");
    if (typeof size.x !== "number" || typeof size.y !== "number") throw new Error("properties x and y mst be numbers");
    if (size.x <= 0 || size.y <= 0) throw  new Error("x and y have to be positive");
    if (!Number.isInteger(size.x) || !Number.isInteger(size.y)) throw new Error("x and y have to be integers");
    if ((size.x * size.y) % 2 === 1) throw new Error("x * y must be even");
    this.size = size;
    this.entries = pairs.shuffle().slice(0, size.x*size.y/2).flat().shuffle();
    this.revealed = new Array(this.entries.length).fill(false);
  }

  select(index) {
    if (this.selected > -1) return this.match(index);
    if (index > this.entries.length) return false;
    if (this.revealed[index]) return false;
    this.revealed[index] = true;
    this.selected = index;
    return true;
  }

  match(index) {
    if (this.selected === index) return MemoryGame.MATCH_STATE.CANCEL;
    if (this.revealed[index]) return MemoryGame.MATCH_STATE.CANCEL;
    const a = findInPairs(this.selected);
    const b = findInPairs(index);
    if (a === b) {
      this.revealed[this.selected] = false;
      this.selected = -1;
      return true;
    } else {
      this.revealed[index] = true;
      this.selected = -1;
      return false;
    }
  }
}

MemoryGame.MATCH_STATE = {
  CANCEL: 0,
  NO_MATCH: 1,
  MATCH: 2
};