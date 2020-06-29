const { notification } = require('../services/index')

let getNotifications = async (req, res) => {
    try {
        let notifications = await notification.getNotifications(req.user._id);
        return res.status(200).send(notifications);
    } catch (error) {
        return res.status(500).send("Server error :(");
    }
}

let readMore = async (req, res) => {
    try {
        //get skip number from query param
        let skipNumberNotif = +(req.query.skipNumber);
        //get more item
        let newNotifications = await notification.readMore(req.user._id, skipNumberNotif);
        return res.status(200).send(newNotifications);
    } catch (error) {
        return res.status(500).send("Server error :(");
    }
};

let markAllAsRead = async (req, res) => {
    try {
        let mark = await notification.markAllAsRead(req.user._id);
        return res.status(200).send({ success: true });
    } catch (error) {
        return res.status(500).send("Server error :(");
    }
};

let removeNotification = async (req, res) => {
    try {
        const idNotif =  req.params.id;
        await notification.removeNotification(idNotif);
        return res.status(200).send({success: true});
    } catch (error) {
        return res.status(500).send({success: false});
    }
}



module.exports = {
    getNotifications,
    readMore,
    markAllAsRead,
    removeNotification
}