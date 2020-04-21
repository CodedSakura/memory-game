const ScoreAPI = {
  getScore: () => {},
  postScore: () => {
    fetch("/API/score", {method: "POST", body: '{name: "test", score: 0, size: 1}'}).catch(e => {throw e});
  }
};