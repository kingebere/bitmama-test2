import React from "react";
import "./NavBar.css";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import SigninButton from "../../components/SigninButton/SigninButton";
import UserInfo from "../../components/UserInfo/UserInfo";

function NavBar() {
  return (
    <div className="NavBar">
      <UserInfo />
      <SigninButton />
      <LogoutButton />
    </div>
  );
}

export default NavBar;
