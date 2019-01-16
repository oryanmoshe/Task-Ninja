
class ScoresController {
  constructor() {
    this.scores = [];
    this.database = firebase.database();
  }
  listenToScores() {
    const that = this;
    const scoresRef = this.database.ref('scores/');
    scoresRef.on('value', function(snapshot) {
      that.saveScores(snapshot.val());
    });
  };

  getScores(callback) {
    const that = this;
    const scoresRef = this.database.ref('scores/');
    scoresRef.once('value').then(function(snapshot) {
      that.saveScores(snapshot.val() || []);
    });
  };

  saveScores(scores){
    this.scores = scores;
  };

  insertScore(username, score) {
    const date = (new Date()).getTime();
    const key = `${username}_${date}`
    const scoreRef = this.database.ref('scores/' + key);
    scoreRef.set({
      username,
      score,
      date
    }, error => {
      if (error){
        console.error("Error", error);
      } else {
        console.log("Save success", username, date, score);
      }
    });
  };
}

const scoresController = new ScoresController();
