import * as Yup from "yup";

export const forgetPasswordConfig = {
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
};