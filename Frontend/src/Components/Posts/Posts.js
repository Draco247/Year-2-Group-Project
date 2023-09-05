import React, {useEffect, useState} from 'react';
import "./posts.css"
import Post from '../Post/Post'
import axios from 'axios';
import { FaPen } from "react-icons/fa";
import { usestate } from 'react';
import {Link, useLocation} from "react-router-dom";
import * as ReactBootStrap from "react-bootstrap";

export default function Posts(props) {
    const setLoggedinUser = props.setLoggedinUser;
    const loggedInUser = props.loggedInUser;
    const [posttags, setposttags] = useState("");
    const searchParams = useLocation().search;
    const [loading, setLoading] = useState(false);
    const user = sessionStorage.getItem('current_user');


    const [posts, setposts] = useState([])
    const jwt = sessionStorage.getItem('jwt');

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

    const config = {
        method : 'get',
        url : 'posts/showposts',
        headers: {"Authorization" : `Bearer ${jwt}`},
    }

    const config2 =
        {
            method : 'get',
            url : '/posts/post/findbyuser' + searchParams,
            headers: {"Authorization" : `Bearer ${jwt}`},
        }

    const filter = {
        method : 'get',
        url : 'posts/showposts/filterby?tag=' + posttags,
        headers: {"Authorization" : `Bearer ${jwt}`},
    }

    const [input, setInput] = useState(''); // '' is the initial state value

    const config3 = {
        method : 'get',
        url : 'posts/search/' + input,
        headers : {"Authorization" : `Bearer ${jwt}`},
    }




    useEffect(() => {
        const fetch = async () => {
            const res = await axios(config)
            // console.log(res.data.posts);
            setposts(res.data.posts);
            setLoading(true);

        };
        fetch();

    },[])

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios(config2)
            setposts(res.data);
            setLoading(true);
        };
        fetchPosts();
    }, [searchParams]);

    useEffect(async () => {
        const res = await axios(filter)
        setposts(res.data);
        // console.log(res.data);
    },[posttags])

    // useEffect(async () => {
    //     const res = await axios(config2)
    // },[searchParams])


    const refetch = async () => {
        const res = await axios(config)
        setposts(res.data.posts);
    };


    const filterArticles = async(tag) => {
        // postTags = tag;

        setposttags(tag)
        // console.log(tag)
    }

    const searchPosts = async(input) => {
        const res = await axios(config3)
        setposts(res.data);
    }

    var keywordInput = document.getElementById("textInput");

    if (loggedInUser==="" && (user ==="" || user === null)) {
        return <div><p>Hello guest user. Log in to view posts</p></div>;
    } else{
        setLoggedinUser(user);
        return <div>
            <p>Welcome {loggedInUser}</p>
            <Link to={'/newPost'} className="newpostLink"><FaPen/> New Post</Link>


            {tags.tags.map(
                tag => <button
                    key={tags.title}
                    onClick={() => filterArticles(tag.title)}
                    className="article-category m-2">
                    {tag.title}
                </button>)}
            <button onClick={() => refetch()} className="article-category m-2">All</button>


            {/*<input type="text" placeholder="Search posts" id="textInput"/>*/}
            <input value={input} onInput={e => setInput(e.target.value)} id="textInput"/>
            <input onClick={() => searchPosts(keywordInput)} type="submit" value="Search" id="search"/>

            {loading ? (<div className="posts">
                {posts && posts.length && posts.map((p)=>(
                    <Post post={p}/>
                ))}
            </div>):(
                    <ReactBootStrap.Spinner animation="border"/>
                )}
        </div>;
    }

}
