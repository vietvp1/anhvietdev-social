import axios from 'axios';
import Swal from 'sweetalert2';
import {
    GET_CONTACTS, UPDATE_CONTACTS, DELETE_CONTACTS,
} from './types';

export const getContacts = () => async dispatch => {
    const res = await axios.get('/contact/get-contacts');
    dispatch({
      type: GET_CONTACTS,
      payload: res.data
    });
};

export const getContactsSent = () => async dispatch => {
  const res = await axios.get('/contact/get-contacts-sent');
  dispatch({
    type: 'GET_CONTACTS_SENT',
    payload: res.data
  });
};

export const getContactsReceived = () => async dispatch => {
  const res = await axios.get('/contact/get-contacts-received');
  dispatch({
    type: 'GET_CONTACTS_RECEIVED',
    payload: res.data
  });
};

export const approveContact= (user, socket) => async dispatch => {
  const res = await axios.put('/contact/approve-request-contact-received', {uid: user._id});
  if (res.data.success) {
    dispatch({
        type: UPDATE_CONTACTS,
        payload: user
    });
    dispatch({
        type: 'DELETE_CONTACTS_RECEIVED',
        payload: user._id
    });
    socket.emit('approve-request-contact-received', {contactId: user._id});
    socket.emit('check-status');
  }
};

export const rejectContact= (user, socket) => async dispatch => {
  const res = await axios.delete(`/contact/remove-request-contact-received/${user._id}`);
  if (res.data.success) {
    dispatch({
        type: 'DELETE_CONTACTS_RECEIVED',
        payload: user._id
    });
    socket.emit('remove-request-contact-received', {contactId: user._id})
  }
};

export const unfriend = (user, socket) => async dispatch => {
  const res = await axios.delete(`/contact/remove-contact/${user._id}`);
    if (res.data.success) {
      dispatch({
          type: DELETE_CONTACTS,
          payload: user._id
      });
      Swal.fire({
        title: `Bạn đã hủy bạn bè với ${user.firstName} ${user.lastName} thành công.`,
        icon: "success",
        timer: 3000,
      })
      socket.emit('remove-contact', {contactId: user._id});
      socket.emit('check-status')
    }
};

export const removeRequestContact = (user, socket) => async dispatch => {
  const res = await axios.delete(`/contact/remove-request-contact-sent/${user._id}`);
  if (res.data.success) {
    dispatch({
        type: 'DELETE_CONTACTS_SENT',
        payload: user._id
    });
  }
  socket.emit('remove-request-contact', {contactId: user._id})
};

export const addFriend = (user, socket) => async dispatch => {
  const res = await axios.post("/contact/add-new", {contactId: user._id})
  if (res.data.success) {
      dispatch({
        type: 'UPDATE_CONTACTS_SENT',
        payload: user
    })
  }
  socket.emit('add-new-contact', {contactId: user._id})
};