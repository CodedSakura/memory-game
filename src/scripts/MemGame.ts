class MemoryGame {
  selected = -1;
  revealed = [];
  entries = [];
  size = {};

  static RESULT_STATE = {
    CANCEL: 0,
    CONTINUE: 1,
    FAIL: 2,
    MATCH: 3,
  };

  constructor(size) {
    if (!size.hasOwnProperty("x") || !size.hasOwnProperty("y")) throw new Error("size must be an object with properties x and y");
    if (typeof size.x !== "number" || typeof size.y !== "number") throw new Error("properties x and y mst be numbers");
    if (size.x <= 0 || size.y <= 0) throw  new Error("x and y have to be positive");
    if ((size.x * size.y) % 2 === 1) throw new Error("x * y must be even");
    this.size = size;
    this.entries = pairs.shuffle().slice(0, size.x*size.y/2).flat().shuffle();
    this.revealed = new Array(this.entries.length).fill(false);
  }

  select(index) {
    if (index > this.entries.length) throw new Error("index should not be larger than x * y");
    if (this.revealed[index]) return MemoryGame.RESULT_STATE.CANCEL;
    if (this.selected > -1) return this._match(index);
    this.revealed[index] = true;
    this.selected = index;
    return MemoryGame.RESULT_STATE.CONTINUE;
  }

  _match(index) {
    if (this.selected === index) return MemoryGame.RESULT_STATE.CANCEL;
    const a = findInPairs(this.entries[this.selected]);
    const b = findInPairs(this.entries[index]);
    if (a === b) {
      this.revealed[index] = true;
      this.selected = -1;
      return MemoryGame.RESULT_STATE.MATCH;
    } else {
      this.revealed[this.selected] = false;
      this.selected = -1;
      return MemoryGame.RESULT_STATE.FAIL;
    }
  }
}