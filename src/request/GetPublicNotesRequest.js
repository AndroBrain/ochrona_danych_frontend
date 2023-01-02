import {apiUrl} from "../App";

export let GetPublicNotesRequest = (setNotes, setError) => {
    fetch(`${apiUrl}/PublicNote/GetNotes`,
        {
            "mode": "cors",
            "method": "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    ).then(response => {
        console.log(response.status)
        if (response.status === 200) {
            response.json().then(json => {
                setNotes(json)
            })
        } else {
            try {
                response.json().then(json => {
                    setError(json)
                })
            } catch {
                setError(response.status);
            }
        }
    })
        .catch(e => {
            console.log(e.toString());
            setError(e.toString());
        });
}
