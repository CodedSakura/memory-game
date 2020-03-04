const pairs = [
  ["1", "1"],
  ["2", "2"],
  ["3", "3"],
  ["4", "4"],
  ["5", "5"],
  ["6", "6"],
  ["7", "7"],
  ["8", "8"],
  ["9", "9"],
  ["0", "0"],
  ["a", "a"],
  ["b", "b"],
  ["c", "c"],
  ["d", "d"],
  ["e", "e"],
  ["f", "f"],
  ["g", "g"],
  ["h", "h"],
  ["i", "i"],
  ["j", "j"],
  ["k", "k"],
  ["l", "l"],
  ["m", "m"],
  ["n", "n"],
  ["o", "o"],
  ["p", "p"],
  ["r", "r"],
  ["s", "s"],
  ["t", "t"],
  ["u", "u"],
  ["v", "v"],
];

const getDefaultSize = () => ({x: 4, y: 6});

const CLASS_NAMES = {
  ROW: "__mem_row",
  TILE: "__mem_tile",
  HIDDEN: "__mem_hidden",
  SHOWN: "__mem_shown",
  FRONT: "__mem_tile-front",
  BACK: "__mem_tile-back",
  ANIMATIONS: {
    CANCEL: "__mem_anim_cancel",
    UNMATCH: "__mem_anim_unmatch",
    MATCH: "__mem_anim_match"
  }
};

const ID_NAMES = {
  MAIN: "mem_game",
  SIZE: {
    WIDTH: "mem_width",
    HEIGHT: "mem_height",
    GENERATE: "mem_generate"
  },
  STATS: {
    TIME: "mem_time",
    MOVES: "mem_moves"
  }
};

const WinAnimTimeout = 750; // ms
const TimeUpdateSpeed = 500; // ms