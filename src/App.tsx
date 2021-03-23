import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

function App() {
    const { token, login, logout, userId, ready } = useAuth();
    const isAuth = !!token;
    const routes = useRoutes(isAuth)

    if (!ready) {
        return <Loader
            type="Audio"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
        />
    }

    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuth
        }}>
            <Router>
                { isAuth && <Navbar/> }
                <div>
                    { routes }
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
