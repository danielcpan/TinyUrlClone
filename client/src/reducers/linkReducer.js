import { 
  GET_LINK, 
  CREATE_LINK 
} from '../constants/actionTypes';

const initialState = {
  currentLink: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LINK:
      return {
        ...state,
        currentLink: action.payload,
      };
    case CREATE_LINK:
    default:
      return state;
  }
};
