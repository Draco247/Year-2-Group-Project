import "./newPost.css"
import React, {useEffect, useState} from "react";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";

export default function NewPost(props) {
    const loggedInUser = props.loggedInUser;
    const [inputs, setInput] = useState({});
    const [output, setOutput] = useState("");
    const [postName, setpostName] = useState("");
    const Posttags = [];
    const [description, setdescription] = useState("");
    const [posttags, setposttags] = useState([]);
    const [redirect, setRedirect] = useState(false);


    const tags = {
        tags: [
            {
                id: 0,
                title: 'Women',
                selected: false,
                key: 'tags'
            },
            {
                id: 1,
                title: 'LGBT',
                selected: false,
                key: 'tags'
            },
            {
                id: 2,
                title: 'Men',
                selected: false,
                key: 'tags'
            },
            {
                id: 3,
                title: 'Lesbian',
                selected: false,
                key: 'tags'
            },
            {
                id: 4,
                title: 'Transgender',
                selected: false,
                key: 'tags'
            },
            {
                id: 5,
                title: 'Gay',
                selected: false,
                key: 'tags'
            }
        ]
    }


    const validateForm=()=>{
        var valid = false;
        if (!postName
            && !description){
            setOutput("Enter post title and description");
        }
            else if(!postName){
                setOutput("Enter post title");
        }
        else if(!description){
            setOutput("Enter description");
        } else{
            valid =true;
        }
        return valid;

    }

    const choosetags = (tag) => {

        if (!posttags.includes(tag))
        {
            setposttags([...posttags, tag]);
        }
        console.log(posttags);

        // else {
        //     Posttags.pop();
        // }
        // posttags.push('mango')

    }

    // function onChange()
    // {
    //
    // }

    const handleSubmit= async (event)=>{
        event.preventDefault();
        const jwt = sessionStorage.getItem('jwt');
        setRedirect(true);
        if (validateForm())
        {
            const newPost = {
                username : loggedInUser,
                postName,
                description,
                tags : posttags
            };


            const config = {
                method : 'post',
                url : 'posts/newpost',
                headers: {"Authorization" : `Bearer ${jwt}`},
                data: newPost
            }

            try {
                const res = await axios (config)
                window.location.replace("/post/" + res.data.postId)
                // props.setLoggedinUser(sessionStorage.getItem("current_user"));
            } catch (error) {}

        }
        console.log(output);
    }


    if (loggedInUser==="") {
        return <div><p>Hello guest user</p></div>;
    }
    else{
        return <div className="createnewpost">
            <p>Welcome {loggedInUser}</p>
            <form onSubmit={handleSubmit} className="newpostForm">
                <br/>
                <div className="responsebox">
                    <p>{output}</p>
                </div>
                <br/>
                <div className="tags">
                    {tags.tags.map(
                        tag => <button
                            type="button"
                            key={tags.title}
                            onClick={() => {choosetags(tag.title)}}
                            className="article-category m-2">
                            {tag.title}
                        </button>)}
                </div>
                <div className="newpostFormGroup">
                    <input
                        className="newpostInput"
                        placeholder="Title"
                        type="text"
                        onChange={event=>setpostName(event.target.value)}
                        autoFocus={true}
                    />
                </div>
                <br/>
                <div className="newpostFormGroup">
                                  <textarea
                                      className="newpostInput newpostText"
                                      placeholder="Enter post description..."
                                      type="text"
                                      onChange={event=>setdescription(event.target.value)}
                                      autoFocus={true}
                                  />
                </div>

                <button className="newpostSubmit" type="submit">
                    Publish
                </button>

            </form>
        </div>
    }
}