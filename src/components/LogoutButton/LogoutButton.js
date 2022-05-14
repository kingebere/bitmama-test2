import React, {useState, useEffect} from "react";

import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {setDeleteUser} from "../../redux/features/postSlice";

function Logout() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const {username} = useParams();
  const dispatch = useDispatch();
  const {post} = useSelector(state => ({...state.app}));

  const Clicked = () => {
    dispatch(setDeleteUser(username.toUpperCase()));

    navigate("/");
  };
  //this useEffect runs when the username equals the current user
  // This prevents unlogged or removed users from accessing the controls/sessions of other
  //users e.g like manually changing the routes in the search bar to an unregistered user
  useEffect(() => {
    post.map(cd => {
      if (cd.name.toUpperCase().includes(username.toUpperCase())) {
        setUser(username);
      }
    });
  }, [post]);
  return (
    <div>
      {user && (
        <button className="btn" onClick={Clicked}>
          Logout
        </button>
      )}
    </div>
  );
}

export default Logout;
