import {
    GET_CONVERSATIONS,
    ADD_CONVERSATIONS,
    DELETE_CONVERSATIONS,
    MOVE_CONVERSATIONS,
    UPDATE_MESSAGES,
  } from '../actions/types';
import { moveToTheTop } from '../clientHelper/helperClient';
  
  const initialState = {
    conversations: [],
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case GET_CONVERSATIONS:
            return {
            ...state,
            conversations: payload,
            };
        case DELETE_CONVERSATIONS:
            return {
            ...state,
            conversations: state.conversations.filter(conversation => conversation._id !== payload),
            };
        case UPDATE_MESSAGES:
          return {
          ...state,
          conversations: state.conversations.map(conversation => 
            conversation._id === payload.idConversation? {...conversation, messages:[...conversation.messages , payload.payload] }: conversation 
          )};
        case 'MARK_AS_READ_MESSAGE':
          return {
          ...state,
          conversations: state.conversations.map(conversation => 
            conversation._id === payload.conversationId? 
                {...conversation, 
                    messages: conversation.messages.map(message => 
                    message._id === payload.messageId? 
                    {...message, isReaded: true, updatedAt: payload.time}: message)}
                :conversation 
          )};
        case ADD_CONVERSATIONS:
        {
          let checkExist = 0;
          state.conversations.forEach(conver => {
            if ((conver._id === payload._id)) {
              checkExist = 1;
              return;
            }
          })
          return {
            ...state,
            conversations: checkExist? [...state.conversations] :  [payload, ...state.conversations]
          };
        }
        case MOVE_CONVERSATIONS:
        { let a = [];
        return {
            ...state,
            conversations: a.concat(moveToTheTop(state.conversations, payload))
        }};
        case 'OFF_CONVERSITIONS':
        return {
          ...state,
          conversations: state.conversations.map(conversation => 
            conversation._id === payload.idConversation? {...conversation, isShow: false }: conversation 
          )
        };
        case 'ON_CONVERSITIONS':
        return {
          ...state,
          conversations: state.conversations.map(conversation => 
            conversation._id === payload.idConversation? {...conversation, isShow: true }: conversation 
          )
        };
      default:
        return state;
    }
  }
  