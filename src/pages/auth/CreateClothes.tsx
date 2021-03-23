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
    const [form, setForm] = useState({ category: "", season: "", image: "" });

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

    const creatingHandler = async () => {
        try {
            const data = await request("/api/clothes/create", "POST", {...form}, {
                Authorization: `Bearer ${auth.token}`
            });
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
                   type={"text"}
                   name={"image"}
                   value={form.image}
                   placeholder={"Изображение"}
                   onChange={changeHandler}
            />

            <button onClick={creatingHandler} disabled={loading}>Создать</button>

            <ToastContainer />
        </div>
    )
}