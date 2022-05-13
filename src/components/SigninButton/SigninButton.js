import React from "react";
import {Link} from "react-router-dom";

function SigninButton() {
  return (
    <div>
      <Link to="/dashboard">
        <p className="btn">Sign in</p>
      </Link>
    </div>
  );
}

export default SigninButton;
