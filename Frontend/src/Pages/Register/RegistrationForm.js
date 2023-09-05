import React, {useState} from 'react';
import axios from 'axios';
import "./register.css"

function RegistrationForm(){
    const [inputs, setInput] = useState({});
    const [output, setOutput] = useState("");

    const handleChange=(event)=>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setInput(values => ({...values, [name]: value}))
    }

    const validateForm=()=>{
            var mailformat = /\S+@\S+\.\S+/;
            var valid = false;
            if (!inputs.username
                || !inputs.email
                || !inputs.password
                || !inputs.repPassword)
            {
                    setOutput("Validation failure: Please fill in all text fields.");
            }
            else if(inputs.username.length > 50){
                setOutput("Validation  failure: Username cannot be longer than 50 characters");
            }else if(!mailformat.test(inputs.email)){
                setOutput("Validation failure: Invalid e-mail address. Please enter your e-mail again.");
            }else if(inputs.password.length<8){
                setOutput("Validation failure: Password is too short. Please select another password");
            } else if(inputs.password !== inputs.repPassword) {
                setOutput("Validation failure: Passwords do not match. Please retry");
            }else{
                valid =true;
            }
            return valid;
    }

    const handleSubmit=(event)=>{
        event.preventDefault();  

        const dataRegistration = (({username,email,password})=>({username,email,password}))(inputs);

        if(validateForm()){
            axios({
                method: 'post',
                url: '/register',
                data: dataRegistration
            })
            .then((response) => {
                if (response.status === 201)
                {
                    setOutput(`Registration success: ${dataRegistration['username']}`)
                }

                else {
                    setOutput('Registration Failure')
                }
                // setOutput(response.status === 201 ? `Registration success: ${dataRegistration['username']}` : "Registration failure");
                // setOutput(response.status === 409 ? 'Email or Username Taken' : "Registration Failure");
            })
            .catch(err => {
                setOutput(err.response.data)
            })

        }
    }

    return(
        <React.Fragment>
            <form className="registerform" onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label className="textInput">Username:
                            <input
                                type="text"
                                name = "username"
                                className="form-control"
                                placeholder="Enter username"
                                value={inputs.username || ""}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="textInput">Email:
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={inputs.email || ""}
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
                    <div className="form-group">
                        <label className="textInput">Re-type password:
                            <input
                                type="password"
                                name="repPassword"
                                className="form-control"
                                placeholder="Enter password"
                                value={inputs.repPassword || ""}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                <button type="submit" className="btn btn-primary btn-block">Register</button>
            </form>
            <br/>
            <div className="responsebox">
                <p>{output}</p>
            </div>
            </React.Fragment>
        );
}

export default RegistrationForm;