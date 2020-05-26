const {contact} = require("../services/index")
const {validationResult} = require("express-validator")

let getContacts = async (req, res) => {
    try {
        let contacts = await contact.getContacts(req.user._id);
        return res.status(200).send(contacts);
    } catch (error) {
        return res.status(500).send(error);
    }
} 

let getContactsByIdUser = async (req, res) => {
    try {   
        let contacts = await contact.getContacts(req.params.id);
        return res.status(200).send(contacts);
    } catch (error) {
        return res.status(500).send(error);
    }
}

let getContactsSent = async (req, res) => {
    try {
        let contactsSent = await contact.getContactsSent(req.user._id)
        return res.status(200).send(contactsSent);
    } catch (error) {
        return res.status(500).send(error);
    }
}

let getContactsReceived = async (req, res) => {
    try {
        let contactsReceived = await contact.getContactsReceived(req.user._id)
        return res.status(200).send(contactsReceived);
    } catch (error) {
        return res.status(500).send(error);
    }
}

let addNewContact = async (req, res) => {
    try {
        let currentUserId = req.user._id;
        let contactId = req.body.contactId;
        let newContact = await contact.addNew(currentUserId, contactId);
        return res.status(200).send({success: !!newContact});
    } catch (error) {
        return res.status(500).send(error);
    }
}

let removeContact = async (req, res) => {
    try {
        let currentUserId = req.user._id;
        let contactId = req.params.id;
        let removeContact = await contact.removeContact(currentUserId, contactId);
        return res.status(200).send({success: !!removeContact});
    } catch (error) {
        return res.status(500).send(error);
    }
}

let removeRequestContact = async (req, res) => {
    try {
        let currentUserId = req.user._id;
        let contactId = req.params.id;
        
        let removeReq = await contact.removeRequestContact(currentUserId, contactId);
        return res.status(200).send({success: !!removeReq});
    } catch (error) {
        return res.status(500).send("Server Error!");
    }
}

let removeRequestContactReceived = async (req, res) => {
    try {
        let currentUserId = req.user._id;
        let contactId = req.params.id;
        let removeReq = await contact.removeRequestContactReceived(currentUserId, contactId);
        return res.status(200).send({success: !!removeReq});
    } catch (error) {
        return res.status(500).send(error);
    }
}

let approveRequestContactReceived = async (req, res) => {
    try {
        let currentUserId = req.user._id;
        let contactId = req.body.uid;
        
        let approveReq = await contact.approveRequestContactReceived(currentUserId, contactId);
        return res.status(200).send({success: !!approveReq});
    } catch (error) {
        return res.status(500).send("Server Error!");
    }
}

let findUsersContact = async (req, res) => {
    let errorArr = [];
    let validationErrors = validationResult(req)
    
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach(item => {
            errorArr.push(item.msg)
        })
        //console.log(errorArr);
        return res.status(500).send(errorArr)
    }

    try {
        let currentUserId = req.user._id;
        let keyword = req.params.keyword;
        let users = await contact.findUsersContact(currentUserId, keyword);
        return res.status(200).send({users})

    } catch (error) {
        return res.status(500).send(error);
    }
}

let searchFriends = async (req, res) => {
    let errorArr = [];
    let validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach(item => {
            errorArr.push(item.msg)
        })
        console.log(errorArr);
        return res.status(500).send(errorArr)
    }

    try {
        let currentUserId = req.user._id;
        let keyword = req.params.keyword;
        let users = await contact.searchFriends(currentUserId, keyword);
        return res.status(200).send({users})
    } catch (error) {
        return res.status(500).send(error);
    }
}

let checkContact = async (req, res) => {
    try {
        let currentUserId = req.user._id;
        let contactId = req.params.id;
        let check = await contact.checkContact(currentUserId, contactId)
        return res.status(200).send(check)
    } catch (error) {
        return res.status(500).send("Error server");
    }
}

module.exports = {
    addNewContact: addNewContact,
    removeContact: removeContact,
    getContacts: getContacts,
    getContactsSent: getContactsSent,
    getContactsReceived: getContactsReceived,
    removeRequestContact: removeRequestContact,
    removeRequestContactReceived: removeRequestContactReceived,
    approveRequestContactReceived: approveRequestContactReceived,
    getContactsByIdUser: getContactsByIdUser,
    searchFriends: searchFriends,
    findUsersContact: findUsersContact,
    checkContact: checkContact,
}