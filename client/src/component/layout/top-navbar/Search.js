import React, { useRef, useState, Fragment } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';

const Search = () => {
    const [text, setText] = useState('');
    const [users, setUsers] = useState([]);
    const [ShowContent, setShowContent] = useState(false);
    const typingTimeoutRef = useRef(null);

    const node = useRef();
    const handleClickResult = () => {
        if (!ShowContent) {
            setShowContent(true);
            document.addEventListener('click', handleOutsideClickResult);
        } else {
            document.removeEventListener('click', handleOutsideClickResult);
        }
    }
    const handleOutsideClickResult = (e) => {
        if (!node.current) {
            return
        }
        if (!node.current.contains(e.target)) {
            setShowContent(false);
        }
    }

    const onChange = (e) => {
        const value = e.target.value;
        setText(value);
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        if (value === "") {
            setShowContent(false);
            setUsers([]);
        } else {
            typingTimeoutRef.current = setTimeout(async () => {
                const res = await axios.get(`/user/search-user/${value}`);
                if (res.data.success) {
                    setUsers(res.data.users);
                    handleClickResult();
                }
            }, 400)
        }
    }

    const onSubmit = async (e) => {
        const res = await axios.get(`/user/search-user/${text}`);
        if (res.data.success) {
            handleClickResult();
        }
    }

    return (
        <div className="iq-search-bar">
            <div className="searchbox">
                <input
                    type="text"
                    className="text search-input"
                    placeholder="Tìm kiếm..."
                    onChange={onChange}
                    onKeyPress={e => e.key === "Enter" ? onSubmit() : null}
                />
                <span className="search-link"><i className="far fa-search" /></span>
            </div>

            {
                ShowContent ? (
                    <div className="search-results">
                        {
                            users.length > 0 ? (
                                <div className="search_content">
                                    {
                                        users.map((user, i) => (
                                            <Fragment key={i}>
                                                <Link key={i} to={`/profile/${user._id}`} onClick={e => setShowContent(false)}>
                                                    <div className="user-finded iq-bg-primary-hover">
                                                        <img
                                                            src={`${process.env.REACT_APP_UPLOADS_IMG}/${user.avatar}`}
                                                            alt=''
                                                            className="avatar-40 rounded mr-2 ml-2"
                                                        />
                                                        {user.firstName}&nbsp;{user.lastName}
                                                    </div>
                                                </Link>
                                            </Fragment>
                                        ))
                                    }
                                </div>
                            ) : (
                                    <div className="search_content ml-3">
                                        Chúng tôi không thể tìm thấy bất cứ kết quả nào cho {text}
                                    </div>
                                )
                        }

                    </div>
                ) : null
            }
        </div>
    )
}

export default Search
