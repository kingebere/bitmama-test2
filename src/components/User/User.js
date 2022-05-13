import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import "./User.css";
import {setDeleteUser, setTimer} from "../../redux/features/postSlice";

function User() {
  const {post, duplicate} = useSelector(state => ({...state.app}));
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

  //Since name is unique , I decided to use it to clear selected items from localstorage
  const Clicked = name => {
    dispatch(setDeleteUser(name));
  };

  return (
    <div className="User__field">
      <div className="User__activity">
        {/* displays the last active user */}
        <p>Last Active:</p>
        <h1>{post[1] ? post[1].name : "No second user yet"}</h1>
      </div>
      <div className="User__sessions">
        {post &&
          post.map(sed => {
            const {name, state, date} = sed;

            return (
              //making the button more noticeable if a duplicate is found .
              <div
                className={`User__box ${
                  name.toUpperCase() === duplicate.toUpperCase() && "pink"
                }`}
                key={date}
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
                <div className={` ${name === post[0].name && "hide"}`}>
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
