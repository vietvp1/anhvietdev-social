import {
    GET_CONTACTS,
    UPDATE_CONTACTS,
    DELETE_CONTACTS,
  } from '../actions/types';
  
  const initialState = {
    contacts: [],
    contactsReceived: [],
    contactsSent: [],
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case GET_CONTACTS:
            return {
            ...state,
            contacts: payload,
            };
        case DELETE_CONTACTS:
            return {
            ...state,
            contacts: state.contacts.filter(contact => contact._id !== payload),
            };
        case UPDATE_CONTACTS:
        return {
            ...state,
            contacts: [...state.contacts, payload]
        };
        case 'GET_CONTACTS_RECEIVED':
            return {
            ...state,
            contactsReceived: payload,
            };
        case 'DELETE_CONTACTS_RECEIVED':
            return {
            ...state,
            contactsReceived: state.contactsReceived.filter(contact => contact._id !== payload),
            };
        case 'UPDATE_CONTACTS_RECEIVED':
        return {
            ...state,
            contactsReceived: [payload,...state.contactsReceived]
        };
        case 'GET_CONTACTS_SENT':
            return {
            ...state,
            contactsSent: payload,
            };
        case 'DELETE_CONTACTS_SENT':
            return {
            ...state,
            contactsSent: state.contactsSent.filter(contact => contact._id !== payload),
            };
        case 'UPDATE_CONTACTS_SENT':
        return {
            ...state,
            contactsSent: [payload,...state.contactsSent]
        };
      default:
        return state;
    }
  }
  