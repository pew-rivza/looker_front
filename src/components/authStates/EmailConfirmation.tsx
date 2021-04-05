import React, {useEffect} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";

export const EmailConfirmation = () => {
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
                .length(5, "Код подтверждения должен быть пятизначным")
                .matches(/^\d{5}$/g, "код подтверждение должен состоять только из цифр")
                .required("Код подтверждения является обязательным полем")
        }),
        onSubmit: async () => {
            console.log("submitted!");

            // try {
            //     const data = await request("/api/auth/register", "POST", {...formik.values});
            //     message(data.message);
            // } catch (e) {}
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

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <input type={"number"} {...formik.getFieldProps("code")}/>
                <button type={"submit"} onClick={validateForm} disabled={loading}>Подтвердить</button>
            </form>
        </>
    )
}