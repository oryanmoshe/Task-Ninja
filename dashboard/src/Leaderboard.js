import React, { PureComponent } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class Leaderboard extends PureComponent {
  render() {
    const {top} = this.props
    const leader = top[0] || {score: 0}
    return(
      <Paper elevation={1}>
        <Typography variant="h2" component="h1">
          Leaderboard
        </Typography>
        <Grid container item xs={12} lg={12} spacing={16} style={{padding: '1%'}} alignItems="center">
          <Grid container item xs={12} lg={12}>
            <Typography variant="h4" component="h3" style={{display: 'flex', flexBasis: '100%', justifyContent:'center'}}>
              {leader.username} - {leader.score.toLocaleString()}
            </Typography>
            {top.slice(1).map(obj => (
              <React.Fragment>

              <br/>
              <Typography variant="h5" component="h4" style={{display: 'flex', flexBasis: '100%', justifyContent:'center'}}>
                {obj.username} - {obj.score.toLocaleString()}
              </Typography>
              </React.Fragment>
            ))}
          </Grid>
          <Grid container item xs={12} lg={6}>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default Leaderboard