import React from "react"
import {useAuth} from "../../auth/AuthStatus";

const Profile = () => {
    let auth = useAuth();

    return <div>Profile de {auth.user.firstname}</div>
}

export default Profile