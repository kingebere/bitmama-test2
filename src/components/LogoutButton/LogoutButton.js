import React from "react";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {setDeleteUser} from "../../redux/features/postSlice";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {post} = useSelector(state => ({...state.app}));

  const Clicked = () => {
    dispatch(setDeleteUser(post[0].name));

    navigate("/dashboard");
  };

  return (
    <div>
      {post.length > 0 ? (
        <button className="btn" onClick={Clicked}>
          Logout
        </button>
      ) : (
        <h1>Add a username</h1>
      )}
    </div>
  );
}

export default Logout;
