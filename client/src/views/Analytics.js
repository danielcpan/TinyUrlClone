import React from 'react';
import Proptypes from 'prop-types';
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
import { getLinkAnalytics } from '../actions/linkActions';

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
const SAME_URL_REGEX = /^http:\/\/example\.com/;
// const TINY_URL_ID_REGEX = /\/([^\/]+)\/?$/;

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
    tinyUrl: '',
    tinyUrlErrors: []
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value});
  }  

  onSubmit = e => {
    e.preventDefault();
    const errors = []
    const { tinyUrl } = this.state

    if (tinyUrl.length === 0) {
      errors.push('Cannot be empty')
    }

    // if (URL_REGEX.test(tinyUrl) === false) {
    //   errors.push('Invalid Url')
    // }

    // if (SAME_URL_REGEX.test(tinyUrl) === false) {
    //   errors.push('Search for a ____ link!')
    // }

    const tinyUrlId = tinyUrl.substr(tinyUrl.lastIndexOf('/') + 1);

    if (tinyUrlId.length !== 6) {
      errors.push('____ links must have 6 characters as the id')
    }

    if (errors.length === 0) {
      this.props.getLinkAnalytics(tinyUrlId)
    }

    this.setState({ tinyUrlErrors: errors })
  }  

  render() {
    const { classes } =  this.props;
    // console.log("linkFormDAta")
    // console.log(linkFormData)

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
                <form onSubmit={this.onSubmit}>
                  <Grid container spacing={2} justify="center">
                    <Grid item xs={9}>
                      <TextField
                        id="tinyUrl"
                        type="url"
                        label="____ link to search"
                        name="tinyUrl"
                        value={this.state.tinyUrl}
                        onChange={this.onChange}
                        variant="outlined"
                        fullWidth
                        error={this.state.tinyUrlErrors.length > 0}
                        helperText={(this.state.tinyUrlErrors) ? this.state.tinyUrlErrors[0] : ''}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Button 
                        variant="outlined" 
                        color="primary" 
                        className={classes.shortenButton}
                        onClick={this.onSubmit}
                      >
                        Get Analytics
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </div>
              <VisitsTable />
            </Container>
          </div>
        </main>
      </>
    );    
  }
};

Analytics.propTypes = {
  getLinkAnalytics: Proptypes.func.isRequired
};

const mapStateToProps = state => ({
  link: state.links.currentLink,
});

const mapDispatchToProps = dispatch => ({
  getLinkAnalytics: tinyUrId => dispatch(getLinkAnalytics(tinyUrId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Analytics));
