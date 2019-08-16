import React from 'react';
import Proptypes from 'prop-types';
import { amber, green } from '@material-ui/core/colors';
import { 
  Grid, 
  Container, 
} from '@material-ui/core';

import TouchAppIcon from '@material-ui/icons/TouchAppOutlined'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import PlaceIcon from '@material-ui/icons/PlaceOutlined';

import CardSummary from './CardSummary';


const DashboardSummary = props => {
  const { link } = props;

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <CardSummary 
            title={'Total Clicks'}
            body={link.totalClicks}
            icon={<TouchAppIcon />}
            color="#3e51b4"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <CardSummary 
            title={'Unique Clicks'}
            body={link.uniqueClicks}
            icon={<PermIdentityIcon />}
            color={amber[700]}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <CardSummary 
            title={'Most from: '}
            body={link.uniqueClicks}
            icon={<PlaceIcon />}
            color={green[600]}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <CardSummary 
            title={'Last visit: '}
            body={link.uniqueClicks}
            icon={<PermIdentityIcon />}
            color="#d32f2f"
          />
        </Grid>
      </Grid>
    </Container>
  );   
}

DashboardSummary.propTypes = {
  link: Proptypes.object.isRequired
};

export default DashboardSummary;
