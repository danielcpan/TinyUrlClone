import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  Button,
  Grid,
  Container,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';

import { createLink } from '../actions/linkActions';
import { displaySnackbar } from '../actions/snackbarActions';

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const SAME_URL_REGEX = /^http:\/\/example\.com/;

const styles = (theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  shortenButton: {
    width: '100%',
    lineHeight: 3.2,
  },
  list: {
    backgroundColor: theme.palette.background.paper,
  },
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linkFormData: {
        originalUrl: '',
      },
      originalUrlErrors: [],
    };
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      linkFormData: {
        ...this.state.linkFormData, // eslint-disable-line react/no-access-state-in-setstate, react/destructuring-assignment, max-len
        [name]: value,
      },
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { linkFormData } = this.state;
    const errors = [];

    if (linkFormData.originalUrl.length === 0) {
      this.setState();
      errors.push('Cannot be empty');
    }

    if (URL_REGEX.test(linkFormData.originalUrl) === false) {
      errors.push('Invalid Url');
    }

    if (SAME_URL_REGEX.test(linkFormData.originalUrl)) {
      errors.push('That is already a ____ link!');
    }

    if (errors.length === 0) {
      this.props.createLink(this.state.linkFormData); // eslint-disable-line react/destructuring-assignment, max-len
    }

    this.setState({ originalUrlErrors: errors });
  }


  render() {
    const { createdLinks, displaySnackbar, classes } = this.props;
    const { linkFormData, originalUrlErrors } = this.state;

    return (
      <>
        <CssBaseline />
        <main>
          <div className={classes.heroContent}>
            <Container maxWidth="md">
              <Typography
                component="h1"
                variant="h3"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Shorten your link!
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                Like Bitly, it even keeps track of click analytics such as
                total clicks, unique clicks, ip, and geolocation!
              </Typography>
              <div className={classes.heroButtons}>
                <form onSubmit={this.onSubmit}>
                  <Grid container spacing={2} justify="center">
                    <Grid item xs={9}>
                      <TextField
                        id="originalUrl"
                        type="url"
                        label="Shorten your link"
                        name="originalUrl"
                        value={linkFormData.link}
                        onChange={this.onChange}
                        variant="outlined"
                        fullWidth
                        error={originalUrlErrors.length > 0}
                        helperText={(originalUrlErrors) ? originalUrlErrors[0] : ''}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        variant="outlined"
                        color="primary"
                        className={classes.shortenButton}
                        onClick={this.onSubmit}
                      >
                        Shorten
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      {(createdLinks[0]) && (
                        <div className={classes.list}>
                          <List dense style={{ border: '1px solid #b2b8c3', borderRadius: '5px' }}>
                            <ListItem>
                              <ListItemText
                                primary={createdLinks[0].tinyUrl}
                              />
                              <ListItemSecondaryAction>
                                <CopyToClipboard
                                  text={createdLinks[0].tinyUrl}
                                  onCopy={() => displaySnackbar({ msg: 'Copied to clipboard!' })}
                                >
                                  <Button
                                    variant="outlined"
                                    color="primary"
                                    className={classes.button}
                                  >
                                  Copy
                                  </Button>
                                </CopyToClipboard>
                              </ListItemSecondaryAction>
                            </ListItem>
                          </List>
                        </div>
                      )}
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Container>
          </div>
        </main>
      </>
    );
  }
}

Home.propTypes = {
  createLink: Proptypes.func.isRequired,
  createdLinks: Proptypes.array,
  displaySnackbar: Proptypes.func.isRequired,
};

Home.defaultProps = {
  createdLinks: [],
};

const mapStateToProps = (state) => ({
  link: state.links.currentLink,
  createdLinks: state.links.createdLinks,
});

const mapDispatchToProps = (dispatch) => ({
  createLink: (data) => dispatch(createLink(data)),
  displaySnackbar: (data) => dispatch(displaySnackbar(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Home));
