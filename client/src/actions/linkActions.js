import axios from 'axios';

import { 
  GET_LINK_ANALYTICS, 
  CREATE_LINK 
} from '../constants/actionTypes';

export const getLinkAnalytics = tinyUrlId => async dispatch => {
  try {
    const response = await axios.get(`/api/links?tinyUrlId=${tinyUrlId}`);
    dispatch({
      type: GET_LINK_ANALYTICS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: 'GET_LINK_ANALYTICS_ERROR',
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
