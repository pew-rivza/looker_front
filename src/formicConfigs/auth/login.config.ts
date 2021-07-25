import * as Yup from "yup";

export const loginConfig = {
    initialValues: {
        email: "",
        password: ""
    },
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    validationSchema: Yup.object({
        email: Yup.string()
            .email("Некорректный e-mail")
            .required("E-mail является обязательным полем"),
        password: Yup.string()
            .required("Пароль является обязательным полем"),
    }),
};