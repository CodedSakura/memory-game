Array.prototype.shuffle = function() {
  let i = this.length;
  if (i === 0) return this;
  while ( --i ) {
    let j = Math.floor(Math.random() * (i + 1));
    [this[i], this[j]] = [this[j], this[i]];
  }
  return this;
};

function findInPairs(item) {
  let out;
  for (let i = 0; i < pairs.length; i++) {
    if (pairs[i].includes(item)) {
      if (out !== undefined)
        throw new Error("appears multiple times in pairs");
      out = i;
    }
  }
  return out;
}