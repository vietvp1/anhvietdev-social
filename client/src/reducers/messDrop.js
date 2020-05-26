import { moveToTheTop } from '../clientHelper/helperClient';
  
  const initialState = {
    conversations: [],
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case 'GET_MESSDROP':
            return {
            ...state,
            conversations: payload,
            };
        case 'DELETE_MESSDROP':
            return {
            ...state,
            conversations: state.conversations.filter(conversation => conversation._id !== payload),
            };
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
        case 'UPDATE_MESSAGES':
          return {
          ...state,
          conversations: state.conversations.map(conversation => 
            conversation._id === payload.idConversation? {...conversation, messages:[...conversation.messages , payload.payload] }: conversation 
        )};
        case 'ADD_MESSDROP':
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
        case 'MOVE_MESSDROP':
        { let a = [];
        return {
            ...state,
            conversations: a.concat(moveToTheTop(state.conversations, payload))
        }};
        case 'OFF_MESSDROP':
        return {
          ...state,
          conversations: state.conversations.map(conversation => 
            conversation._id === payload.idConversation? {...conversation, isShow: false }: conversation 
          )
        };
        case 'ON_MESSDROP':
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
  