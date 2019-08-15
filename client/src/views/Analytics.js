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
import { getLink } from '../actions/linkActions';

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
const SAME_URL_REGEX = /^http:\/\/example\.com/;

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
    linkFormData: {
      originalUrl: ''
    },
    originalUrlErrors: []
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value});
  }  

  onSubmit = e => {
    e.preventDefault();
    const { linkFormData } = this.state;
    const errors = []

    if (linkFormData.originalUrl.length === 0) {
      this.setState()
      errors.push('Cannot be empty')
    }

    if (URL_REGEX.test(linkFormData.originalUrl) === false) {
      errors.push('Invalid Url')
    }

    if (SAME_URL_REGEX.test(linkFormData.originalUrl) === false) {
      errors.push('Search for a ____ link!')
    }

    if (errors.length === 0) {
      this.props.getLink(this.state.linkFormData)
    }

    this.setState({ originalUrlErrors: errors })
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
                <form onSubmit={this.onSubmit}>
                  <Grid container spacing={2} justify="center">
                    <Grid item xs={9}>
                      <TextField
                        id="originalUrl"
                        type="url"
                        label="____ link to search"
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
  getLink: Proptypes.func.isRequired
};

const mapStateToProps = state => ({
  link: state.links.currentLink,
});

const mapDispatchToProps = dispatch => ({
  getLink: data => dispatch(getLink(data)),
  // displaySnackbar: msg => dispatch(displaySnackbar(msg))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Analytics));
