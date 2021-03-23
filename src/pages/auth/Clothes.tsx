import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {ToastContainer} from "react-toastify";
import {AuthContext} from "../../context/AuthContext";
import Loader from "react-loader-spinner";
import {Link} from "react-router-dom";

export type ClothesType = { id: number, category: string, season: string, image: string } | null;

export const Clothes = () => {
    const auth = useContext(AuthContext);
    const [clothes, setClothes] = useState([] as Array<ClothesType>);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();

    const getClothes = useCallback(async () => {
        try {
            const data = await request("/api/clothes/", "GET", null, {
                Authorization: `Bearer ${auth.token}`
            });
            setClothes(data.clothes);
        } catch (e) {}
    }, [auth, request])

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        getClothes();
    }, [getClothes])

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
            <ul>
                {
                    clothes.map(cl =>
                        <div key={cl?.id}>
                            {cl?.id}
                            <Link to={`/clothes/detail/${cl?.id}`}><img alt={""} src={cl?.image} style={{ width: "150px" }}/></Link>
                            {cl?.category}, {cl?.season}
                        </div>
                    )
                }
            </ul>

            <ToastContainer />
        </div>
    )
}