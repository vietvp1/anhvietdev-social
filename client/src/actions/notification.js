import axios from 'axios';
import {
    GET_NOTIFICATIONS,
} from './types';

export const getNotifications = () => async dispatch => {
    const res = await axios.get('/notification/get-notification');
    dispatch({
      type: GET_NOTIFICATIONS,
      payload: res.data
    });
};
