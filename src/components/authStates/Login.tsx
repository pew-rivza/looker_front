import React, {useContext, useEffect} from "react";
import { useFormik } from 'formik';
import {useMessage} from "../../hooks/message.hook";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {Link} from "react-router-dom";
import {validate} from "../../utils/validation";
import {loginConfig} from "../../formicConfigs/auth/login.config";

export const Login = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const formik = useFormik({
        ...loginConfig,
        onSubmit: async () => {
            try {
                const response = await request("/api/user/token", "POST", {...formik.values});
                auth.login(response.data.token, response.data.userId);
            } catch (e) {}
        },
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    return (
        <>
            <h2>Вход в систему</h2>
            <form onSubmit={formik.handleSubmit}>
                <input type={"text"} {...formik.getFieldProps("email")}/>
                <input type={"password"} {...formik.getFieldProps("password")}/>
                <button type={"submit"} onClick={async () => await validate(formik, message)} disabled={loading}>Войти</button>
            </form>

            <Link to={"/forget"}>Забыли пароль</Link>
            <Link to={"/registration"}>Регистрация</Link>

            <div>
                Соцсети
            </div>
        </>
    )
}