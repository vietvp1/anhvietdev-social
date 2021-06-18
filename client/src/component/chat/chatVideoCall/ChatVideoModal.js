import React, { useEffect, useState } from 'react'
import { Modal, ModalBody } from 'reactstrap';
import Swal from 'sweetalert2';
import Peer from 'peerjs';
import { useSelector } from 'react-redux';

const ChatVideoModal = ({user}) => {
    let socket = useSelector(state => state.master_data.socket);
    const [isOpen, setIsOpenVideoModal] = useState(false);
    const [stream, setStream] = useState(null);
    const [listener, setListener] = useState(null);
    const [caller, setCaller] = useState(null);

    function playVideoStream(videoTagId, stream) {
        let video = document.getElementById(videoTagId);
        video.srcObject = stream;
        video.onloadeddata = function () {
            video.play();
        }
    }
    function closeVideoStream(stream) {
        if (stream) {
            return stream.getTracks().forEach(track => track.stop());
        }
    }

    useEffect(() => {
        let peer = new Peer({
            key: "peerjs",
            secure: true,
            port: 443,
        });
        let getPeerId;
        peer.on("open", function (peerId) {
            getPeerId = peerId;
        })
        
        if(socket){
            let timerInterval;
            socket.on("server-send-listener-is-offline", function () {
                Swal.fire({
                title: 'Người dùng này hiện không trực tuyến.',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
                })
            })
            socket.on("server-request-peer-id-of-listener", function (response) {
                let dataToEmit = {
                    callerId: response.callerId,
                    listenerId: response.listenerId,
                    callerName: response.callerName,
                    listenerName: response.listenerName,
                    listenerPeerId: getPeerId,
                };
                // step 4 of listener
                socket.emit("listener-emit-peer-id-to-server", dataToEmit);
                setCaller(c => c={id: response.callerId, name: response.callerName})
                setListener(l => l={id: response.listenerId, name: response.listenerName})
            })
            .on("server-send-peer-id-of-listener-to-caller", function (response) {
                let dataToEmit = {
                    callerId: response.callerId,
                    listenerId: response.listenerId,
                    callerName: response.callerName,
                    listenerName: response.listenerName,
                    listenerPeerId: response.listenerPeerId,
                };
                setCaller({id: response.callerId, name: response.callerName})
                setListener({id: response.listenerId, name: response.listenerName})
                //step 6 of caller
                socket.emit("caller-request-call-to-server", dataToEmit);
                Swal.fire({
                title: `Đang gọi cho&nbsp;<span style="color: #2ECC71">${response.listenerName}</span>&nbsp;<i className="fas fa-phone-volume"></i>`,
                html: `
                        Thời gian: <strong style="color: #d43f3a"></strong> giây.<br/> <br/>
                `,
                backdrop: `
                    rgba(0,0,123,0.4)
                    url("https://sweetalert2.github.io/images/nyan-cat.gif")
                    left top
                    no-repeat
                `,
                timer: 30000,
                width: "52rem",
                allowOutsideClick: false,
                showCancelButton: true,
                cancelButtonColor: '#d33',
                cancelButtonText: 'Hủy cuộc gọi',
                onBeforeOpen: () => {
                    if (Swal.getContent().querySelector !== null) {
                        Swal.showLoading();
                        timerInterval = setInterval(() => {
                            Swal.getContent().querySelector("strong").textContent = Math.ceil(Swal.getTimerLeft()/1000);
                        }, 1000);
                    }
                },
                onOpen: () => {
                    //step 12 of caller
                    socket.on("server-send-reject-call-to-caller", function (response) {
                        Swal.close();
                        clearInterval(timerInterval);
                        Swal.fire({
                            icon: "info",
                            title: `<span style="color: #2ECC71">${response.listenerName}</span>&nbsp;hiện tại không thể nghe máy.`,
                            backdrop: "rgba(85, 85, 85, 0.4)",
                            width: "52rem",
                            allowOutsideClick: false,
                            confirmButtonColor: '#2ECC71',
                            confirmButtonText: 'Xác nhận',
                        });
                    })
                },
                onClose: () => {
                    clearInterval(timerInterval)
                }
                }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                }
                })
            })
            //step 8 of listener
            .on("server-send-request-call-to-listener", function (response) {
                let dataToEmit = {
                    callerId: response.callerId,
                    listenerId: response.listenerId,
                    callerName: response.callerName,
                    listenerName: response.listenerName,
                    listenerPeerId: response.listenerPeerId,
                };
                Swal.fire({
                    title: `<span style="color: #2ECC71">${response.callerName}</span>&nbsp;muốn trò chuyện video với bạn. <i className="fas fa-phone-volume"></i>`,
                    html: `
                            Thời gian: <strong style="color: #d43f3a"></strong> giây.<br/> <br/>
                    `,
                    backdrop: `
                        rgba(0,0,123,0.4)
                        url("https://sweetalert2.github.io/images/nyan-cat.gif")
                        left top
                        no-repeat
                    `,
                    timer: 30000,
                    showCancelButton:true,
                    cancelButtonColor: '#d33',
                    allowOutsideClick: false,
                    width: "52rem",
                    cancelButtonText:'Từ chối',
                    confirmButtonText:'Đồng ý',
                    onBeforeOpen: () => {
                        //Swal.showLoading()
                        timerInterval = setInterval(() => {
                          const content = Swal.getContent()
                          if (content) {
                            const b = content.querySelector('strong')
                            if (b) {
                              b.textContent = Math.ceil(Swal.getTimerLeft()/1000);
                            }
                          }
                        }, 100)
                    },
                    onOpen: () => {
                        //step 9 of listener
                        socket.on("server-send-cancel-call-to-listener", function (response) {
                            Swal.close();
                            clearInterval(timerInterval);
                        })
                    },
                    onClose: () => {
                        clearInterval(timerInterval);
                    },
                }).then((result) => {
                    if (result.value) {
                    Swal.close();
                    clearInterval(timerInterval);
                    //step 11 of listener 
                    socket.emit("listener-accept-request-call-to-server", dataToEmit);
                    } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                    ) {
                    Swal.close();
                    clearInterval(timerInterval);
                    //step 10 of listener 
                    socket.emit("listener-reject-request-call-to-server", dataToEmit);
                    }
                })
            })
            //step 13 of caller
            .on("server-send-accept-call-to-caller", function (response) {
                Swal.close();
                clearInterval(timerInterval);
                let getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);
                getUserMedia({video: true, audio: true}, function(stream) {
                    setStream(stream);
                    setIsOpenVideoModal(true)
                    console.log("caller okee...");
                    //play my stream in local(of caller)
                    playVideoStream("local-stream", stream)
                    //call to listener
                    let call = peer.call(response.listenerPeerId, stream);
                    //listen & play stream of listener
                    call.on('stream', function(remoteStream) {
                        //play stream of listener
                        playVideoStream("remote-stream", remoteStream)
                    });
                    
                }, function(err) {
                    if (err.toString() === "NotAllowedError: Permission denied") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Xin lỗi, bạn đã tắt quyền truy cập thiết bị camera.',
                        timer: 3000,
                    })
                    }
                    if (err.toString() === "NotAllowedError: Requested device not found") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Xin lỗi, chúng tôi không tìm thấy thiết bị nghe gọi trên máy tính của bạn.',
                        timer: 3000,
                    })
                    }
                });
            })
            //step 14
            .on("server-send-accept-call-to-listener", function (response) {
                Swal.close();
                clearInterval(timerInterval);
                setIsOpenVideoModal(true);
                let getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);
                peer.on("call", function(call) {
                    getUserMedia({video: true, audio: true}, function(stream) {
                        setStream(stream);
                        console.log("listener okee...");
                        //play my stream in local(of listener)
                        playVideoStream("local-stream", stream)
                        call.answer(stream); // Answer the call with an A/V stream.
                        call.on("stream", function(remoteStream) {
                            //play stream of caller
                            playVideoStream("remote-stream", remoteStream)
                        });
                    }, function(err) {
                        if (err.toString() === "NotAllowedError: Permission denied") {
                            Swal.fire({
                            icon: 'error',
                            title: 'Xin lỗi, bạn đã tắt quyền truy cập thiết bị camera.',
                            timer: 3000,
                            })
                        }
                        if (err.toString() === "NotAllowedError: Requested device not found") {
                            Swal.fire({
                            icon: 'error',
                            title: 'Xin lỗi, chúng tôi không tìm thấy thiết bị nghe gọi trên máy tính của bạn.',
                            timer: 3000,
                        })
                    }
                    });
                });
            })

            return () => {
                socket.off("server-send-listener-is-offline");
                socket.off("server-request-peer-id-of-listener");
                socket.off("server-send-peer-id-of-listener-to-caller");
                socket.off("server-send-request-call-to-listener");
                socket.off("server-send-accept-call-to-caller");
                socket.off("server-send-accept-call-to-listener");
                peer.off("call");
            }
        }
    }, [socket, stream]);

    useEffect(() => {
        if (socket&& caller && stream && listener) {
            socket.on('response-user-hangup', (data) => {
                setIsOpenVideoModal(false);
                closeVideoStream(stream);
                setListener(null);
                setCaller(null);
                setStream(null);
                Swal.fire({
                    icon: 'info',
                    title: `Đã kết thúc cuộc trò chuyện với ${data.userId === listener.id? caller.name : listener.name}!`,
                    timer: 3000,
                })
            })
            return () => {
                socket.off("response-user-hangup");
            }
        }
    },[socket, stream, caller, listener])


    const toggle = () => {
        setIsOpenVideoModal(!isOpen);
    }

    const toggleMediaDevice = (type) => {

    }
    
    const endCall = () => {
        socket.emit('user-hangup', {userIds: [listener.id , caller.id]});
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} className="modal-videocall">
            <ModalBody>
                <video id="remote-stream" autoPlay />
                <video id="local-stream" autoPlay  muted/>
                
                <div className="video-control">
                    <button className="toggle-video">
                        <i className="fas fa-video" onClick={() => toggleMediaDevice('video')}></i>
                    </button>
                    <button className="toggle-mic">
                        <i className="fas fa-microphone" onClick={() => toggleMediaDevice('audio')}></i>
                    </button>
                    <button className="hangup">
                        <i className="fas fa-phone" onClick={endCall}></i>
                    </button>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default ChatVideoModal
