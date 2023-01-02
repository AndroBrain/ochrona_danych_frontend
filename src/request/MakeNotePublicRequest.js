import {apiUrl} from "../App";

export let MakeNotePublicRequest = (jwt, id, setError, setSuccess) => {
    fetch(`${apiUrl}/Note/PublishNote?id=${id}`,
        {
            "mode": "cors",
            "method": "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            },
        }
    ).then(response => {
        console.log(response.status)
        if (response.status === 200) {
            setSuccess("Note made public successfully")
        } else {
            setError(response.status);
        }
    })
        .catch(e => {
            console.log(e.toString());
            setError(e.toString());
        });
}
