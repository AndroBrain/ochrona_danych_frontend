import {useParams} from "react-router-dom";

import {useContext, useEffect, useState} from "react";
import {authContext} from "../auth/auth";
import {GetPrivateNoteRequest} from "../request/GetPrivateNoteRequest";
import ReactMarkdown from "react-markdown";
import {MakeNotePublicRequest} from "../request/MakeNotePublicRequest";
import {DecryptNoteRequest} from "../request/DecryptNoteRequest";
import {EncryptNoteRequest} from "../request/EncryptNoteRequest";

export function PrivateNote() {
    let {authState} = useContext(authContext)
    let params = useParams()
    let [decryptNotePassword, setDecryptNotePassword] = useState("")
    let [encryptNotePassword, setEncryptNotePassword] = useState("")
    let [note, setNote] = useState(null)
    let [error, setError] = useState(null)
    let [success, setSuccess] = useState(null)

    console.log(note)

    useEffect(() => {
        if (authState.jwt != null)
            GetPrivateNoteRequest(authState.jwt, params.id, setNote, setError)
    }, [authState])

    const commandDecryptNote = (e) => {
        e.preventDefault()
        DecryptNoteRequest(authState.jwt, note.id, decryptNotePassword, note, setNote, setError,)
    }

    const commandMakePublic = (e) => {
        e.preventDefault()
        MakeNotePublicRequest(authState.jwt, note.id, setError, setSuccess)
    }

    const commandEncryptNote = (e) => {
        e.preventDefault()
        EncryptNoteRequest(authState.jwt, note.id, encryptNotePassword, setError, setSuccess)
    }

    return <div>
        {error != null && <p>Error: {error}</p>}
        {note != null && <div>
            <h3>Name: {note.name}</h3>
            Description:
            {note.description !== null && <ReactMarkdown children={note.description}/>}
            {(note.isEncrypted === true && note.description === null) && <div>
                <h4>Note is encrypted. Enter password to read it.</h4>
                <p>Password:</p>
                <form onSubmit={commandDecryptNote}>
                    <input type="password" onChange={e => setDecryptNotePassword(e.target.value)}
                           value={decryptNotePassword}/>
                    <br/>
                    <button onClick={commandDecryptNote}>Decrypt note</button>
                </form>
            </div>
            }
            {(note.isPublic !== true && note.isEncrypted !== true && success === null) && <div>
                <div>
                    <button onClick={commandMakePublic}>Make public</button>
                </div>
                <div style={{marginTop: "8px"}}>
                    <form onSubmit={commandEncryptNote}>
                        <input type="password" onChange={e => setEncryptNotePassword(e.target.value)}
                               value={encryptNotePassword}/>
                        <br/>
                        <button onClick={commandEncryptNote}>Encrypt</button>
                    </form>
                </div>
            </div>
            }
        </div>}
    </div>
}
