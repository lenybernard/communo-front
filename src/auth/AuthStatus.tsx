import React from "react"
import {AuthContext} from "./AuthProvider";
import {useNavigate} from "react-router-dom";

export const useAuth = () => {
    return React.useContext(AuthContext);
}

export const AuthStatus = () => {
    let auth = useAuth();
    let navigate = useNavigate();

    if (!auth.user) {
        return <p>You are not logged in.</p>;
    }

    return (
        <p>
            Welcome {auth.user}!{" "}
            <button
                onClick={() => {
                    auth.signout(() => navigate("/"));
                }}
            >
                Sign out
            </button>
        </p>
    );
}

export default AuthStatus