import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";

function GuestLayout() {
    const { token } = useStateContext();

    if (token) {
        return <Navigate to="/" />
    }

    return (
        <div>
            <div>
             
                <Outlet />
            </div>
        </div>
    );
}

export default GuestLayout;
