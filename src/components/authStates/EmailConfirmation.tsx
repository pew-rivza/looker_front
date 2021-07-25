import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import {validate} from "../../utils/validation";
import {useHistory} from "react-router-dom";
import {useParams} from "react-router-dom";
import { decode } from 'js-base64';
import {confirmationConfig} from "../../formikConfigs/auth/confirmation.config";

export const EmailConfirmation = () => {
    const history = useHistory();
    let { user } = useParams() as any;
    const { email, id, redirect } = JSON.parse(decode(user));
    const [timeLeft, setTimeLeft] = useState(0);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const formik = useFormik({
        ...confirmationConfig,
        onSubmit: async () => {
            try {
                const response = await request(`/api/user/${id}/confirmation`, "POST", {...formik.values});
                message(response.message);
                if (redirect) history.push(redirect);
            } catch (e) {}
        },
    });

    useEffect(() => {
        setTimeLeft(10);
    }, []);

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
        const response = await request(`/api/user/${id}/confirmation`, "GET");
        message(response.message);
        setTimeLeft(10);
    }

    return (
        <>
            <h2>Подтверждение учетной записи</h2>
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