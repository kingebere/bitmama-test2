import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./SearchInput.css";

import {useDispatch, useSelector} from "react-redux";
import {
  setAddUser,
  setDuplicate,
  setError,
  setLastSeen,
  setErrorBoolean,
} from "../../redux/features/postSlice";
function SearchInput() {
  const {post} = useSelector(state => ({...state.app}));

  const navigate = useNavigate();
  const [user, Setuser] = useState("");
  const dispatch = useDispatch();

  //Adding the target value to usestate
  const handleAdd = e => {
    Setuser(e.target.value);
  };

  //function that checks for special characters in the input value
  var specialChars = "<>@!#$%^&*(){}?:;|]['\"\\,./~`-=";
  var checks = str => {
    for (let i = 0; i < specialChars.length; i++) {
      if (str.indexOf(specialChars[i]) > -1) {
        return true;
      }
    }
    return false;
  };
  // The submit function handles some functions for input validation .
  //It handles cases where the
  //input is empty , has a duplicate , has spaces , has a small or
  // big length ,and has special characters
  //If an error is found, it dispatches to the redux store to
  //call the error notification with its message for 3 seconds.
  // Case insensitivity is also handled here using the toUpperCase function
  const onSubmit = e => {
    e.preventDefault();
    if (post.some(cd => cd.name.toUpperCase() == user.toUpperCase())) {
      dispatch(setDuplicate(user));
      navigate("/");
    } else if (user === "") {
      dispatch(setError("Please input a value"));
      dispatch(setErrorBoolean(true));
      const timers = setTimeout(() => {
        dispatch(setErrorBoolean(false));
      }, 3000);
      return () => clearInterval(timers);
    } else if (user.includes(" ")) {
      dispatch(setError("Please remove spaces"));
      dispatch(setErrorBoolean(true));
      const timers = setTimeout(() => {
        dispatch(setErrorBoolean(false));
      }, 3000);
      return () => clearInterval(timers);
    } else if (user.length < 6 || user.length > 15) {
      dispatch(setError("Please input a value between 6 and 15"));
      dispatch(setErrorBoolean(true));
      const timers = setTimeout(() => {
        dispatch(setErrorBoolean(false));
      }, 3000);
      return () => clearInterval(timers);
    } else if (checks(user)) {
      dispatch(setError("Please remove symbols"));
      dispatch(setErrorBoolean(true));
      const timers = setTimeout(() => {
        dispatch(setErrorBoolean(false));
      }, 3000);
      return () => clearInterval(timers);
    }
    //add the user to the array
    //   if there are more than one item in the array ,
    // it appends a last seen value to the first object in the array
    //then it navigates to the home page.
    //The logic here is that to watch for a new user creation , we add
    // a Date.now() to the previous user object. This indicates
    //that a new user has been created and the date signifies the
    // end of the session of the previous user .
    else if (post.length > 0) {
      dispatch(setAddUser(user));
      dispatch(setLastSeen(1));
      navigate("/");
    } else {
      dispatch(setAddUser(user));
      navigate("/");
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="searchInput">
        <input
          type="text"
          title="search"
          className="searchInput__textbox"
          data-testid="search-textfield"
          aria-label="search-textfield"
          placeholder="Add a username"
          value={user}
          onChange={handleAdd}
        />
        <button className="btn">Add</button>
      </form>
    </>
  );
}

export default SearchInput;
