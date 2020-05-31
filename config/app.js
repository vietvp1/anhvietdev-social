 module.exports = {
    app:{
        max_event_listeners: 30,
        avatar_directory: "uploads/avatar",
        group_directory: "uploads/group",
        avatar_type: ["image/png", "image/ipg", "image/jpeg"],
        avatar_limit_size: 2*1048576 ,
        general_avatar_group_chat: "avatar-default.jpg",
        image_message_directory: "uploads/chat",
        image_message_type: ["image/png", "image/ipg", "image/jpeg"],
        image_message_limit_size: 2*1048576,
        post_directory: "uploads/post",
    }
}
