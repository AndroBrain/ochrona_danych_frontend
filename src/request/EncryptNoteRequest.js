import {apiUrl} from "../App";

export let EncryptNoteRequest = (jwt, id, password, setError, setSuccess) => {
    fetch(`${apiUrl}/Note/EncryptNote`,
        {
            "mode": "cors",
            "method": "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(
                {
                    id: id,
                    password: password,
                }
            )
        }
    ).then(response => {
        console.log(response.status)
        if (response.status === 200) {
            setSuccess(true)
        } else {
            setError(response.status);
        }
    })
        .catch(e => {
            console.log(e.toString());
            setError(e.toString());
        });
}
