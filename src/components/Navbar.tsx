import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        auth.logout();
        history.push("/");
    }

    return (
        <div>
            <h2>Виртуальный гардероб Looker</h2>
            <ul>
                <li><NavLink to={"/clothes"}>Вещи</NavLink></li>
                <li><NavLink to={"/clothes/create"}>Создать вещь</NavLink></li>
                <li><a href={"/"} onClick={logoutHandler}>Выйти</a></li>
            </ul>
        </div>
    )
}