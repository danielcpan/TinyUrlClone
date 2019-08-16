import React from 'react';
import Proptypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Avatar, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(2, 0),
  },
  avatar: {
    height: 64,
    width: 64,
    marginTop: theme.spacing(1),
  },
}));

const CardSummary = (props) => {
  const classes = useStyles();
  const {
    title, body, icon, color,
  } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container>
          <Grid item xs={9}>
            <Grid item xs={12}>
              <Typography
                component="h1"
                variant="h5"
                color="textPrimary"
                gutterBottom
              >
                {title}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography
                component="h2"
                variant="h6"
                color="textSecondary"
                gutterBottom
              >
                {body}
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={3}>
            <Avatar
              className={classes.avatar}
              style={{ backgroundColor: color }}
            >
              {icon}
            </Avatar>
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  );
};

CardSummary.propTypes = {
  title: Proptypes.string.isRequired,
  body: Proptypes.string.isRequired,
  icon: Proptypes.node.isRequired,
  color: Proptypes.string.isRequired,
};

export default CardSummary;
