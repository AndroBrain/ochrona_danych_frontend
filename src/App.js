import './App.css';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"
import {Register} from "./auth/Register";
import {Login} from "./auth/Login";
import {useState} from "react";
import {authContext} from "./auth/auth";
import {Home} from "./home/Home";
import {PublicNote} from "./note/PublicNote";

function App() {
    const [authState, setAuthState] = useState({
        jwt: null,
    })

    const router = createBrowserRouter(
        createRoutesFromElements([
            <Route path="/" element={<Home/>}/>,
            <Route path="/login" element={<Login/>}/>,
            <Route path="/register" element={<Register/>}/>,
            <Route path="/public/:id" element={<PublicNote/>}/>,
        ])
    )
    return (
        <authContext.Provider value={{authState, setAuthState}}>
            <RouterProvider router={router}>

            </RouterProvider>
        </authContext.Provider>
    );
}

export default App;

export const apiUrl = "https://localhost:7215"
