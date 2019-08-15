import { 
  DISPLAY_SNACKBAR, 
  HANDLE_CLOSE 
} from '../constants/actionTypes';

export const displaySnackbar = msg => async dispatch => {
  dispatch({ type: DISPLAY_SNACKBAR, payload: msg });
};

export const handleClose = msg => async dispatch => {
  dispatch({ type: HANDLE_CLOSE });
};
