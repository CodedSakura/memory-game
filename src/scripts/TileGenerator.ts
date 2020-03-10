interface Tile {
  inverted: boolean
  difference(that: Tile): number
  matches(that: Tile): boolean
  getSVG(): SVGSVGElement
  generateInverted(): Tile
}

class TileC0 implements Tile {
  inverted: boolean;
  data: number[];
  size: number;

  constructor(size: number|number[], inverted: boolean = false) {
    this.inverted = inverted;
    if (Array.isArray(size)) {
      this.data = size;
      this.size = size.length;
    } else {
      this.data = [];
      this.size = size;
      for (let i = 0; i < size; i++) {
        this.data.push(Math.floor(Math.random() * (size+1)));
      }
    }
  }

  difference(that: TileC0): number {
    return 0;
  }

  matches(that: Tile): boolean {
    return false;
  }

  getSVG(): SVGSVGElement {
    const out = document.createElementNS(SVG_NS, "svg");
    out.setAttribute("viewBox", `0 0 ${this.size} ${this.size}`);
    const path = document.createElementNS(SVG_NS, "path");
    let d = "";
    if (!this.inverted) {
      d = `M0 0${this.data.map(v => `H${v}v1`).join("")}H0z`;
    } else {
      d += `M${this.size} 0${this.data.map(v => `H${v}v1`).join("")}H${this.size}z`;
    }
    path.setAttribute("d", d);
    out.appendChild(path);
    return out;
  }

  generateInverted(): TileC0 {
    return new TileC0(this.data.slice(), !this.inverted);
  }
}

class TileGenerator {
  tiles: Tile[] = [];
  props: {size: number, complexity: number, rotation: boolean, flipping: boolean};


  constructor(amount: number, size: number, complexity: number, modifiers: {rotate: boolean, flip: boolean}) {
    if (typeof amount !== "number") throw new Error("Amount is not a number");
    if (!Number.isInteger(amount)) throw new Error("Amount must be an integer");
    if (amount < 0) throw new Error("Amount must be positive");
    if (amount % 2 == 1) throw new Error("Amount must be even");
    if (typeof size !== "number") throw new Error("Size must be a number");
    if (!Number.isInteger(size)) throw new Error("Size must be an integer");
    if (size < 1) throw new Error("Size must be > 0");
    if (typeof complexity !== "number") throw new Error("Complexity must be a number");
    if (!Number.isInteger(complexity)) throw new Error("Complexity must be an integer");
    if (complexity < 0 || complexity > 0) throw new Error("Complexity must be between 0 and 0");
    if (typeof modifiers !== "object" || (!modifiers.hasOwnProperty("rotate") || !modifiers.hasOwnProperty("flip")))
      throw new Error("Modifiers must be an object with properties 'rotate' and 'flip'");
    if (typeof modifiers.rotate !== "boolean") throw new Error("modifiers.rotate must be a boolean");
    if (typeof modifiers.flip !== "boolean") throw new Error("modifiers.flip must be a boolean");
    this.props = {
      size: size,
      complexity: complexity,
      rotation: modifiers.rotate,
      flipping: modifiers.flip
    };
    for (let i = 0; i < size / 2; i++)
      this.tiles = this.tiles.concat(this.generateUniqueTilePair());
  }

  private generateUniqueTilePair() {
    const {complexity, size} = this.props;
    switch (complexity) {
      case 0:
        let tileA, tileB;
        console.log("[1]");
        do {
          tileA = new TileC0(size);
          tileB = tileA.generateInverted();
        } while (!this.isUnique(tileA, tileB));
        console.log(tileA);
        return [tileA, tileB];
      default:
        throw new Error("unknown complexity level");
    }
  }

  private isUnique(...tiles: Tile[]): boolean {
    return this.tiles.every((tileA: Tile) => tiles.every((tileB: Tile) => !tileB.matches(tileA)));
  }
}