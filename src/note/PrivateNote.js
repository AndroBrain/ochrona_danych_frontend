import {useParams} from "react-router-dom";

import {useContext, useEffect, useState} from "react";
import {authContext} from "../auth/auth";
import {GetPrivateNoteRequest} from "../request/GetPrivateNoteRequest";
import ReactMarkdown from "react-markdown";
import {MakeNotePublicRequest} from "../request/MakeNotePublicRequest";

export function PrivateNote() {
    let {authState} = useContext(authContext)
    let params = useParams()
    let [note, setNote] = useState(null)
    let [error, setError] = useState(null)
    let [success, setSuccess] = useState(null)

    console.log(note)

    useEffect(() => {
        if (authState.jwt != null)
            GetPrivateNoteRequest(authState.jwt, params.id, setNote, setError)
    }, [authState])

    const commandMakePublic = (e) => {
        e.preventDefault()
        MakeNotePublicRequest(authState.jwt, note.id, setError, setSuccess)
    }

    return <div>
        {error != null && <p>Error: {error}</p>}
        {note != null && <div>
            <h3>Name: {note.name}</h3>
            Description:
            <ReactMarkdown children={note.description}/>
            {(note.isPublic !== true && note.isEncrypted !== true && success === null) && <div>
                <div>
                    <button onClick={commandMakePublic}>Make public</button>
                </div>
                <div style={{marginTop: "8px"}}>
                    <button>Encrypt</button>
                </div>
            </div>
            }
        </div>}
    </div>
}
