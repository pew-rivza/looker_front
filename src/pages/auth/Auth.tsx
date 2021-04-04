import React, {useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useMessage} from "../../hooks/message.hook";
import {Login} from "../../components/authStates/Login";

export const Auth = () => {
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

    return (
        <div>
            <Login/>
            {/*<div>*/}
            {/*    <input id={"email"}*/}
            {/*           type={"email"}*/}
            {/*           name={"email"}*/}
            {/*           value={form.email}*/}
            {/*           placeholder={"E-mail"}*/}
            {/*           onChange={changeHandler}*/}
            {/*    />*/}

            {/*    <input id={"password"}*/}
            {/*           type={"password"}*/}
            {/*           name={"password"}*/}
            {/*           value={form.password}*/}
            {/*           placeholder={"Пароль"}*/}
            {/*           onChange={changeHandler}*/}
            {/*    />*/}
            {/*</div>*/}

            {/*<div>*/}
            {/*    <button onClick={registerHandler} disabled={loading}>Зарегистрироваться</button>*/}
            {/*</div>*/}
            <ToastContainer />
        </div>
    )
}