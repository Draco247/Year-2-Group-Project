import {Link, useLocation} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";
import "./comments.css"
import * as ReactBootStrap from "react-bootstrap";


export default function Comments({comments}) {
    const loggedInUser = sessionStorage.getItem("current_user")
    const loc = useLocation()
    const id = loc.pathname.split('/')[2]
    const [content, setcontent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit= async (event)=>{
        event.preventDefault();
        const jwt = sessionStorage.getItem('jwt');
        // setRedirect(true);
        const newComment = {
            username : loggedInUser,
            content,

        };

        const config3 = {
            method : 'post',
            url : '/comments/comment/' + id,
            headers: {"Authorization" : `Bearer ${jwt}`},
            data: newComment
        }


        try {
            const res = await axios (config3)
            window.location.replace("/post/" + id)
        } catch (error) {}

    }

    return (
        <div className="comments">
                {comments.map((item, index) => (
                    <div className="user">
                        <p>{item.user.username}</p>
                        <div className="comment">
                            <p>{item.content}</p>
                        </div>
                    </div>
                    // <p>{item.content} , {item.user.username}</p>
                ))}
            <div className="new_comment">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Enter comment" onChange={event=>setcontent(event.target.value)}/>
                    <button className="commentSubmit" type="submit">
                        Publish
                    </button>
                </form>
            </div>
        </div>

    );
}