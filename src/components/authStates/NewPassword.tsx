import React, {useEffect} from "react";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import {useFormik} from "formik";
import {validate} from "../../utils/validation";
import {useHistory, useParams} from "react-router-dom";
import {decode} from "js-base64";
import {newPasswordConfig} from "../../formicConfigs/auth/newPassword.config";

export const NewPassword = () => {
    const history = useHistory();
    let { user } = useParams() as any;
    const { email, id } = JSON.parse(decode(user));
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const formik = useFormik({
        ...newPasswordConfig,
        onSubmit: async () => {
            try {
                const response = await request(`/api/user/${id}`, "PATCH", {...formik.values});
                message(response.message);
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
            <div onClick={() => history.goBack()}>
                Назад
            </div>
        </>
    )
}