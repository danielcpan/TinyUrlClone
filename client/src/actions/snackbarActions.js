import {
  DISPLAY_SNACKBAR,
  HANDLE_CLOSE,
} from '../constants/actionTypes';

export const displaySnackbar = (data) => async (dispatch) => {
  dispatch({ type: DISPLAY_SNACKBAR, payload: data });
};

export const handleClose = () => async (dispatch) => {
  dispatch({ type: HANDLE_CLOSE });
};
