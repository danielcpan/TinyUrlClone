import axios from 'axios';

import { 
  GET_LINK, 
  CREATE_LINK 
} from '../constants/actionTypes';

export const getLink = id => async dispatch => {
  try {
    const response = await axios.get(`/api/links/${id}`);
    dispatch({
      type: GET_LINK,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: 'GET_LINK_ERROR',
      error: err.response.data,
    });
  }
};

export const createLink = data => async dispatch => {
  try {
    const response = await axios.post(`/api/links`, data);
    dispatch({
      type: CREATE_LINK,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: 'CREATE_LINK_ERROR',
      error: err.response.data,
    });
  }
};
