import React, {useEffect, useState} from "react";

import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import "./User.css";
import {
  setDeleteUser,
  setTimer,
  setRemoveLogoutButton,
} from "../../redux/features/postSlice";

function User() {
  const [user, setUser] = useState("");
  const {username} = useParams();
  const {post, duplicate, removeButton} = useSelector(state => ({
    ...state.app,
  }));

  const dispatch = useDispatch();
  //This useEffect runs everytime the diffference between lastseen value and current date is
  //greater than 59 seconds . It then takes in the id of the object in the value
  //and converts the state to idle
  useEffect(() => {
    post.map((cde, id) => {
      const timer = setTimeout(() => {
        if ((Date.now() - cde.lastseen) / 1000 > 59) {
          dispatch(setTimer(id));
        }
      }, 60000);
      return () => clearInterval(timer);
    });
  }, [post]);

  useEffect(() => {
    removeButton.map(cde => {
      if (cde.toUpperCase() === username.toUpperCase()) {
        setUser(cde);
      }
    });
  }, [removeButton]);

  //Since name is unique , I decided to use it to clear selected items from localstorage
  const Clicked = name => {
    dispatch(setDeleteUser(name.toUpperCase()));
    dispatch(setRemoveLogoutButton(name.toUpperCase()));
  };
  const cut = post.slice(1);

  const lastSeen = cut.find(cde => cde.state === "Active");

  return (
    <div className="User__field">
      {!user && (
        <div className="User__activity">
          {/* displays the last active user */}
          <p>Last Active:</p>
          <h1>{lastSeen ? lastSeen.name : "Empty"}</h1>
        </div>
      )}

      <div className="User__sessions">
        {!user &&
          post.map(sed => {
            const {name, state} = sed;

            return (
              //making the button more noticeable if a duplicate is found .
              <div
                className={`User__box ${
                  name.toUpperCase() === duplicate.toUpperCase() && "pink"
                }`}
                key={name}
              >
                <h1>{name}</h1>
                <div className="User__statewrapper">
                  {/* displaying state indicator */}
                  {state === "Active" ? (
                    <div className="User__state User__state--active"></div>
                  ) : (
                    <div className="User__state User__state--idle"></div>
                  )}
                  <h1>{state}</h1>
                </div>
                {/* hiding the logout button of the current user */}
                <div className={` ${name === username && "hide"}`}>
                  <button onClick={() => Clicked(name)} className="btn">
                    Logout
                  </button>{" "}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default User;
