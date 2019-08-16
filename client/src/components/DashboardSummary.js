import React from 'react';
import Proptypes from 'prop-types';
import format from 'date-fns/format';
import { amber, green } from '@material-ui/core/colors';
import {
  Grid,
  Container,
} from '@material-ui/core';

import TouchAppIcon from '@material-ui/icons/TouchAppOutlined';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import PlaceIcon from '@material-ui/icons/PlaceOutlined';
import EventIcon from '@material-ui/icons/EventOutlined';

import CardSummary from './CardSummary';


const DashboardSummary = (props) => {
  const { link } = props;

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <CardSummary
            title="Total Clicks"
            body={link.totalClicks}
            icon={<TouchAppIcon />}
            color="#3e51b4"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <CardSummary
            title="Unique Clicks"
            body={link.uniqueClicks}
            icon={<PermIdentityIcon />}
            color={amber[700]}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <CardSummary
            title="Most from: "
            body={link.topCountry.code}
            icon={<PlaceIcon />}
            color={green[600]}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <CardSummary
            title="Last visit: "
            body={format(link.visits[0].createdAt, 'MMM DD, YYYY')}
            icon={<EventIcon />}
            color="#d32f2f"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

DashboardSummary.propTypes = {
  link: Proptypes.object.isRequired,
};

export default DashboardSummary;
