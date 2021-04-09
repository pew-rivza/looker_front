import {FormikProps} from "formik";
import React from "react";

export async function validate(formik: FormikProps<any>, messageCallback: (text: string | JSX.Element) => void): Promise<void> {
    const errors = await formik.validateForm();

    if (Object.keys(errors).length) {
        const text = <div>
                {
                    Object.values(errors).map((error, i) =>
                        <div key={i}>- {error}</div>
                    )
                }
            </div>;

        messageCallback(text)
    }
}