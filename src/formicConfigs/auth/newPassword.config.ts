import * as Yup from "yup";

export const newPasswordConfig = {
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
};