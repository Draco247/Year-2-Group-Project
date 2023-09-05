import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "./postdetails.css"
import Comments from '../Comments/Comments'
import {Link, useLocation} from "react-router-dom";
import { FaPen, FaTrash } from "react-icons/fa";
import * as ReactBootStrap from "react-bootstrap";

export default function PostDetails(props) {
    const loggedInUser = props.loggedInUser;

    const loc = useLocation()
    console.log(loc.pathname.split('/')[2])
    const id = loc.pathname.split('/')[2]
    const [posts, setposts] = useState([]);
    const [comments, setcomments] = useState([]);
    const [update, setUpdate] = useState(false);
    const [postName, setpostName] = useState("");
    const [description, setdescription] = useState("");
    const [loading, setLoading] = useState(false);


    const jwt = sessionStorage.getItem('jwt');


    const getpost = {
        method : 'get',
        url : '/posts/post/' + id,
        headers: {"Authorization" : `Bearer ${jwt}`},
    }
    const getcomments = {
        method : 'get',
        url : '/comments/comment/' + id,
        headers: {"Authorization" : `Bearer ${jwt}`},
    }

    const editPost = {
        postName,
        description,
    };

    const editpost = {
        method : 'put',
        url : '/posts/post/' + id,
        headers: {"Authorization" : `Bearer ${jwt}`},
        data : editPost,
    }



    const deletepost = {
            method : 'delete',
            url : '/posts/delete/' + id,
            headers: {"Authorization" : `Bearer ${jwt}`},
        }


    const handleDelete = async () => {
        try {
            await axios(deletepost)
            window.location.replace("/Posts");
            // window.location.replace("/post/" + res.data.postId)
        } catch (err) {}
    };

    const handleUpdate = async () => {
        try {
            await axios(editpost)
            setUpdate(false)
            window.location.replace("/post/" + id)
        } catch (err) {}
    };

    const cancelUpdate = async () => {
        setUpdate(false)
    }

    useEffect(() => {

        const fetch = async () => {
            const res = await axios(getpost)
            setposts(res.data);
            const res1 = await axios(getcomments)

            setcomments(res1.data);
            setLoading(true);

        };
        fetch();

    },[id])


    return (
        <div className="postDetails">
            {loading ? (
                <div className="postDetailsWrapper">
               <h1 className="postTitle">
                        {posts.postName}
                        {posts.user.username === sessionStorage.getItem("current_user") && (
                            <div className="postEdit">
                                <i onClick={handleDelete}> <FaTrash/> Delete Post </i>
                                <i onClick={() => setUpdate(true)}> <FaPen/> Edit Post</i>
                            </div>
                        )}
                    </h1>
                <div className="postInfo">
                    <span className="postAuthor">
                        Author:
                        <Link to={`/posts/?user=${posts.user.username}`} className="link">
                            <b> {posts.user.username} </b>
                        </Link>
                    </span>
                    <span>
                        {new Date(posts.createdDate * 1000).toDateString()}
                    </span>
                </div>
                {update ? (
                    <textarea
                        className="editpostDescInput"
                        value={description}
                        onChange={(e) => setdescription(e.target.value)}
                    />
                ) : (
                    <p className="postDesc">{posts.description}</p>
                )}
                {update && (
                    <button className="editpostButton" onClick={handleUpdate}>
                        Update
                    </button>

                )}
                {update && (
                    <button className="canceleditButton" onClick={cancelUpdate}>
                        Cancel
                    </button>

                )}
                    <div className="commentsection">
                        <Comments comments={comments}/>
                    </div>

            </div>) : (
                <ReactBootStrap.Spinner animation="border"/>
            )}
        </div>
    );
}
