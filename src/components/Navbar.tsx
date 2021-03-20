import React, {useContext, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const [message, setMessage] = useState("");
    // const wsConnection = new WebSocket("ws://localhost:3000/ws")

    // wsConnection.onopen = function() {
    //     alert("Соединение установлено.");
    // };
    //
    // wsConnection.onclose = function(event) {
    //     if (event.wasClean) {
    //         alert('Соединение закрыто чисто');
    //     } else {
    //         alert('Обрыв соединения'); // например, "убит" процесс сервера
    //     }
    //     alert('Код: ' + event.code + ' причина: ' + event.reason);
    // };
    //
    // wsConnection.onerror = function(error: any) {
    //     alert("Ошибка " + error.message);
    // };

    // const sendWsMessage = () => {
    //     wsConnection.send(message);
    // }

    const logoutHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        auth.logout();
        history.push("/");
    }

    // const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     event.preventDefault();
    //     setMessage(event.target.value);
    // }

    return (
        <div>
            <h2>Виртуальный гардероб</h2>
            <ul>
                <li><NavLink to={"/users"}>Пользователи</NavLink></li>
                <li><NavLink to={"/clothes"}>Вещи</NavLink></li>
                <li><NavLink to={"/clothes/create"}>Создать вещь</NavLink></li>
                <li><a href={"/"} onClick={logoutHandler}>Выйти</a></li>
            </ul>
            {/*<div>*/}
            {/*    <input type={"text"} value={message} onChange={changeHandler}/>*/}
            {/*    <button onClick={sendWsMessage}>Send message</button>*/}
            {/*</div>*/}
        </div>
    )
}