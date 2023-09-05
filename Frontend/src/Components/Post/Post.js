import "./post.css"
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default function Post({post}) {
    return (
        <div className="post">
            <div className="postInfo">
                <div className="postCats">
          <span className="postCat">
              {post.tags.map((function(d){
                  return (
                      <li>
                          {d}
                      </li>
                  )}))}

          </span>
                </div>
          <Link to={`/post/${post.postId}`} className="link">
              <span className="postTitle">{post.postName} </span>
          </Link>
                <hr />
                <span className="postCreator">
                    By: {post.user.username}
                </span>
                <hr/>
                <span className="postDate">
                    {new Date(post.createdDate * 1000).toDateString()}
                </span>
            </div>
            <p className="postDesc">
                {post.description}
            </p>
        </div>
    );
}
