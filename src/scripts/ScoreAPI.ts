const ScoreAPI = {
  getScore: () => {
    fetch("/API/score").then(r => r.json()).then(console.log);
  },
  postScore: () => {
    fetch("/API/score", {
      method: "POST",
      body: JSON.stringify({name: "test", score: 0, size: 1}),
      headers: {"content-type": "application/json"}
    }).catch(e => {throw e});
  }
};