import React, {useCallback, useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {ClothesType} from "./Clothes";
import {useMessage} from "../../hooks/message.hook";
import {ToastContainer} from "react-toastify";
import Loader from "react-loader-spinner";
type ClothesParams = { id: string };

export const ClothesDetail = () => {
    const auth = useContext(AuthContext);
    const [clothes, setClothes] = useState(null as ClothesType);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const clothesId = (useParams() as ClothesParams).id;

    const getClothesDetail = useCallback(async () => {
        try {
            const response = await request(`/api/clothes/${clothesId}`, "GET", null, {
                Authorization: `Bearer ${auth.token}`
            });
            setClothes(response);
        } catch (e) {}
    }, [auth.token, request, clothesId]);

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        getClothesDetail();
    }, [getClothesDetail])

    if (loading) {
        return <Loader
            type="Audio"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
        />
    }

    return (
        <div>
            <div>
                {clothes?.id}
                <img alt={""} src={clothes?.image} style={{ width: "300px" }}/>
                <div>{clothes?.category}, {clothes?.season}</div>
            </div>

            <ToastContainer />
        </div>
    )
}