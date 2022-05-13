import React from "react";
import "./Signin.css";
import SearchInput from "../../components/SearchInput/SearchInput";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg";

function Signin() {
  return (
    <div className="signin">
      <ErrorMsg />
      <SearchInput />
    </div>
  );
}

export default Signin;
