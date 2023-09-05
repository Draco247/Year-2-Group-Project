import { Link } from "react-router-dom";
import "./topbar.css";
import React from "react";
import home from "./home.png"
import posts from "./posts.png"
import logout from "./logout.png"
import register from "./register.png"
import login from "./login.png"
import profile from "./profile.png"
import privatem from "./privatem.png"

export default function TopBar(props) {
    // const { user, dispatch } = useContext(Context);
    const setLoggedinUser = props.setLoggedinUser;
    const loggedInUser = props.loggedInUser;

    const user = sessionStorage.getItem('current_user');


    return (
        <div className="top">
            <div className="topLeft">
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <img src={home} alt="Logo" />
                        <Link to={'/'} className='toplink'>Home</Link>
                    </li>
                    <li className="topListItem">
                        <img src={posts} alt="Logo" />
                        <Link to={'/Posts'} className='toplink'>Posts</Link>
                    </li>
                    <li className="topListItem">
                        <img src={logout} alt="Logo" />
                        <Link to={'/Logout'} className='toplink'>Logout</Link>
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {loggedInUser ? (
                    <ul className="topList">
                        <li className="topListItem">
                            <img src={profile} alt="Logo" />
                            <Link to={'/Profile'} className='toplink'>Profile</Link>
                        </li>
                        <li className="topListItem">
                            <img src={privatem} alt="Logo" />
                            <Link to={'/PrivateMessages'} className='toplink'>Private Messages</Link>
                        </li>
                        <li className="topListItem">
                            <img src={privatem} alt="Logo" />
                            <Link to={'/MessageBoard'} className='toplink'>Message Board</Link>
                        </li>
                    </ul>

                    ) : (
                    <ul className="topList">
                        <li className="topListItem">
                            <img src={register} alt="Logo" />
                            <Link to={'/Register'} className='toplink'>Register</Link>
                        </li>
                        <li className="topListItem">
                            <img src={login} alt="Logo" />
                            <Link to={'/Login'} className='toplink'>Login</Link>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
}
