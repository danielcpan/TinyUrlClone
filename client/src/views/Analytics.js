import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { 
  Button, 
  Grid, 
  Container, 
  TextField, 
  Typography 
} from '@material-ui/core';

import VisitsTable from '../components/VisitsTable';

const styles = theme => ({
  heroContent: {
    padding: theme.spacing(2, 0, 9),
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
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item xs={9}>
                    <TextField
                      id="originalUrl"
                      type="url"
                      label="Link to search"
                      name="originalUrl"
                      value={this.state.link}
                      onChange={this.onChange}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button variant="outlined" color="primary" className={classes.shortenButton}>
                      Get Analytics
                    </Button>
                  </Grid>
                </Grid>
              </div>
              <VisitsTable />
            </Container>
          </div>
        </main>
      </>
    );    
  }
};

export default withStyles(styles)(Analytics);
