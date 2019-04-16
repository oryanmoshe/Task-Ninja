import React, { PureComponent } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class StatBox extends PureComponent {
  render() {
    const {label, value, suffix} = this.props
    return(
      <Paper elevation={1}>
        <Typography variant="h5" component="h3">
          {label}
        </Typography>
        <Typography component="p">
          {value}{suffix}
        </Typography>
      </Paper>
    )
  }
}

export default StatBox