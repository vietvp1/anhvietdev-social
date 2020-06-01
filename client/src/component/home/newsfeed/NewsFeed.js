import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios';
import PostForm from './PostForm'
import PostItem from './PostItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const NewsFeed = () => {
    const [news, setNews] = useState([]);
    useEffect(() => {
        let isSubscribed = true;
        axios.get('/post/get-all-posts').then(res => {
            if (isSubscribed) setNews(res.data)
        }).catch(error => console.log(error))
        return () => isSubscribed = false
    }, []);

    const updatePost = (newPost) => {
        setNews([newPost, ...news]);
    }

    const hidePost = (postId) => {
        setNews(news.filter(p => p._id !== postId));
    }

    return (
        <Fragment>
            <div className="col-sm-12">
                <PostForm updatePost={updatePost} />
            </div>
            <TransitionGroup>
                {
                    news.map((post, i) =>
                        <CSSTransition key={i} timeout={1000} classNames="fade">
                            <PostItem key={i} post={post} hidePost={hidePost} />
                        </CSSTransition>
                    )
                }
            </TransitionGroup>
        </Fragment>
    )
}

export default NewsFeed