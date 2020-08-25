import React, { useState, useRef, useEffect } from 'react'
import FlipMove from 'react-flip-move';
import { updateMessages } from '../../actions/conversation';
import { useDispatch, useSelector } from 'react-redux';
import {readFile, maxSelectFile, checkFileSize, checkFilesQuantity, lastItemOfArray} from '../../clientHelper/helperClient'
import {imgType, videoType} from "../../clientHelper/mimeType"
import { MOVE_CONVERSATIONS, ADD_CONVERSATIONS } from '../../actions/types';
import axios from "axios"
import TextareaAutosize from 'react-autosize-textarea';
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
// import ChatVideoCall from './chatVideoCall/ChatVideoCall';

const ChatBoxInput = ({conversation, setNewConver}) => {
    let socket = useSelector(state => state.master_data.socket);
    let user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const node1 = useRef();
    const [text, setText] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);
    const [pictures, setPictures] = useState([]);
    const [file, setFile] = useState([]);
    const [preview, setPreview] = useState(false);
    const [isMounted, setIsMounted] = useState(true);
    
    useEffect(() => {
        return () => setIsMounted(false);
    },[])
    
    const handleClickMess = () => {
        if (!showEmoji) {
          setShowEmoji(true);
          document.addEventListener('click', handleOutsideClickMess);
        } else {
          setShowEmoji(false);
          document.removeEventListener('click', handleOutsideClickMess);
        }
    }

    const handleOutsideClickMess = (e) => {
        if (!node1.current) {
            return
        }
        if (!node1.current.contains(e.target)) {
            setShowEmoji(false);
        }
    }
      
    const onDropFile = (e) => {
        const files = e.target.files;
        const allFilePromises = [];
        if(maxSelectFile(e) && checkFilesQuantity(e, file)&& checkFileSize(e)){

            for (let i = 0; i < files.length; i++) {
            let file = files[i];
            allFilePromises.push(readFile(file));
            }

            Promise.all(allFilePromises).then(newFilesData => {
            const dataURLs = pictures.slice();
            const Files = file.slice();
        
            newFilesData.forEach(newFileData => {
                let isImage = true;
                //const types = ['image/png', 'image/jpeg', 'image/gif','video/mp4', 'video/x-ms-wmv', 'video/quicktime']
                const types = imgType.concat(videoType);
                if (types.every(type => newFileData.file.type !== type)) {
                    isImage = false;
                }

                dataURLs.push({dataURL: newFileData.dataURL, isImage: isImage, name: newFileData.file.name});
                Files.push(newFileData.file);
            });
            setPictures(dataURLs);
            setFile(Files)
            });
            setPreview(true);
        }
    }
    
    const renderPreview = () => {
        return (
            <div className="fileContainer-message" >
                <FlipMove enterAnimation="fade" leaveAnimation="fade" className="flipMove">
                    {renderPreviewPictures()}
                </FlipMove>
            </div>
        );
    }

    const renderPreviewPictures = () => {
        return pictures.map((picture, index) => {
          return (
            <div key={index} className="uploadPictureContainer">
                <div className="deleteImage" onClick={() => removeImage(picture)}><i className="fas fa-times" /></div>
                {(picture.isImage)? (<img src={picture.dataURL} className="uploadPicture" alt="preview"/>):(
                    <div className="preview-file">
                        <div><i className="fad fa-file-alt"></i></div>
                        <div className="preview-file-name text-overflow-three-dot">{picture.name}</div>
                    </div>
                )}
            </div>
          );
        });
    }

    const removeImage = (picture) => {
        const removeIndex = pictures.findIndex(e => e === picture);
        const filteredPictures = pictures.filter((e, index) => index !== removeIndex);
        const filteredFiles = file.filter((e, index) => index !== removeIndex);
        setPictures(filteredPictures);
        setFile(filteredFiles);
        if (pictures.length <= 1) {
            setPreview(false);
        }
    }
    
    const onUploadClick = (e) => {
        e.target.value = null;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        let isChatGroup, isCurrent;
        (conversation.members)? isChatGroup = true : isChatGroup = false;
        (conversation.createdAt)? isCurrent = true : isCurrent = false;
        if (text) {
            axios.post('/message/add-new-text-emoji', {
                text: text, 
                receivedId: (isChatGroup)?conversation._id:conversation.userChat._id, 
                isChatGroup: isChatGroup, 
                isCurrent: isCurrent
            }).then(res => { 
                if(isMounted){
                    if (!isCurrent) {
                        conversation = Object.assign(conversation, res.data.newConversation)
                        dispatch({
                            type: ADD_CONVERSATIONS,
                            payload: conversation
                        });
                        if (setNewConver) {
                            setNewConver(null)
                        }
                    }
                    
                    let data = {
                        idConversation: conversation._id,
                        payload: res.data.message,
                    }
                    
                    dispatch(updateMessages(data))
                    dispatch({
                        type: MOVE_CONVERSATIONS,
                        payload: conversation._id
                    });
                    
                    let dataToEmit = data;
                    
                    (isChatGroup)? dataToEmit.groupId = conversation._id : dataToEmit.contactId = conversation.userChat._id;

                    socket.emit("chat-text-emoji", dataToEmit);
                }
            })
        }
        else{
            let formData = new FormData();
            const config = {
                header: { 'content-type': 'multipart/form-data' }
            }
            if (file.length> 0) {
                for(var x = 0; x < file.length; x++) {
                    formData.append("file", file[x]);
                }
            }
            formData.append("isChatGroup", isChatGroup);
            formData.append("receivedId", (isChatGroup)?conversation._id:conversation.userChat._id);
            formData.append("isCurrent", isCurrent);
            axios.post('/message/add-new-image', formData, config).then(res => {
                if(isMounted){
                    if (!isCurrent) {
                        conversation = Object.assign(conversation, res.data.newConversation)
                        dispatch({
                            type: ADD_CONVERSATIONS,
                            payload: conversation
                        });
                        if (setNewConver) {
                            setNewConver(null)
                        }
                    }
                    let data = {
                        idConversation: conversation._id,
                        payload: res.data.message,
                    }
                    dispatch(updateMessages(data))
                    dispatch({
                        type: MOVE_CONVERSATIONS,
                        payload: conversation._id
                    });
                    
                    let dataToEmit = data;
                    (isChatGroup)? dataToEmit.groupId = conversation._id : dataToEmit.contactId = conversation.userChat._id;

                    socket.emit("chat-file", dataToEmit);
                }
            });
        }
        setText('');
        setPictures([]);
        setPreview(false);
        setFile([]);
    }

    const onChangeEmoji = (e) => {
        let emoji = e.native;
        setText(text + emoji);
    }

    const onChangeText = (e) => {
        setText(e.target.value);
    }

    const onFocus = () => {
        let data = {
            contactId: conversation.userChat ? conversation.userChat._id : false,
            avatar: user.avatar,
            groupId: conversation.members ? conversation._id : false
        }
        socket.emit('user-is-typing', data);
    }

    const onClickInput = async () => {
        if (!lastItemOfArray(conversation.messages).isReaded && lastItemOfArray(conversation.messages).receiver === user._id) {
            const res = await axios.put("/message/mark-as-read", {messageId: lastItemOfArray(conversation.messages)._id});
            if (res.data.success) {
                let data = {
                    conversationId: conversation._id,
                    messageId: res.data.message._id,
                    time: res.data.message.updatedAt
                }
                dispatch({
                    type: 'MARK_AS_READ_MESSAGE',
                    payload: data
                });
                socket.emit('user-mark-readed-mess', {
                    data, 
                    contactId: conversation.userChat ? conversation.userChat._id : false,
                    groupId: conversation.members ? conversation._id : false
                });
            }
        }
    }

    const onBlur = () => {
        let data = {
            contactId: conversation.userChat ? conversation.userChat._id : false,
            groupId: conversation.members ? conversation._id : false
        }
        socket.emit('user-is-not-typing',data)
    }


    return (
        <div className="write">
            {preview ? renderPreview() : null }
            <TextareaAutosize
                maxRows={1}
                className="write-chat"
                onChange={onChangeText} 
                value={text}
                onClick={onClickInput}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder="Nhập văn bản..."
                onKeyPress={event =>  event.key === "Enter" ? onSubmit(event): null}
            />

            <div className="icons">
                <div className="icon-chat" ref={node1}>
                    <i onClick={handleClickMess} className="fal fa-laugh-wink"></i>
                    {
                        showEmoji? <div className="mess-input-picker"><Picker onSelect={onChangeEmoji} darkMode={true}/> </div>: null
                    }
                </div>

                <div htmlFor="image-chat">
                    <label>
                        <input type="file" 
                            id="image-chat" 
                            onChange={onDropFile} multiple
                            onClick={onUploadClick} className="image-chat"/>
                        <i className="fal fa-photo-video"></i>
                    </label>
                </div>
                {/* <ChatVideoCall conversation={conversation}/> */}
                <div className="btn-send-message" onClick={onSubmit}>
                    <i className="fal fa-paper-plane"></i>
                </div>
                
            </div>
        </div>
    )
}

export default ChatBoxInput