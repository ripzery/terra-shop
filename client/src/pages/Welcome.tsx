import React, { useEffect, useState } from "react";
import "../styles/Welcome.css";
import { Link, withRouter } from "react-router-dom";
import { History } from "history";

const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

interface WelcomeProps {
  history: History;
}

function Welcome({ history }: WelcomeProps) {
  const [email, setEmail] = useState<string>("");
  const [btnClasses, setBtnClasses] = useState<string>(
    "button button-welcome button-disabled"
  );

  useEffect(() => {
    if (localStorage.getItem("email")) {
      history.push("/products");
    }
  }, [history]);

  function onEmailChanged(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    setEmail(e.target.value);
    if (!emailRegex.test(e.target.value)) {
      setBtnClasses("button button-welcome button-disabled");
    } else {
      setBtnClasses("button button-welcome");
    }
  }

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to Terra Book Shop!</h1>
      <input
        type="email"
        className="welcome-input-email"
        onChange={onEmailChanged}
        value={email}
        placeholder="Enter your email"
      />
      <Link
        to={{ pathname: "/products", state: { email } }}
        className={btnClasses}
      >
        Enter the app
      </Link>
    </div>
  );
}

export default withRouter(Welcome);
