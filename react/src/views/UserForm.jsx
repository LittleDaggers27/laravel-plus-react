import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useNavigate, useParams } from "react-router-dom";

function UserForm() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    const [user, setUser] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUser(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    const onSubmit = (event) => {
        if (user.id) {
            axiosClient
                .put(`/users/${user.id}`, user)
                .then(() => {
                    navigate("/users");
                })
                .catch((error) => {
                    const response = error.resonse;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
        event.preventDefault();
    };

    return (
        <>
            {user.id && <h1>Update User: {user.name}</h1>}
            {!user.id && <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">
                        <i className="fa fa-spinner"></i>Loading...
                    </div>
                )}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input
                            className="form-control"
                            onChange={(ev) =>
                                setUser({ ...user, name: ev.target.value })
                            }
                            value={user.name}
                            type="text"
                            name="name"
                            placeholder="Name"
                        />
                        <input
                            className="form-control"
                            onChange={(ev) =>
                                setUser({ ...user, email: ev.target.value })
                            }
                            value={user.email}
                            type="email"
                            name="email"
                            placeholder="Email"
                        />
                        <input
                            className="form-control"
                            onChange={(ev) =>
                                setUser({ ...user, password: ev.target.value })
                            }
                            type="password"
                            name="password"
                            placeholder="Password"
                        />
                        <input
                            className="form-control"
                            onChange={(ev) =>
                                setUser({
                                    ...user,
                                    password_confirmation: ev.target.value,
                                })
                            }
                            type="password"
                            name="confirm_password"
                            placeholder="Password Confirmation"
                        />
                        <button className="btn btn-primary">Save</button>
                    </form>
                )}
            </div>
        </>
    );
}

export default UserForm;
