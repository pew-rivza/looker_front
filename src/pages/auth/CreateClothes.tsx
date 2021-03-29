import React, {useContext, useEffect, useState} from "react";
import {useMessage} from "../../hooks/message.hook";
import {useHttp} from "../../hooks/http.hook";
import {ToastContainer} from "react-toastify";
import {AuthContext} from "../../context/AuthContext";
import {useHistory} from "react-router-dom";

export const CreateClothes = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({ category: "", season: "" });
    const [image, setImage] = useState<File>();

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm(state => ({
            ...state,
            [event.target.name]: event.target.value
        }));
    };

    const changeFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filesList = event.target.files;

        if (!filesList) return;

        setImage(filesList[0]);
    }

    const creatingHandler = async () => {
        try {
            const formData = new FormData();
            formData.append('clothesImage', image as File);
            for (let key of Object.keys(form) as Array<"category" | "season">) {
                formData.append(key, form[key])
            }

            const data = await request("/api/clothes/create", "POST", formData, {
                "Authorization": `Bearer ${auth.token}`
            }, false);

            history.push(`/clothes/detail/${data.clothes.id}`)
        } catch (e) {}
    }

    return (
        <div>
            <input id={"category"}
                   type={"text"}
                   name={"category"}
                   value={form.category}
                   placeholder={"Категория"}
                   onChange={changeHandler}
            />

            <input id={"season"}
                   type={"text"}
                   name={"season"}
                   value={form.season}
                   placeholder={"Сезон"}
                   onChange={changeHandler}
            />

            <input id={"image"}
                   type={"file"}
                   name={"image"}
                   onChange={changeFileHandler}
            />

            <button onClick={creatingHandler} disabled={loading}>Создать</button>

            <ToastContainer />
        </div>
    )
}