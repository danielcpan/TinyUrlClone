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
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';

import { createLink } from '../actions/linkActions';

const styles = theme => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  shortenButton: {
    width: '100%',
    lineHeight: 3.2,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },  
});

class Home extends React.Component {
  state = {
    linkFormData: {
      originalUrl: ''  
    }
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      linkFormData: {
        ...this.state.linkFormData,
        [name]: value,
      },
    });
  }  

  onSubmit = e => {
    e.preventDefault();
    if (this.state.linkFormData.originalUrl != "") {
      this.props.createLink(this.state.linkFormData)
    } else {
      console.log("cant be empty ")
    }
  }


  render() {
    const { createdLinks, classes } =  this.props;

    return (
      <>
        <CssBaseline />
        <main>
          <div className={classes.heroContent}>
            <Container maxWidth="md">
              <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                Shorten your link!
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Like Bitly, it even keeps track of click analytics such as total clicks, unique clicks, ip, and geolocation!
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
                        value={this.state.linkFormData.link}
                        onChange={this.onChange}
                        variant="outlined"
                        fullWidth
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
                        <div className={classes.demo}>
                          <List dense>
                            {/* {generate( */}
                              <ListItem>
                                <ListItemText
                                  primary={(createdLinks[0]) ? createdLinks[0].tinyUrl : ''}
                                />
                                <ListItemSecondaryAction>
                                  {/* Copy */}
                                  <Button variant="outlined" color="primary" className={classes.button}>
                                    Copy
                                  </Button>
                                </ListItemSecondaryAction>
                              </ListItem>
                            {/* )} */}
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
};

Home.propTypes = {
  createLink: Proptypes.func.isRequired
};

const mapStateToProps = state => ({
  link: state.links.currentLink,
  createdLinks: state.links.createdLinks
});

const mapDispatchToProps = dispatch => ({
  createLink: data => dispatch(createLink(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Home));

