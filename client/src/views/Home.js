import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
// import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { TextField } from '@material-ui/core';

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="https://material-ui.com/">
        Your Website
    </Link>
    {' '}
    {new Date().getFullYear()}
    {'. Built with '}
    <Link color="inherit" href="https://material-ui.com/">
        Material-UI.
    </Link>
  </Typography>
);

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

class Home extends React.Component {
  state = {
    link: ''
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
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              TinyUrlClone
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="md">
              <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                Shorten your link!
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Like Bitly, it even keeps track of click analytics such as total clicks, unique clicks, ip, and geolocation!
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item xs={9}>
                    <TextField
                      id="originalUrl"
                      type="url"
                      label="Shorten your link"
                      name="originalUrl"
                      value={this.state.link}
                      onChange={this.onChange}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button variant="outlined" color="primary" className={classes.shortenButton}>
                      Shorten
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="tinyUrl"
                      type="url"
                      name="tinyUrl"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
        </main>
      </>
    );    
  }
};

export default withStyles(styles)(Home);
