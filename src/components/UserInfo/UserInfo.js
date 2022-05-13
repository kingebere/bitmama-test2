import React from "react";
import {useSelector} from "react-redux";
import "./UserInfo.css";

function User() {
  const {post} = useSelector(state => ({...state.app}));

  return (
    <div className="UserInfo">
      <p>Currently logged in as:</p>
      <h1> {post[0] && post[0].name}</h1>
    </div>
  );
}

export default User;
