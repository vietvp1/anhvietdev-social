import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import axios from 'axios';
import { addFriend } from '../../actions/contact';

const FriendRequest = () => {
  const ContactReceived = useSelector(state => state.contact.contactsReceived);
  const socket = useSelector(state => state.master_data.socket);
  const dispatch = useDispatch();
  const [usersSuggestion, setUsersSuggestion] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    axios.get('/user/get-random-user-to-addfriend').then(res => {
      if (isSubscribed) {
        setUsersSuggestion(res.data.users);
      }
    })
    return () => isSubscribed = false;
  }, [])

  const onDeleteSuggestUser = (userId) => {
    setUsersSuggestion(usersSuggestion.filter(user => user._id !== userId));
  }

  const addFriendClick = (user) => {
    dispatch(addFriend(user, socket));
    setUsersSuggestion(usersSuggestion.filter(userSuggest => userSuggest._id !== user._id));
  }

  return (
    <Fragment>
      <div id="content-page" className="content-page">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">Yêu cầu kết bạn</h4>
                  </div>
                </div>
                <div className="iq-card-body">
                  <ul className="request-list list-inline m-0 p-0">
                    {
                      ContactReceived.map((user, i) => (
                        <li key={i} className="d-flex align-items-center">
                          <div className="user-img img-fluid">
                            <Link to={`/profile/${user._id}`}>
                              <img src={`${process.env.REACT_APP_UPLOADS_IMG}/${user.avatar}`} alt="story-img" className="rounded-circle avatar-40" />
                            </Link>
                          </div>
                          <div className="media-support-info ml-3">
                            <Link to={`/profile/${user._id}`}>
                              <h6>{user.firstName} {user.lastName}</h6>
                              <p className="mb-0">40  friends</p>
                            </Link>
                          </div>
                          <div className="d-flex align-items-center">
                            <a href="/#" className="mr-3 btn btn-primary rounded">Xác nhận</a>
                            <a href="/#" className="mr-3 btn btn-secondary rounded">Xóa yêu cầu</a>
                          </div>
                        </li>
                      ))
                    }
                    {
                      ContactReceived.length > 0 ?
                        <li className="d-block text-center">
                          <a href="/#" className="btn btn-request">View More Request</a>
                        </li> :
                        <p className="text-center text-white">Không có yêu cầu kết bạn nào!</p>
                    }
                  </ul>
                </div>
              </div>
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">Những người bạn có thể biết</h4>
                  </div>
                </div>
                <div className="iq-card-body">
                  <ul className="request-list m-0 p-0">
                    {
                      usersSuggestion.map((user, i) =>
                        <li key={i} className="d-flex align-items-center">
                          <div className="user-img img-fluid"><img src={`${process.env.REACT_APP_UPLOADS_IMG}/${user.avatar}`} alt="story-img" className="rounded-circle avatar-40" /></div>
                          <div className="media-support-info ml-3">
                            <h6>{user.firstName} {user.lastName} </h6>
                            <p className="mb-0">4  Bạn bè</p>
                          </div>
                          <div className="d-flex align-items-center">
                            <span className="mr-3 btn btn-primary rounded"
                              onClick={() => addFriendClick(user)}>
                              Thêm bạn
                            </span>
                            <span className="mr-3 btn btn-secondary rounded" onClick={() => onDeleteSuggestUser(user._id)}>Xóa</span>
                          </div>
                        </li>
                      )
                    }

                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  )
}

export default FriendRequest
