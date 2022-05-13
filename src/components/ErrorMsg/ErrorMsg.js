import React from "react";
import "./ErrorMsg.css";

import {useSelector} from "react-redux";
function ErrorMsg() {
  const {error, errorMsg} = useSelector(state => ({...state.app}));
  //Error notification
  return <>{error && <p className="errorMsg--error">{errorMsg}</p>}</>;
}

export default ErrorMsg;
