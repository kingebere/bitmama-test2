/* eslint-disable indent */
import {createSlice} from "@reduxjs/toolkit";

//adding to localstorage
const postSlice = createSlice({
  name: "post",
  initialState: {
    loading: true,
    post: localStorage.getItem("post")
      ? JSON.parse(localStorage.getItem("post"))
      : [],
    duplicate: "",
    error: false,
    errorMsg: "",
    activeuser: "",

    removeButton: localStorage.getItem("removeUser")
      ? JSON.parse(localStorage.getItem("removeUser"))
      : [],
  },

  //unshift moves an items to the top(post[0]) .
  //I added lastseen: 100000000000000 as initial state because I needed the value as a
  //number instead of string and the value should always be greater the Date.now(), thus making
  //making it suitable for this project .
  reducers: {
    setAddUser: (state, action) => {
      state.post.unshift({
        name: action.payload,
        state: "Active",
        lastseen: 100000000000000,
      });

      localStorage.setItem("post", JSON.stringify(state.post));
    },
    setDuplicate: (state, action) => {
      state.duplicate = action.payload;
    },
    setError: (state, action) => {
      state.errorMsg = action.payload;
    },
    setErrorBoolean: (state, action) => {
      state.error = action.payload;
    },
    setTimer: (state, action) => {
      state.post[action.payload].state = "idle";

      localStorage.setItem("post", JSON.stringify(state.post));
    },
    setLastSeen: (state, action) => {
      state.post[action.payload].lastseen = Date.now();

      localStorage.setItem("post", JSON.stringify(state.post));
    },
    setRemoveLogoutButton: (state, action) => {
      state.removeButton.push(action.payload);
      localStorage.setItem("removeUser", JSON.stringify(state.removeButton));
    },

    setDeleteUser: (state, action) => {
      state.post = state.post.filter(
        bv => bv.name.toUpperCase() !== action.payload
      );
      localStorage.setItem("post", JSON.stringify(state.post));
    },
  },
});
export const {
  setAddUser,
  setDeleteUser,
  setDuplicate,
  setLastSeen,
  setRemoveLogoutButton,
  setTimer,
  setError,
  setErrorBoolean,
} = postSlice.actions;
export default postSlice.reducer;
