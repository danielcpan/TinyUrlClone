import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    textDecoration: 'none',
    color: 'white',
  },
}));

const AppToolBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" color="primary" elevation={0} className={classes.appBar}>
      <Toolbar variant="dense" className={classes.toolbar}>
        <Typography variant="h5" color="inherit" noWrap className={classes.toolbarTitle}>
          <Link to="/" className={classes.link}>
            Bitly Clone
          </Link>
        </Typography>
        <nav>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            <Link to="/analytics" className={classes.link}>
              Analytics
            </Link>
          </Typography>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolBar;
