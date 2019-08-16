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
  Typography,
} from '@material-ui/core';

import VisitsTable from '../components/VisitsTable';
import DashboardSummary from '../components/DashboardSummary';
import { getLinkAnalytics, resetCurrentLink } from '../actions/linkActions';

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const SAME_URL_REGEX = /^http:\/\/example\.com/;

const styles = (theme) => ({
  heroContent: {
    padding: theme.spacing(2, 0, 9),
  },
  shortenButton: {
    width: '100%',
    lineHeight: 3.2,
  },
});


class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tinyUrl: '',
      tinyUrlErrors: [],
    };
  }

  componentDidMount() {
    this.props.resetCurrentLink(); // eslint-disable-line react/destructuring-assignment
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const errors = [];
    const { tinyUrl } = this.state;

    if (tinyUrl.length === 0) {
      errors.push('Cannot be empty');
    }

    // if (URL_REGEX.test(tinyUrl) === false) {
    //   errors.push('Invalid Url')
    // }

    // if (SAME_URL_REGEX.test(tinyUrl) === false) {
    //   errors.push('Search for a ____ link!')
    // }

    const tinyUrlId = tinyUrl.substr(tinyUrl.lastIndexOf('/') + 1);

    if (tinyUrlId.length !== 6) {
      errors.push('____ links must have 6 characters as the id');
    }

    if (errors.length === 0) {
      this.props.getLinkAnalytics(tinyUrlId); // eslint-disable-line react/destructuring-assignment
    }

    this.setState({ tinyUrlErrors: errors });
  }

  render() {
    const { link, classes } = this.props;
    const { tinyUrl, tinyUrlErrors } = this.state;

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
                    <Grid item xs={7} sm={8} md={9}>
                      <TextField
                        id="tinyUrl"
                        type="url"
                        label="____ link to search"
                        name="tinyUrl"
                        value={tinyUrl}
                        onChange={this.onChange}
                        variant="outlined"
                        fullWidth
                        error={tinyUrlErrors.length > 0}
                        helperText={(tinyUrlErrors) ? tinyUrlErrors[0] : ''}
                      />
                    </Grid>
                    <Grid item xs={5} sm={4} md={3}>
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
            </Container>
            {(link.visits) && (
              <>
                <DashboardSummary link={link} />
                <VisitsTable visits={link.visits} />
              </>
            )}
          </div>
        </main>
      </>
    );
  }
}

Analytics.propTypes = {
  link: Proptypes.object,
  getLinkAnalytics: Proptypes.func.isRequired,
  resetCurrentLink: Proptypes.func.isRequired,
};

Analytics.defaultProps = {
  link: {},
};

const mapStateToProps = (state) => ({
  link: state.links.currentLink,
});

const mapDispatchToProps = (dispatch) => ({
  getLinkAnalytics: (tinyUrId) => dispatch(getLinkAnalytics(tinyUrId)),
  resetCurrentLink: () => dispatch(resetCurrentLink()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Analytics));
