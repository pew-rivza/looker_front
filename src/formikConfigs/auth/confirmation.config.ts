import * as Yup from "yup";

export const confirmationConfig = {
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
};