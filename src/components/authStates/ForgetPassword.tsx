import React, {useEffect} from "react";
import {useFormik} from "formik";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import {validate} from "../../utils/validation";
import {Link, useHistory} from "react-router-dom";
import {forgetPasswordConfig} from "../../formicConfigs/auth/forgetPassword.config";
import {encode} from "js-base64";

export const ForgetPassword = () => {
    const history = useHistory();
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const formik = useFormik({
       ...forgetPasswordConfig,
        onSubmit: async () => {
            try {
                const responseUser = await request(`/api/user/${formik.values.email}`, "GET");
                const responseConfirmation = await request(`/api/user/${responseUser.data.id}/confirmation`, "GET");

                message(responseConfirmation.message);

                const userData = {
                    id: responseUser.data.id,
                    email: formik.values.email,
                };
                const hashedUser = encode(JSON.stringify({
                    ...userData,
                    redirect: `/password/${encode(JSON.stringify(userData))}`,
                }));

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