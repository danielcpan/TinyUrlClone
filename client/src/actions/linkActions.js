import axios from 'axios';

import { 
  GET_LINK_ANALYTICS, 
  CREATE_LINK,
  DISPLAY_SNACKBAR
} from '../constants/actionTypes';

export const getLinkAnalytics = tinyUrlId => async dispatch => {
  try {
    const response = await axios.get(`/api/links?tinyUrlId=${tinyUrlId}`);    
    dispatch({
      type: GET_LINK_ANALYTICS,
      payload: response.data[0],
    });
  } catch (err) {
    const snackbarPayload = {
      variant: 'error',
      msg: err.response.data.message
    };
    dispatch({
      type: DISPLAY_SNACKBAR,
      payload: snackbarPayload
    });
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
