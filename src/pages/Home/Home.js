import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

import "./Home.css";
import NavBar from "../../containers/NavBar/NavBar";
import Username from "../../containers/Username/Username";
function Home() {
  const {post} = useSelector(state => ({...state.app}));

  const navigate = useNavigate();

  //if no user , redirect to the home page
  useEffect(() => {
    if (post.length === 0) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="Home">
        <div className="Home__row">
          <NavBar />
          <Username />
        </div>
      </div>
    </>
  );
}
export default Home;
