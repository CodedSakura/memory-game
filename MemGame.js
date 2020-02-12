class MemoryGame {
  constructor(size) {
    if (!size.hasOwnProperty("x") || !size.hasOwnProperty("y")) throw new Error("size must be an object with properties x and y");
    if (typeof size.x !== "number" || typeof size.y !== "number") throw new Error("properties x and y mst be numbers");
    if ((size.x * size.y) % 2 === 1) throw new Error("x * y must be even");
    this.size = size;
    this.entries = pairs.slice(0, size.x*size.y/2);
  }
}