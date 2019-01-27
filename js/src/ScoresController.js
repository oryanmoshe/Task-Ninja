class ScoresController {
  constructor() {
    this.scores = [];
    this.database = firebase.database();
  }
  listenToScores() {
    const that = this;
    const scoresRef = this.database.ref("scores/");
    scoresRef.on("value", function(snapshot) {
      that.saveScores(snapshot.val());
    });
  }

  filterObject(raw, allowed){
    return allowed.map(function(v) { return raw[v]; });
  }

  topScores(){
    debugger;
    const that = this;
    let topKeys = Object.keys(that.scores).sort(function(a, b) {
        return that.scores[a].score < that.scores[b].score ? 1 : -1; })
                .slice(0, 5);
    const topScores = this.filterObject(that.scores, topKeys)
    if(gameState == GAME_READY){
      enterScores(topScores)
    }
    return topScores
  }

  getScores() {
    const that = this;
    const scoresRef = this.database.ref("scores/");
    scoresRef.once("value").then(function(snapshot) {
      that.saveScores(snapshot.val() || []);
      that.topScores()
    });
  }

  saveScores(scores) {
    this.scores = scores;
  }

  insertScore(username, score) {
    const date = new Date().getTime();
    const key = `${username}_${date}`;
    const scoreRef = this.database.ref("scores/" + key);
    scoreRef.set(
      {
        username,
        score,
        date
      },
      error => {
        if (error) {
          console.error("Error", error);
        } else {
          console.log("Save success", username, date, score);
        }
      }
    );
  }
}

const scoresController = new ScoresController();
scoresController.getScores()
