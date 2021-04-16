import React, {useEffect} from "react";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import {useFormik} from "formik";
import * as Yup from "yup";
import {validate} from "../../utils/validation";
import {useHistory} from "react-router-dom";

type NewPasswordProps = {
    email: string,
}

export const NewPassword = ({ email }: NewPasswordProps) => {
    const history = useHistory();
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const formik = useFormik({
        initialValues: {
            password: "",
            passwordConfirmation: ""
        },
        validateOnChange: false,
        validateOnBlur: false,
        validateOnMount: false,
        validationSchema: Yup.object({
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
                const data = await request(`/api/auth/password`, "POST", {...formik.values, email});
                message(data.message);
                history.push("/login");
            } catch (e) {}
        },
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    return (
        <>
            <h2>Новый пароль</h2>
            <form onSubmit={formik.handleSubmit}>
                Новый пароль для {email}:<br/>
                <input type={"password"} {...formik.getFieldProps("password")}/>
                <input type={"password"} {...formik.getFieldProps("passwordConfirmation")}/>
                <button type={"submit"}
                        onClick={async () => await validate(formik, message)}
                        disabled={loading}>Сохранить</button>
            </form>
            <div onClick={() => window.location.reload()}>
                Назад
            </div>
        </>
    )
}