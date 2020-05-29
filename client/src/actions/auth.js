import axios from 'axios';
import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    USER_UPDATED
} from './types';
import { toast } from 'react-toastify';
import setAuthToken from '../utils/setAuthToken';
import { getContacts, getContactsSent, getContactsReceived } from './contact';
import { getNotifications } from './notification';
import { getConversations } from './conversation';

import io from 'socket.io-client'
let token = localStorage.token;
let ENDPOINT = process.env.REACT_APP_API;
let socket = io(ENDPOINT, { query: { token: token } })

// Load User
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        if (localStorage.token) {
            const res = await axios.get('/userloaded');
            dispatch({
                type: USER_LOADED,
                payload: res.data,
            });
            dispatch({
                type: 'DATA_LOADED',
                socket: socket
            });
            dispatch(getContacts());
            dispatch(getContactsSent());
            dispatch(getContactsReceived());
            dispatch(getNotifications());
            dispatch(getConversations());
        }
    } catch (err) {
        // toast.info(err.response.data.error);
        dispatch({
            type: AUTH_ERROR
        });
    }
};
// Register User
export const register = ({ firstName, lastName, email, password }) => async dispatch => {
    try {
        const res = await axios.post('/register', { firstName, lastName, email, password });
        toast.success(res.data.message);
        return { success: true };
    } catch (err) {
        toast.error(err.response.data.error);
        return { sucess: false }
    }
};

export const loginFacebook = (userID, accessToken) => async dispatch => {
    try {
        const res = await axios.post('/facebook-login', { userID, accessToken });
        toast.success(res.data.message);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });
        toast.warn(err.response.data.error);
    }
};

export const loginGoogle = (googleId, idToken) => async dispatch => {
    try {
        const res = await axios.post('/google-login', { idToken, googleId });
        toast.success(res.data.message);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
        return res;
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });
        toast.warn(err.response.data.error);
    }
};

// Local Login 
export const login = (email, password) => async dispatch => {
    try {
        const res = await axios.post('/login', { email, password });
        toast.success(res.data.message);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
        return res;
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });
        toast.error(err.response.data.error)
    }
};

export const updateUser = (user) => async dispatch => {
    dispatch({
        type: USER_UPDATED,
        payload: user
    });
};

// Logout / Clear Profile
export const logout = () => async dispatch => {
    await dispatch({ type: LOGOUT });
    //window.location.reload(false);
};
