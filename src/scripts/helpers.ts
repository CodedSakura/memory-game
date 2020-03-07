Array.prototype.shuffle = function() {
  let i = this.length;
  if (i === 0) return this;
  while ( --i ) {
    let j = Math.floor(Math.random() * (i + 1));
    [this[i], this[j]] = [this[j], this[i]];
  }
  return this;
};
Array.prototype.flat = function () {
  return [].concat(...this);
};

Object.values = function (obj) {
  return Object.keys(obj).map(k => obj[k]);
};

if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
    targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
    padString = String(typeof padString !== 'undefined' ? padString : ' ');
    if (this.length > targetLength) {
      return String(this);
    } else {
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
      }
      return padString.slice(0, targetLength) + String(this);
    }
  };
}

function findInPairs(item) {
  let out;
  for (let i = 0; i < PAIRS.length; i++) {
    if (PAIRS[i].indexOf(item) > -1) {
      if (out !== undefined)
        throw new Error("appears multiple times in pairs");
      out = i;
    }
  }
  return out;
}

function msToString(ms: number) {
  let s = ms / 1000;
  let m = s / 60;
  let h = m / 60;
  [m, s] = [m % 60, s % 60];
  if (h < 1) return `${m.toFixed(0)}:${s.toFixed(0).padStart(2, "0")}`;
  return `${h.toFixed(0)}:${m.toFixed(0).padStart(2, "0")}:${s.toFixed(0).padStart(2, "0")}`
}