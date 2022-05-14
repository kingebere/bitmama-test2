import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

import "./UserInfo.css";

function User() {
  const {username} = useParams();
  const [name, setName] = useState("");
  const {post} = useSelector(state => ({...state.app}));

  // This useEffect runs when the current user is found in the localstorage user array.If found,
  // the username is stored in useState
  useEffect(() => {
    post.map(cd => {
      if (cd.name.toUpperCase().includes(username.toUpperCase())) {
        setName(username);
      }
    });
  }, [post]);
  return (
    <div className="UserInfo">
      <p>Currently logged in as:</p>
      <h1> {name ? name : "Logged out"}</h1>
    </div>
  );
}

export default User;
