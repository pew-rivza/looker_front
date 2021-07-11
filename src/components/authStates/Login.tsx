import React, {useContext, useEffect} from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useMessage} from "../../hooks/message.hook";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {Link} from "react-router-dom";
import {validate} from "../../utils/validation";

export const Login = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validateOnChange: false,
        validateOnBlur: false,
        validateOnMount: false,
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Некорректный e-mail")
                .required("E-mail является обязательным полем"),
            password: Yup.string()
                .required("Пароль является обязательным полем"),
        }),
        onSubmit: async () => {
            try {
                const data = await request("/api/user/login", "POST", {...formik.values});
                auth.login(data.token, data.user);
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
            <Link to={"/registry"}>Регистрация</Link>

            <div>
                Соцсети
            </div>
        </>
    )
}