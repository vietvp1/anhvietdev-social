
  const initialState = {
    usersOnline: [],
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case 'GET_USERS_ONLINE':
            return {
            ...state,
            usersOnline: payload,
            };
        case 'DELETE_USER_ONLINE':
            return {
            ...state,
            usersOnline: state.usersOnline.filter(user => user._id !== payload),
            };
        case 'ADD_USERS_ONLINE':
          {
            let checkExist = 0;
            state.usersOnline.forEach(user => {
              if (user._id === payload._id) {
                checkExist = 1;
              }
            })
            return {
              ...state,
              usersOnline: checkExist? [...state.usersOnline] :  [...state.usersOnline, payload]
            };
          }
      default:
        return state;
    }
  }
  