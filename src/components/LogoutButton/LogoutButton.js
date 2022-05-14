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
  const {removeButton} = useSelector(state => ({...state.app}));

  const Clicked = () => {
    dispatch(setDeleteUser(username.toUpperCase()));

    navigate("/dashboard");
  };
  //this useEffect runs when the username equals the deleted user
  useEffect(() => {
    removeButton.map(cde => {
      if (cde.toUpperCase() === username.toUpperCase()) {
        setUser(cde);
      }
    });
  }, [removeButton]);
  return (
    <div>
      {!user && (
        <button className="btn" onClick={Clicked}>
          Logout
        </button>
      )}
    </div>
  );
}

export default Logout;
