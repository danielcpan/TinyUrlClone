import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid, Container, TextField, Typography } from '@material-ui/core';

import VisitsTable from '../components/VisitsTable';

const styles = theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardContent: {
    flexGrow: 1,
  },
  shortenButton: {
    width: '100%',
    lineHeight: 3.2,
  },
});

class Analytics extends React.Component {
  state = {
    originalUrl: ''
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value});
  }  

  render() {
    const { classes } =  this.props;

    return (
      <>
        <CssBaseline />
        <main>
          <div className={classes.heroContent}>
            <Container maxWidth="md">
              <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                Analytics
              </Typography>

              <VisitsTable />
            </Container>
          </div>
        </main>
      </>
    );    
  }
};

export default withStyles(styles)(Analytics);
