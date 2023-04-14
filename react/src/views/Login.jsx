import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const onSubmit = (ev) => {
        ev.preventDefault();
    };
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title"> Login into your account</h1>
                    <input type="email" placeholder="Enter your Email" />
                    <input type="password" placeholder="Enter your Password" />
                    <button type="submit" className="btn btn-block">
                        Login
                    </button>
                    <p className="message">
                        Not Registered? <Link to="/signup">Create account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}