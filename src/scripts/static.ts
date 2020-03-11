const getDefaultSize = () => ({width: 4, height: 6});

const SVG_NS = "http://www.w3.org/2000/svg";

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
  },
  VERTICAL_LAYOUT: "__mem_vertical-layout"
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

const FAIL_ANIM_TIMEOUT = 1250; // ms
const TIME_UPDATE_SPEED = 500; // ms

enum AlertType {
  ERROR = "ERROR",
  WARNING = "WARNING",
  SUCCESS = "SUCCESS"
}

const ALERT_EVENT = "mem-alert";
const ALERT_TIMEOUT = 3000; // ms
const ALERT_REMOVE = 400; // ms