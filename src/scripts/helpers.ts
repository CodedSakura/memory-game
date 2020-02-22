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

function findInPairs(item) {
  let out;
  for (let i = 0; i < pairs.length; i++) {
    if (pairs[i].indexOf(item) > -1) {
      if (out !== undefined)
        throw new Error("appears multiple times in pairs");
      out = i;
    }
  }
  return out;
}