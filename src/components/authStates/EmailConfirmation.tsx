import React, {useContext, useEffect} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import {validate} from "../../utils/validation";
import {AuthContext} from "../../context/AuthContext";

type EmailConfirmationProps = {
    email: string
}

export const EmailConfirmation = ({email}: EmailConfirmationProps) => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const formik = useFormik({
        initialValues: {
            code: "",
        },
        validateOnChange: false,
        validateOnBlur: false,
        validationSchema: Yup.object({
            code: Yup.string()
                .required("Код подтверждения является обязательным полем")
        }),
        onSubmit: async () => {
            try {
                const data = await request("/api/auth/confirm", "POST", {...formik.values, email});
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
            <form onSubmit={formik.handleSubmit}>
                Код подтверждения для {email}:<br/>
                <input type={"text"} {...formik.getFieldProps("code")}/>
                <button type={"submit"}
                        onClick={async () => await validate(formik, message)}
                        disabled={loading}>Подтвердить</button>
            </form>
        </>
    )
}