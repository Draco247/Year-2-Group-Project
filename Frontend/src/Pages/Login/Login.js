import React, {useState} from 'react';
import axios from 'axios';
import "./login.css"

function Login(props){
    const [inputs, setInput] = useState({});
    const [output, setOutput] = useState("");


    const handleChange=(event)=>{
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setInput(values => ({...values, [name]: value}))
    }

    const validateForm=()=>{
        var mailformat = /\S+@\S+\.\S+/;
        var valid = false;
        if (!inputs.username
        || !inputs.password){
            setOutput("Validation failure: Please fill in all text fields.");
        }
        else if(inputs.password.length<6){
            setOutput("Validation failure: Password is too short. Please enter your password");
        } else{
            valid =true;
        }
        return valid;

    }

    const handleSubmit=(event)=>{
        event.preventDefault();

        const dataLogin = {username: inputs.username,
                           password: inputs.password};


        if(validateForm()){
            axios({
                method: 'post',
                url: '/login',
                data: dataLogin
            })
            .then((response) => {
                if (response.status === 200){
                    setOutput("Login success");
                    const jwtToken = response.headers.authorization.split(' ')[1]
                    if (jwtToken !== null) {
                        sessionStorage.setItem("jwt", jwtToken);

                        props.setLoggedinUser(inputs.username);
                        sessionStorage.setItem("current_user", inputs.username);
                    } else{
                        setOutput("Token failure");
                        props.setLoggedinUser("");
                    }
                } else{
                    setOutput("Login failure");
                    props.setLoggedinUser("");
                }
            })
            .catch(err => {
                setOutput("Login failure");
                props.setLoggedinUser("");
            })
        }

    }

    return(
        <React.Fragment>
        <form  className="loginform" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
                <label className="textInput">Username:
                    <input
                     type="text"
                     name="username"
                     className="form-control"
                     placeholder="Enter username"
                     value={inputs.username || ""}
                     onChange={handleChange}
                     />
                </label>
            </div>
            <div className="form-group">
                <label className="textInput">Password:
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={inputs.password || ""}
                        onChange={handleChange}
                    />
                </label>
            </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
            </form>
            <br/>
            <div className="responsebox">
                <p>{output}</p>
            </div>
            </React.Fragment>
        );

}

export default Login;