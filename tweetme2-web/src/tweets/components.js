import React, { useEffect, useState } from 'react'

import { loadTweets } from "../lookup"

export function TweetList() {
    const [tweets, setTweets] = useState([])

    useEffect(() => {
        const myCallBack = (response, status) => {
            if (status === 200) {
                setTweets(response)
            } else {
                alert("There was an error")
            }
        }
        loadTweets(myCallBack)
    }, [])

    return tweets.map((item, idx) => {
        return (
            <Tweet tweet={item} className="my-5 py-5 border bg-dark text-light" key={idx} />
        )
    })
}


export function Tweet(props) {
    const { tweet } = props;
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6';
    return (
        <div className={className}>
            <p>{tweet.content}</p>
            <div className="btn btn-group">
                <ActionBtn tweet={tweet} action={{ type: 'like', display: 'Likes' }} />
                <ActionBtn tweet={tweet} action={{ type: 'unlike', display: 'Unlike' }} />
                <ActionBtn tweet={tweet} action={{ type: 'retweet', display: 'Retweet' }} />
            </div>
        </div>
    )
}


export function ActionBtn(props) {
    const { tweet, action } = props
    const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0)
    const [userLike, setUserike] = useState(tweet.userLike === true ? true : false)
    const className = props.className ? props.className : "btn btn-primary bt-sm"
    const actionDisplay = action.display ? action.display : 'Action'
    const display = action.type === 'like' ? `${likes} ${actionDisplay}` : actionDisplay
    const handleClick = (event) => {
        event.preventDefault()
        if (action.type === 'like') {
            if (userLike === true) {
                setUserike(false)
                setLikes(likes - 1)
            } else {
                setUserike(true)
                setLikes(likes + 1)
            }
        }
    }
    return (
        <button className={className} onClick={handleClick}>
            {display}
        </button>
    )
}


