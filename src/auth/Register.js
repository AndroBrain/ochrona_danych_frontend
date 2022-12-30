import {useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {RegisterRequest} from "../request/RegisterRequest";

export function Register() {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const commandRegister = (e) => {
        e.preventDefault()
        RegisterRequest(setIsSuccess, setError, email, name, password)
    }

    return <div>
        {isSuccess && <Navigate to="/login"/>}
        {error ?
            <div style={{marginBottom: "1em"}}>{error}</div> : ""
        }
        <form onSubmit={commandRegister}>
            Email:
            <br/>
            <input type="text" onChange={e => setEmail(e.target.value)} value={email}/>
            <br/>
            Name:
            <br/>
            <input type="text" onChange={e => setName(e.target.value)} value={name}/>
            <br/>
            Password:
            <br/>
            <input type="password" onChange={e => setPassword(e.target.value)} value={password}/>
            <br/>
            <button style={{marginTop: "1em"}} onClick={commandRegister}>Register
            </button>
            <button style={{marginTop: "1em"}} onClick={(e) => navigate("/login")}>Go to login page
            </button>
        </form>
    </div>
}
