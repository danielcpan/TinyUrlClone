import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { Snackbar } from '@material-ui/core';

import { handleClose } from '../actions/snackbarActions';
import AppSnackbarContent from './AppSnackbarContent';

const AppSnackbar = (props) => {
  const {
    open, duration, variant, msg, handleClose, // eslint-disable-line no-shadow
  } = props;

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
      >
        <AppSnackbarContent
          onClose={handleClose}
          variant={variant}
          message={msg}
        />
      </Snackbar>
    </div>
  );
};

AppSnackbar.propTypes = {
  open: Proptypes.bool.isRequired,
  duration: Proptypes.number.isRequired,
  variant: Proptypes.string.isRequired,
  msg: Proptypes.string.isRequired,
  handleClose: Proptypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  open: state.snackbars.open,
  duration: state.snackbars.duration,
  variant: state.snackbars.variant,
  msg: state.snackbars.msg,
});

const mapDispatchToProps = (dispatch) => ({
  handleClose: () => dispatch(handleClose()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppSnackbar);
