const PAIRS = [
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
  },
  ALERT: {
    CONT: "__mem_alert-cont",
    HEAD: "__mem_alert-head",
    COLORS: {
      ERROR:   "__mem_alert-error",
      WARNING: "__mem_alert-warning",
      SUCCESS: "__mem_alert-success"
    },
    ANIMATIONS: {
      ENTER: "__mem_alert_anim-enter",
      EXIT:  "__mem_alert_anim-exit"
    }
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
  },
  ALERT_CONTAINER: "mem_alert_cont"
};

const WIN_ANIM_TIMEOUT = 750; // ms
const TIME_UPDATE_SPEED = 500; // ms

enum AlertType {
  ERROR = "ERROR",
  WARNING = "WARNING",
  SUCCESS = "SUCCESS"
}

const ALERT_EVENT = "mem-alert";
const ALERT_TIMEOUT = 1500; // ms
const ALERT_REMOVE = 400; // ms