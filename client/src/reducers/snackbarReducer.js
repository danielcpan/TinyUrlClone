import {
  DISPLAY_SNACKBAR,
  HANDLE_CLOSE,
} from '../constants/actionTypes';

const initialState = {
  open: false,
  duration: 2000,
  variant: 'info',
  msg: 'test',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_SNACKBAR:
      return {
        ...state,
        open: true,
        duration: action.payload.duration || 2000,
        variant: action.payload.variant || 'info',
        msg: action.payload.msg,
      };
    case HANDLE_CLOSE:
      return {
        ...state,
        open: false,
        msg: '',
      };
    default:
      return state;
  }
};
