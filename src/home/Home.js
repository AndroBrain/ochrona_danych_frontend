import {useContext} from "react";
import {authContext} from "../auth/auth";
import {Navigate} from "react-router-dom";

export function Home() {
    let {authState} = useContext(authContext)
    return (
        <div>
            HOME
            {authState.jwt === null && <Navigate to="/login"/>}
        </div>
    )
}
