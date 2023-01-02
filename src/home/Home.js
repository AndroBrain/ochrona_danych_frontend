import {useContext, useEffect, useState} from "react";
import {authContext} from "../auth/auth";
import {Link, useNavigate} from "react-router-dom";
import {GetPublicNotesRequest} from "../request/GetPublicNotesRequest";

export function Home() {
    let {authState} = useContext(authContext)
    let [notes, setNotes] = useState([])
    let [publicNotesError, setPublicNotesError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        GetPublicNotesRequest(setNotes, setPublicNotesError)
    }, [])

    return (
        <div>
            HOME
            <div style={{marginTop: "16px"}}>
                {authState.jwt === null && <button onClick={(e) => navigate("/login")}>Login</button>}
            </div>
            <h2>Public notes</h2>
            {publicNotesError != null && <p>Error: {publicNotesError}</p>}
            <ul>
                {notes.map(note => (
                    <li key={note.id}>
                        <Link to={`public/${note.id}`}>Name: {note.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
