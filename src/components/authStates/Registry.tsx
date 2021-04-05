import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import {Link} from "react-router-dom";
import {EmailConfirmation} from "./EmailConfirmation";

export const Registry = () => {
    const [confirmation, setConfirmation] = useState(false);
    const message = useMessage();
    const {loading, error, clearError} = useHttp();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            passwordAgain: ""
        },
        validateOnChange: false,
        validateOnBlur: false,
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Некорректный e-mail")
                .required("E-mail является обязательным полем"),
            password: Yup.string()
                .required("Пароль является обязательным полем")
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                    "Пароль должен быть минимум 6 символов, один заглавный символ, один строчный символ, одну " +
                    "цифру и один специальный символ (@, $, !, %, *, #, ?, &)"
                ),
            passwordAgain: Yup.string()
                .required("Пароль еще раз является обязательным полем")
                .oneOf([Yup.ref("password")], "Пароли должны совпадать")
        }),
        onSubmit: async () => {
            setConfirmation(true);
        },
    });

    const validateForm = async () => {
        const validation = await formik.validateForm();

        if (Object.keys(validation).length) {
            const text = <div>
                Форма заполнена некорректно:<br/>

                {
                    Object.values(validation).map((error, i) =>
                        <div key={i}>- {error}</div>
                    )
                }
            </div>
            message(text)
        }
    };

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    if (confirmation) return <EmailConfirmation/>

    return (
        <>
            <h2>Регистрация</h2>
            <form onSubmit={formik.handleSubmit}>
                <input type={"text"} {...formik.getFieldProps("email")}/>
                <input type={"password"} {...formik.getFieldProps("password")}/>
                <input type={"password"} {...formik.getFieldProps("passwordAgain")}/>
                <button type={"submit"} onClick={validateForm} disabled={loading}>Зарегистрироваться</button>
            </form>
            <Link to={"/login"}>У меня уже есть аккаунт</Link>
        </>
    )
}