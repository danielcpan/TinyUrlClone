import { 
  DISPLAY_SNACKBAR, 
  HANDLE_CLOSE 
} from '../constants/actionTypes';

const initialState = {
  open: false,
  msg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_SNACKBAR:
      return {
        ...state,
        open: true,
        msg: action.payload,
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
