class ScoresController {
  constructor() {
    this.scores = [];
    this.database = firebase.database();
    this.firestore = firebase.firestore();
    this.firestore.settings({ timestampsInSnapshots: true });
  }
  listenToScores() {
    const that = this;
    // const scoresRef = this.database.ref("scores/");
    // scoresRef.on("value", function(snapshot) {
    //   that.saveScores(snapshot.val());
    // });
    if (this.firestoreUnsub){
      this.firestoreUnsub();
      this.firestoreUnsub = null;
    }
    this.firestoreUnsub = this.firestore.collection("scores")
    .orderBy('score', 'desc')
    .orderBy('date', 'asc')
    .limit(10)
    .onSnapshot(function(snapshot) {
        that.saveScores(
          snapshot.docs.map(obj => (obj.data()))
        );
    });
  }

  listenToTopScores(startDate=null, endDate=null, scoresLimit=10){
    const that = this;
    const to = endDate;
    let from;
    if (!startDate){
      from = new Date();
      from.setDate(from.getDate() - 7)
    } else {
      from = startDate
    }
    if (this.firestoreUnsub){
      this.firestoreUnsub();
      this.firestoreUnsub = null;
    }
    this.firestoreUnsub = this.firestore.collection("scores")
    .where("date", ">=", from)
    .where("date", to ? "<=" : '>=', to || from)
    .onSnapshot(function(snapshot) {
      that.saveScores(
        snapshot.docs.map(obj => (obj.data())).sort((a,b) => a.score > b.score ? -1 : 1).slice(0, scoresLimit)
      );
    });
  }

  filterObject(raw, allowed){
    return allowed.map(function(v) { return raw[v]; });
  }

  topScores(){
    debugger;
    // const that = this;
    // let topKeys = Object.keys(that.scores).sort(function(a, b) {
    //     return that.scores[a].score < that.scores[b].score ? 1 : -1; })
    //             .slice(0, 5);
    // const topScores = this.filterObject(that.scores, topKeys)
    if(gameState == GAME_READY){
      enterScores(this.scores.slice(0,5))
    }
    return this.scores.slice(0,5)
  }

  getTopScores(startDate=null, endDate=null, scoresLimit=10) {
    const that = this;
    const to = endDate;
    let from;
    if (!startDate){
      from = new Date();
      from.setDate(from.getDate() - 7)
    } else {
      from = startDate
    }
    this.firestore.collection("scores")
    .where("date", ">=", from)
    .where("date", to ? "<=" : '>=', to || from)
    .get().then(function(snapshot) {
      that.saveScores(
        snapshot.docs.map(obj => (obj.data())).sort((a,b) => a.score > b.score ? -1 : 1).slice(0, scoresLimit)
      );
      that.topScores();
    });
  }

  getScores() {
    const that = this;
    this.firestore.collection("scores")
    .orderBy('score', 'desc')
    .orderBy('date', 'asc')
    .limit(10)
    .get().then(function(snapshot) {
      that.saveScores(
        snapshot.docs.map(obj => (obj.data()))
      );
      that.topScores();
    });
  }

  saveScores(scores) {
    this.scores = scores;
    clearScores();
    this.topScores();
  }

  async insertScore(username, score) {
    const date = new Date();
    // const key = `${username}_${date}`;
    // const scoreRef = this.database.ref("scores/" + key);
    const statsId = await this.insertStats(username)
    this.firestore.collection('scores').add({
      username,
      score,
      date,
      statsId,
    })
    .then(function(docRef) {
        console.log("Document successfully written!", docRef.id);
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
    // scoreRef.set(
    //   {
    //     username,
    //     score,
    //     date
    //   },
    //   error => {
    //     if (error) {
    //       console.error("Error", error);
    //     } else {
    //       console.log("Save success", username, date, score);
    //     }
    //   }
    // );
  }

  async insertStats(username) {
    const date = new Date();
    // const key = `${username}_${date}`;
    // const scoreRef = this.database.ref("scores/" + key);

    try {
      const docRef = await this.firestore.collection('stats').add({
        username,
        stats: getStats(),
        date
      })
      console.log("Document successfully written!", docRef.id);
      return docRef.id
    } catch(err) {
      console.error("Error writing document: ", error);
    }
    // scoreRef.set(
    //   {
    //     username,
    //     score,
    //     date
    //   },
    //   error => {
    //     if (error) {
    //       console.error("Error", error);
    //     } else {
    //       console.log("Save success", username, date, score);
    //     }
    //   }
    // );
  }
}
