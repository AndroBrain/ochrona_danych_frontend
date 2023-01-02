import {useParams} from "react-router-dom";

import {useContext, useEffect, useState} from "react";
import {authContext} from "../auth/auth";
import {GetPrivateNoteRequest} from "../request/GetPrivateNoteRequest";
import ReactMarkdown from "react-markdown";

export function PrivateNote() {
    let {authState} = useContext(authContext)
    let params = useParams()
    let [note, setNote] = useState(null)
    let [error, setError] = useState(null)

    useEffect(() => {
        if (authState.jwt != null)
            GetPrivateNoteRequest(authState.jwt,params.id, setNote, setError)
    }, [authState])

    return <div>
        {error != null && <p>Error: {error}</p>}
        {note != null && <div>
            <h3>Name: {note.name}</h3>
            Description:
            <ReactMarkdown children={note.description}/>
        </div>}

    </div>
}
