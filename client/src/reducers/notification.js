import {
    GET_NOTIFICATIONS,
  } from '../actions/types';
  
  const initialState = {
    notifications: [],
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case GET_NOTIFICATIONS:
            return {
            ...state,
            notifications: payload,
            };
        case 'DELETE_NOTIFICATIONS':
            return {
            ...state,
            notifications: state.notifications.filter(notification => notification._id !== payload),
            };
        case 'ADD_NOTIFICATIONS':
        return {
            ...state,
            notifications: [payload, ...state.notifications]
        };
        case 'MARK_AS_READ_NOTIFICATIONS':
        return {
            ...state,
            notifications: state.notifications.map(notification => {
              notification.isRead= true;
              return notification;
            }),
        };
      default:
        return state;
    }
  }
  