import "./profile.css";
import React, {useEffect, useState} from 'react';
import axios from "axios";
import { FaPen, FaTrash } from "react-icons/fa";

export default function Profile(props) {
    const loggedInUser = props.loggedInUser;
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reppassword, setreppassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [changed, setchanged] = useState(false);
    const [output, setOutput] = useState("");

    const jwt = sessionStorage.getItem('jwt');

    const config = {
        method : 'get',
        url : '/user?username=' +loggedInUser,
        headers: {"Authorization" : `Bearer ${jwt}`},
    }

    const updated = {
        username,
        email,
        password,
    };

    const config2 = {
        method : 'put',
        url : '/user/' +loggedInUser,
        headers: {"Authorization" : `Bearer ${jwt}`},
        data : updated,
    }

    const validateForm=()=>{
        var mailformat = /\S+@\S+\.\S+/;
        var valid = false;

        if(username.length > 50){
            setOutput("Username cannot be longer than 50 characters");
        }else if(!mailformat.test(email)){
            setOutput("Invalid e-mail address. Please enter your e-mail again.");
        }else if(password!== "" && password.length<8){
            setOutput("Validation failure: Password is too short. Please select another password");
        }else{
            valid = true;
        }
        return valid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()){
            try{
                console.log("tttt");
                setRedirect(true);
                const res = await axios(config2);
                setchanged(true);
                setTimeout(function(){

                    sessionStorage.clear();
                    window.location.replace("/login");
                },3000);
            } catch (err){
                setOutput("Username and/or email is taken")
            }

        }

        // if (password !== "" && password.length>=8)
        // {
        //
        // }





        // try {
        //
        //     setSuccess(true);
        //     dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        // } catch (err) {
        //     dispatch({ type: "UPDATE_FAILURE" });
        // }
    };


    useEffect(() => {
        const fetch = async () => {
            const res = await axios(config)
            setUsername(res.data.username);
            setEmail(res.data.email);

        };
        fetch();

    },[])

    return (
        <div className="profile">
            <div className="profileWrapper">
                <div className="profileTitle">
                    <span className="profileChange">Change Your Profile Details</span>
                    {/*<br/>*/}
                    {/*<span className="profileDelete">Delete Account <FaTrash/></span>*/}
                </div>
                <form className="profileForm" onSubmit={handleSubmit}>
                    <label>Username: </label>
                    <input type="text" placeholder={username} name="name" onChange={(e) => setUsername(e.target.value)} />
                    <label>Email: </label>
                    <input type="email" placeholder={email} name="email" onChange={(e) => setEmail(e.target.value)}/>
                    <label>Password: </label>
                    <input type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                    {/*<label>Repeat Password: </label>*/}
                    {/*<input type="password" placeholder="Password" name="password" onChange={(e) => setreppassword(e.target.value)}/>*/}
                    <br/>
                    <button className="ProfileSettingsSubmitButton" type="submit" >
                        Change
                    </button>
                    {changed && (
                        <span
                            style={{ color: "green", textAlign: "center", marginTop: "20px" }}
                        >Profile has been updated. Redirecting to Login Page..
                        </span>
                    )}
                    <div className="responsebox">
                        <p>{output}</p>
                    </div>
                </form>
            </div>
        </div>
    );
}