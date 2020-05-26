
const initialState = {
    socket: null,
    sidebarOpen: false,
    right_sidebarOpen: false
};

export default function (state = initialState, action) {
    const { type, socket } = action;

    switch (type) {
        case 'DATA_LOADED':
            return {
                ...state,
                socket: socket
            };
        case 'TOGGLE_SIDEBAR':
            return {
                ...state,
                sidebarOpen: !state.sidebarOpen
            };
        case 'TOGGLE_RIGHT_SIDEBAR':
            return {
                ...state,
                right_sidebarOpen: !state.right_sidebarOpen
            };
        default:
            return state;
    }
}
