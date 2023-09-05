import axios from "axios";
import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import "./PrivateMessage.css"


export default function PrivateMessage(props) {
    var textInput = ""
    const loggedInUser = props.loggedInUser;
    let userId = useState()
    let usernames = []
    const [input, setInput] = useState()

    useEffect(()=> {
        const nameConfig = {
            method: "get",
            url: "/user?username=" + loggedInUser,
            headers: {"Authorization": `Bearer ${jwt}`},
        }
        const fetch = async() => {
            const res = await axios(nameConfig)
            console.log(res.data.userId)
            userId = String(res.data.userId);

        }
        fetch()
    },[userId])
    const jwt = sessionStorage.getItem('jwt');
    const [users, setUsers] = useState([])
    const userIds = [];
    const username = [];
    const messages = [];

    const userConfig =
        {method: "get",
            url: "/api/private_message/sender/4",
            headers: {"Authorization" : `Bearer ${jwt}`},}

    useEffect(()=>{
        const fetch = async() => {
            const res = await axios(userConfig)
            console.log(res.data);
            {res.data.map((p,index) => userIds.push(String(p.receiver))
            )}
            {res.data.map((p, index)=>messages.push(String(p.message)))}
            console.log(userIds)
            console.log(messages)
            const take = async () => {
                for (const i of userIds) {
                    const nameConfig = {
                        method: "get",
                        url: "user/" + i,
                        headers: {"Authorization": `Bearer ${jwt}`},
                    }
                    const response = await axios(nameConfig)
                    console.log(response.data.username)
                }
                await take();
            }
            const id = document.querySelector("#list")
            userIds.forEach((i)=>{
                    const newDiv = document.createElement('div')
                    newDiv.innerHTML = i
                    id.appendChild(newDiv)
                }
            )
            const ne = document.querySelector("#list2")
            messages.forEach((i)=>{
                const newDic = document.createElement('div')
                newDic.innerHTML = i
                ne.appendChild(newDic)

            })
        }
        fetch();
    },[])

    const submitMessage = async(textInput) => {
        var textInput = document.getElementById("sendMessage").innerText
        const submitConfig = {
            method: "post",
            url: "api/private_message/save",
            headers: {"Authorization": `Bearer ${jwt}`},
            data: {"sender":4,"receiver":1,"message":String(textInput)}
        }
        console.log(textInput)
        await axios(submitConfig)
    }

    return (
        <div>
            <div>
                <Box className = "userList">
                    <h3>Your Messaged Users</h3>
                    <div id="list"/>
                </Box>
            </div>
            <div>
                <Box className = "messageList">
                    <h4>Messages between a user</h4>
                    <div id="list2"/>
                    <input value={input} id="sendMessage"/>
                    <input onClick={()=>submitMessage(textInput)} type="submit" value="send"/>
                </Box>
            </div>
        </div>)

}