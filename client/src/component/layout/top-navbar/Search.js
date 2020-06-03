import React, { useRef, useState, Fragment } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';

const Search = () => {
    const [text, setText] = useState('');
    const [users, setUsers] = useState([]);
    const [ShowContent, setShowContent] = useState(false);

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

    const onChange = async (e) => {
        setText(e.target.value);
        if (e.target.value === "") {
            setShowContent(false);
            setUsers([]);
        } else {
            const res = await axios.get(`/user/search-user/${e.target.value}`);
            if (res.data.success) {
                setUsers(res.data.users);
                handleClickResult();
            }
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
                                            <Fragment>
                                                <Link key={i} to={`/profile/${user._id}`} onClick={e => setShowContent(false)}>
                                                    <div className="user-finded">
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
                                    <div className="search_content">
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
