import { 
  GET_LINK_ANALYTICS, 
  CREATE_LINK 
} from '../constants/actionTypes';

const initialState = {
  currentLink: {},
  createdLinks: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LINK_ANALYTICS:
      return {
        ...state,
        currentLink: action.payload,
      };
    case CREATE_LINK:
      return {
        ...state,
        createdLinks: [action.payload, ...state.createdLinks]
      }
    default:
      return state;
  }
};
