import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { Snackbar } from '@material-ui/core';

import { handleClose } from '../actions/snackbarActions';

 const AppSnackbar = props => {
  const { open, msg, handleClose } = props

  return (
    <div>
      <Snackbar
        anchorOrigin={{ 
          vertical: 'top', 
          horizontal: 'center' 
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={<span id="message-id">{msg}</span>}
      />
    </div>
  );
}

AppSnackbar.propTypes = {
  open: Proptypes.bool.isRequired,
  msg: Proptypes.string.isRequired,
  handleClose: Proptypes.func.isRequired
}

const mapStateToProps = state => ({
  open: state.snackbars.open,
  msg: state.snackbars.msg
});

const mapDispatchToProps = dispatch => ({
  handleClose: () => dispatch(handleClose())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppSnackbar);