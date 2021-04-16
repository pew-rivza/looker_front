import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import {validate} from "../../utils/validation";
import {Link} from "react-router-dom";
import {EmailConfirmation} from "./EmailConfirmation";

export const ForgetPassword = () => {
    const [confirmation, setConfirmation] = useState(false);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validateOnChange: false,
        validateOnBlur: false,
        validateOnMount: false,
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Некорректный e-mail")
                .required("E-mail является обязательным полем"),
        }),
        onSubmit: async () => {
            try {
                await request("/api/auth/forget", "POST", {...formik.values});
                setConfirmation(true);
            } catch (e) {}
        },
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    if (confirmation) return <EmailConfirmation email={formik.values.email} entity={"forget"}/>

    return (
        <>
            <h2>Восстановление пароля</h2>
            <form onSubmit={formik.handleSubmit}>
                <input type={"text"} {...formik.getFieldProps("email")}/>
                <button type={"submit"}
                        onClick={async () => await validate(formik, message)}
                        disabled={loading}>Далее</button>
            </form>

            <Link to={"/login"}>Войти в Looker</Link>
        </>
    )
}