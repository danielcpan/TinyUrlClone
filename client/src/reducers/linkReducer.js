import { 
  GET_LINK, 
  CREATE_LINK 
} from '../constants/actionTypes';

const initialState = {
  currentLink: {},
  createdLinks: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LINK:
      return {
        ...state,
        currentLink: action.payload,
      };
    case CREATE_LINK:
      return {
        ...state,
        // createdLinks: [...state.createdLinks, action.payload]
        createdLinks: [action.payload, ...state.createdLinks]
      }
    default:
      return state;
  }
};
