import React, {useContext, useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import {validate} from "../../utils/validation";
import {AuthContext} from "../../context/AuthContext";
import {NewPassword} from "./NewPassword";

type EmailConfirmationProps = {
    email: string,
    entity: string
}

export const EmailConfirmation = ({email, entity}: EmailConfirmationProps) => {
    const auth = useContext(AuthContext);
    const [newPassword, setNewPassword] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const formik = useFormik({
        initialValues: {
            code: "",
        },
        validateOnChange: false,
        validateOnBlur: false,
        validateOnMount: false,
        validationSchema: Yup.object({
            code: Yup.string()
                .required("Код подтверждения является обязательным полем")
        }),
        onSubmit: async () => {
            try {
                const data = await request(`/api/auth/${entity}/confirm`, "POST", {...formik.values, email});
                if (entity === "register") auth.login(data.token, data.user);
                if (entity === "forget") setNewPassword(true);
            } catch (e) {}
        },
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        const timer = setTimeout(() => setTimeLeft(prevState => {
            if (prevState) {
                clearTimeout(timer);
                return prevState - 1;
            }
            return 0;
        }), 1000);

        return () => clearTimeout(timer);
    }, [timeLeft])

    const resendCode = async () => {
        const data = await request("/api/auth/resend", "POST", { email });
        message(data.message);
        setTimeLeft(10);
    }

    if (newPassword) return <NewPassword email={email}/>

    return (
        <>
            <h2>Подтверждение пароля</h2>
            <form onSubmit={formik.handleSubmit}>
                Код подтверждения для {email}:<br/>
                <input type={"text"} {...formik.getFieldProps("code")}/>
                <button type={"submit"}
                        onClick={async () => await validate(formik, message)}
                        disabled={loading}>Подтвердить</button>
            </form>

            {
                timeLeft
                    ? <div>Отправить код повторно через {timeLeft} сек.</div>
                    : <button onClick={resendCode}>Отправить код повторно</button>
            }

            <div onClick={() => window.location.reload()}>
                Назад
            </div>
        </>
    )
}