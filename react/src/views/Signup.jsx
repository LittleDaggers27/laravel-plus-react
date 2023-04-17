import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const { setUser, setToken } = useStateContext();
    const [errorMessages, setErrorMessages] = useState([]);

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };

        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((error) => {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.errors
                ) {
                    const errors = error.response.data.errors;
                    setErrorMessages(Object.values(errors).flat());
                } else {
                    setErrorMessages("An error occurred.");
                }
            });
    };
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Signup for free</h1>
                    <input
                        ref={nameRef}
                        type="text"
                        placeholder="Full Name"
                        required
                    />
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Email Address"
                        required
                    />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                        required
                    />
                    <input
                        ref={passwordConfirmationRef}
                        type="password"
                        placeholder="Confrim Your Password"
                        required
                    />
                    {errorMessages.length > 0 && (
                        <div className="error">
                            {errorMessages.map((errorMessage) => (
                                <div key={errorMessage}>{errorMessage}</div>
                            ))}
                        </div>
                    )}
                    <button type="submit" className="btn btn-block">
                        Signup
                    </button>
                    <p className="message">
                        Already Registered? <Link to="/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
