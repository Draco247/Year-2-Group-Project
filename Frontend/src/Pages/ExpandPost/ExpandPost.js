import PostDetails from "../../Components/PostDetails/PostDetails";
import "./expandPost.css";
import React, {useEffect} from "react";
import axios from "axios";

export default function ExpandPost(props) {

    const setLoggedinUser = props.setLoggedinUser;
    const loggedInUser = props.loggedInUser;

    const user = sessionStorage.getItem('current_user');

    // const loggedInUser = user;

    if (loggedInUser==="" && user ==="") {
        return <div>
            <p>Hello guest user</p>
            <div className="expandPost">
                <PostDetails />
            </div>
        </div>;

    }

    if (loggedInUser==="" && user !== "")
    {
        setLoggedinUser(user);
        return <div>
            <p>Welcome {loggedInUser}</p>
            <div className="expandPost">
                <PostDetails loggedInUser={loggedInUser} />
            </div>
        </div>;
    }

    else{
        return <div>
            <p>Welcome {loggedInUser}</p>
            <div className="expandPost">
                <PostDetails />
            </div>
        </div>;
    }
}