import React, {useEffect} from "react";
import {useFormik} from "formik";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import {Link, useHistory} from "react-router-dom";
import {validate} from "../../utils/validation";
import {registrationConfig} from "../../formicConfigs/auth/registration.config";
import { encode } from 'js-base64';

export const Registry = () => {
    const history = useHistory();
    const message = useMessage();
    const {loading, error, clearError, request} = useHttp();
    const formik = useFormik({
        ...registrationConfig,
        onSubmit: async () => {
            try {
                let response = await request("/api/user/", "POST", {...formik.values});
                const hashedUser = encode(JSON.stringify({...response.data, isNewPassword: false}));
                history.push(`/confirmation/${hashedUser}`);
            } catch (e) {}
        },
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

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