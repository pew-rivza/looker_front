import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import {Link} from "react-router-dom";
import {EmailConfirmation} from "./EmailConfirmation";
import {validate} from "../../utils/validation";

export const Registry = () => {
    const [confirmation, setConfirmation] = useState(false);
    const message = useMessage();
    const {loading, error, clearError, request} = useHttp();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            passwordConfirmation: ""
        },
        validateOnChange: false,
        validateOnBlur: false,
        validateOnMount: false,
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Некорректный e-mail")
                .required("E-mail является обязательным полем"),
            password: Yup.string()
                .required("Пароль является обязательным полем")
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                    "Пароль должен содержать минимум 6 символов, один заглавный символ, один строчный символ, одну " +
                    "цифру и один специальный символ (@, $, !, %, *, #, ?, &)"
                ),
            passwordConfirmation: Yup.string()
                .required("Подтверждение пароля является обязательным полем")
                .oneOf([Yup.ref("password")], "Пароли должны совпадать")
        }),
        onSubmit: async () => {
            try {
                await request("/api/auth/register", "POST", {...formik.values});
                setConfirmation(true);
            } catch (e) {}
        },
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    if (confirmation) return <EmailConfirmation email={formik.values.email} entity={"register"}/>

    return (
        <>
            <h2>Регистрация</h2>
            <form onSubmit={formik.handleSubmit}>
                <input type={"text"} {...formik.getFieldProps("email")}/>
                <input type={"password"} {...formik.getFieldProps("password")}/>
                <input type={"password"} {...formik.getFieldProps("passwordConfirmation")}/>
                <button type={"submit"}
                        onClick={async () => await validate(formik, message)}
                        disabled={loading}>Зарегистрироваться</button>
            </form>
            <Link to={"/login"}>У меня уже есть аккаунт</Link>
        </>
    )
}