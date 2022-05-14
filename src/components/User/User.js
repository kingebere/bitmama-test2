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
  const [InvalidUser, setInvalidUser] = useState("");
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

  // This useEffect runs when the current user equals the deleted user.If found,
  // the username is stored in useState
  useEffect(() => {
    removeButton.map(cde => {
      if (cde.toUpperCase() === username.toUpperCase()) {
        setUser(cde);
      }
    });
  }, [removeButton]);

  // This prevents unlogged or removed users from accessing the controls/sessions of other
  //users e.g like manually changing the routes in the search bar to an unregistered user
  useEffect(() => {
    post.map(cd => {
      if (cd.name.toUpperCase().includes(username.toUpperCase())) {
        setInvalidUser(username);
      }
    });
  }, [post]);
  //Since name is unique , I decided to use it to clear selected items from localstorage
  //It also adds the usernames to a new localstorage to enable the other sessions
  //get the information about deleted users
  const Clicked = name => {
    dispatch(setDeleteUser(name.toUpperCase()));
    dispatch(setRemoveLogoutButton(name.toUpperCase()));
  };

  // cuts out the first user object and finds the first user with the active state
  const cut = post.slice(1);
  const lastSeen = cut.find(cde => cde.state === "Active");

  return (
    <div className="User__field">
      {!user && InvalidUser && (
        <div className="User__activity">
          {/* displays the last active user */}
          <p>Last Active:</p>
          <h1>{lastSeen ? lastSeen.name : post[0].name}</h1>
        </div>
      )}

      <div className="User__sessions">
        {!user &&
          InvalidUser &&
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
