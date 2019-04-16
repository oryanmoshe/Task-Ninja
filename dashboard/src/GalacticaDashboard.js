import React, { PureComponent } from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import _ from 'lodash'
import StatBox from './StatBox'
import Leaderboard from './Leaderboard'
import Grid from '@material-ui/core/Grid'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import DarkUnica from 'highcharts/themes/dark-unica';

class GalacticaDashboard extends PureComponent {
  listenToScores = (date) => {
    const that = this;
    if (that.scoresUnsub){
      that.scoresUnsub();
      that.scoresUnsub = null;
    }
    that.scoresUnsub = that.db.collection("scores")
    .where('date', '>=', date)
    .onSnapshot(function(snapshot) {
      const rawScores = _(snapshot.docs).map(obj => obj.data()).orderBy(obj => -obj.score).value()
      that.setState({
        scoresSnap: snapshot,
        scores: rawScores,
      })
    });
  }

  listenToStats = (date) => {
    const that = this;
    if (that.statsUnsub){
      that.statsUnsub();
      that.statsUnsub = null;
    }
    that.statsUnsub = that.db.collection("stats")
    .where('date', '>=', date)
    .onSnapshot(function(snapshot) {
      const rawStats = _(snapshot.docs).map(obj => obj.data()).value()
      that.setState({
        statsSnap: snapshot,
        stats: rawStats,
      })
    });
  }

  getGroupedByUser = () => {
    return _.groupBy(this.state.scores, obj => obj.username)
  }
  getDistanceCm = () => {
    return this.state.stats.reduce((acc, obj) => acc + obj.stats.distance, 0)
  }
  getTimePlayedMs = () => {
    return this.state.stats.reduce((acc, obj) => acc + obj.stats.endTime - obj.stats.startTime, 0)
  }
  getFruitsCutNum = () => {
    return this.state.stats.reduce((acc, obj) => acc + _.sum(Object.values(obj.stats.cuts)), 0)
  }
  getAvgGameLenMs = () => {
    return this.getTimePlayedMs() / this.state.stats.length
  }
  getGamesPerHour(){
    const allDates = _.range(24, -1).map(leg => {
      let d = new Date();
      d.setMinutes(0);
      d.setSeconds(0);
      d.setMilliseconds(0);
      d.setHours(d.getHours() - leg + 3);
      return [d, 0];});
    const games = _(this.state.scores).groupBy(obj => {
      let d = new Date(obj.date.seconds * 1000);
      d.setMinutes(0);
      d.setSeconds(0);
      d.setMilliseconds(0);
      d.setHours(d.getHours() + 3);
      return d
    }).mapValues(obj=> obj.length).value()
    return allDates.map(obj => [obj[0].getTime(), (games[obj[0]] || 0)])
  }
  getHighchartsOptionsGamesPerHour = () => {
    return {
      title: {
        text: 'Games Per Hour'
      },
      ...this.highchartsOptions,
      xAxis: {
          type: 'datetime'
      },
      series: [{
        showInLegend: false,
        name: '# Games',
        data: this.getGamesPerHour()
      }]
    }
  }
  getHighchartsOptionsTopGamers = () => {
    const top = _(this.getGroupedByUser()).mapValues(obj => obj.length).toPairs().orderBy(obj => -obj[1]).filter(obj => obj[0]).slice(0, 10).value();
    return {
      title: {
        text: 'Addicted Players'
      },
      ...this.highchartsOptions,
      xAxis: {
          categories: top.map(obj => obj[0])
      },
      series: [{
        name: '# Games',
        type: 'column',
        showInLegend: false,
        data: top
      }]
    }
  }
  getLastThu(){
    const now = new Date();
    const daysAfterLastThursday = (-7 + 4) - now.getDay(); // 7 = number of days in week, 4 = the thursdayIndex (0= sunday)
    const currentMs = now.getTime();
    const lastThursday = new Date(currentMs + (daysAfterLastThursday * 24 * 60 * 60 * 1000));
    return lastThursday;
  }
  constructor(props){
    super(props)

    this.highchartsOptions = {
      chart: {
        shadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
        borderRadius: '4px'
      },
      credits: false
    }

    if (props.match.params.theme !== 'light'){
      DarkUnica(Highcharts)
      this.theme = createMuiTheme({
        palette: {
          type: 'dark',
        },
      });
      this.highchartsOptions.chart.backgroundColor = '#424242';
    }
    
    this.state = {
      scores: [],
      stats: [],
      distance: 0,
      date: props.match.params.date || this.getLastThu()
    }
  }
  componentDidMount(){
    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyAYOtpgF1PqQi_izfB_-O34D1OdT9g98As",
      authDomain: "taskninja-2743c.firebaseapp.com",
      databaseURL: "https://taskninja-2743c.firebaseio.com",
      projectId: "taskninja-2743c",
      storageBucket: "taskninja-2743c.appspot.com",
      messagingSenderId: "261944698079"
    };
    firebase.initializeApp(config);
    this.db = firebase.firestore();
    this.listenToScores(new Date(this.state.date));
    this.listenToStats(new Date(this.state.date));
  }
  render() {
    const {scores} = this.state;
    return (
      <MuiThemeProvider theme={this.theme}>
        <CssBaseline />
        <div className="App">
          <Grid container spacing={16} style={{padding: '1%'}}>
            <Grid item xs={12} lg={3}>
              <StatBox label="Distance Cut" value={(this.getDistanceCm() / 100 / 1000).toFixed(2)} suffix="KM" />
            </Grid>
            <Grid item xs={12} lg={3}>
              <StatBox label="Time Played" value={(this.getTimePlayedMs() / 1000 / 60).toFixed(2)} suffix=" Mins" />
            </Grid>
            <Grid item xs={12} lg={3}>
              <StatBox label="Cut Status" value={this.getFruitsCutNum()} suffix=" Statuses" />
            </Grid>
            <Grid item xs={12} lg={3}>
              <StatBox label="Avg. Game Length" value={(this.getAvgGameLenMs() / 1000 / 60).toFixed(2)} suffix=" Mins" />
            </Grid>
            <Grid item xs={12} lg={12}>
              <Leaderboard top={scores.filter(obj => obj.username).slice(0, 40)} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <HighchartsReact
                highcharts={Highcharts}
                options={this.getHighchartsOptionsGamesPerHour()}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <HighchartsReact
                highcharts={Highcharts}
                options={this.getHighchartsOptionsTopGamers()}
              />
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default GalacticaDashboard;
