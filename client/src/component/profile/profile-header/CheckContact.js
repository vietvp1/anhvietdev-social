import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { approveContact, rejectContact, unfriend, removeRequestContact, addFriend } from '../../../actions/contact';
import axios from 'axios'
import { Link } from 'react-router-dom';

const CheckContact = ({user}) => {
    const socket = useSelector(state => state.master_data.socket);
    const dispatch = useDispatch();
    const [checkContact, setCheckContact] = useState(null);
    useEffect(() => {
        let isSubscribed = true;
        axios.get(`/contact/check-contact/${user._id}`).then(res => {
            if(isSubscribed) setCheckContact(res.data);
        });
        return () => isSubscribed = false
    },[user._id])

    const approveClick = async (e) => {
        e.preventDefault();
        dispatch(approveContact(user, socket))
        setCheckContact('contactExists');
    }

    const rejectClick = async (e) => {
        e.preventDefault();
        dispatch(rejectContact(user, socket));
        setCheckContact('contactNotExists')
    }

    const unfriendClick = (e) => {
        e.preventDefault();
        Swal.fire({
            title: `Bạn có chắc muốn hủy bạn bè với ${user.firstName} ${user.lastName}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        }).then(async (result) => {
            if (result.value) {
                dispatch(unfriend(user, socket));
                setCheckContact('contactNotExists');
            }
        })
    }

    const removeRequestClick = async (e) => {
        e.preventDefault();
        dispatch(removeRequestContact(user, socket));
        setCheckContact('contactNotExists')
    }

    const addFriendClick = async () => {
        dispatch(addFriend(user, socket));
        setCheckContact('isSent')
    }

    const display = () => {
        switch (checkContact) {
            case 'isReceived':
                return (
                    <li className="dropdown">
                        <span data-toggle="dropdown" className="dropdown-toggle" title="Chấp nhận kết bạn">
                            <i className="fal fa-handshake"/>
                        </span>
                        <div className="dropdown-menu dropdown-menu-right">
                            <div onClick={approveClick} className="dropdown-item"><i className="fal fa-user-check"/> Chấp nhận</div>
                            <div onClick={rejectClick} className="dropdown-item"><i className="fal fa-user-times"/> Từ chối</div>
                        </div>
                    </li>
                );
            case 'isSent':
                return (
                    <li onClick={removeRequestClick} title="Hủy yêu cầu kết bạn">
                        <span><i className="fal fa-user-times"/></span>
                    </li>
                );
            case 'contactNotExists':
                return (
                    <li onClick={addFriendClick} title="Thêm bạn">
                        <span><i className="fal fa-user-plus"/></span>
                    </li>
                );
            case 'contactExists':
                return (
                    <li className="dropdown">
                        <span data-toggle="dropdown" className="dropdown-toggle" title="Bạn bè">
                            <i className="fal fa-user-check"/>
                        </span>
                        <div className="dropdown-menu dropdown-menu-right">
                            <div className="dropdown-item"><i className="fal fa-star"></i> Bạn thân</div>
                            <div onClick={unfriendClick} className="dropdown-item"><i className="fal fa-user-minus"></i> Hủy bạn bè</div>
                            <div className="dropdown-item"><i className="fal fa-user-slash"></i> Chặn</div>
                        </div>
                    </li>
                )
            default:
                break;
        }
    }
    return (
        <ul className="header-nav d-flex flex-wrap justify-end p-0 m-0">
            {display()}
            <li title="Nhắn tin">
                <span>
                    <Link to={`/chat/${user._id}`}>
                        <i className="fal fa-envelope-open-text"/>
                    </Link>
                </span>
            </li>
            <li className="dropdown">
                <span data-toggle="dropdown" className="dropdown-toggle" title="Theo dõi">
                    <i className="fal fa-eye"></i>
                </span>
                <div className="dropdown-menu dropdown-menu-right">
                    <div className="dropdown-item"><i className="fal fa-eye-slash"></i> Bỏ theo dõi</div>
                </div>
            </li>
        </ul>
    )
}

export default CheckContact