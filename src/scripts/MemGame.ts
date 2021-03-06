class MemoryGame {
  selected = -1;
  revealed = [];
  entries: Tile[] = [];
  size = {width: 0, height: 0};
  won = false;

  static RESULT_STATE = {
    CANCEL: 0,
    CONTINUE: 1,
    FAIL: 2,
    MATCH: 3,
  };

  constructor(size) {
    if (!size.hasOwnProperty("width") || !size.hasOwnProperty("height")) throw new Error("Size must be an object with properties 'width' and 'height'");
    if (typeof size.width !== "number" || typeof size.height !== "number") throw new Error("Properties 'width' and 'height' must be numbers!");
    if (!Number.isInteger(size.width) || !Number.isInteger(size.height)) throw new Error("Width and height must be integers!");
    if (size.width <= 0 || size.height <= 0) throw  new Error("Width and height must be positive!");
    if ((size.width * size.height) % 2 === 1) throw new Error("Width and height can't both be odd!");
    this.size = size;
    this.entries = new TileGenerator(size.width*size.height, 6, 0, {flip: false, rotate: false}).tiles.shuffle();
    this.revealed = new Array(this.entries.length).fill(false);
  }

  select(index) {
    if (index > this.size.width * this.size.height) throw new Error("index should not be larger than x * y");
    if (this.revealed[index]) return MemoryGame.RESULT_STATE.CANCEL;
    if (this.selected > -1) return this._match(index);
    this.revealed[index] = true;
    this.selected = index;
    return MemoryGame.RESULT_STATE.CONTINUE;
  }

  _match(index) {
    if (this.selected === index) return MemoryGame.RESULT_STATE.CANCEL;
    if (this.entries[this.selected].matches(this.entries[index])) {
      this.revealed[index] = true;
      this.selected = -1;
      if (this.revealed.every(v => v)) {
        this.won = true;
      }
      return MemoryGame.RESULT_STATE.MATCH;
    } else {
      this.revealed[this.selected] = false;
      this.selected = -1;
      return MemoryGame.RESULT_STATE.FAIL;
    }
  }
}