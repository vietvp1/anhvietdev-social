import axios from 'axios';
import {
    GET_CONVERSATIONS, UPDATE_MESSAGES, ADD_CONVERSATIONS
} from './types';

export const getConversations = () => async dispatch => {
    const res = await axios.post('/message/get-all-conversations');
    // res.data.map(conver => {
    //   conver.isShow = false;
    //   return conver
    // })
    dispatch({
      type: GET_CONVERSATIONS,
      payload: res.data
    });
};

export const updateMessages = (data) => async dispatch => {
  dispatch({
    type: UPDATE_MESSAGES,
    payload: data,
  });
};

export const newGroupChatCreate = (data) => async dispatch => {
  dispatch({
    type: ADD_CONVERSATIONS,
    payload: data
  });
};
