import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useMessage} from "../../hooks/message.hook";
import {AuthContext} from "../../context/AuthContext";

export const Auth = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({ email: "", password: "" });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm(state => ({
            ...state,
            [event.target.name]: event.target.value
        }));
    };

    const registerHandler = async () => {
        try {
            const data = await request("/api/auth/register", "POST", {...form});
            message(data.message);
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request("/api/auth/login", "POST", {...form});
            auth.login(data.token, data.user);
        } catch (e) {}
    }

    return (
        <div style={{margin: "auto", width: "50%", textAlign: "center"}}>
            <h1>Авторизация</h1>

            <div>
                <input id={"email"}
                       type={"email"}
                       name={"email"}
                       value={form.email}
                       placeholder={"E-mail"}
                       onChange={changeHandler}
                />

                <input id={"password"}
                       type={"password"}
                       name={"password"}
                       value={form.password}
                       placeholder={"Пароль"}
                       onChange={changeHandler}
                />
            </div>

            <div>
                <button onClick={loginHandler}>Войти</button>
                <button onClick={registerHandler} disabled={loading}>Зарегистрироваться</button>
            </div>
            <ToastContainer />
        </div>
    )
}