import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {Users} from "./pages/auth/Users";
import {Auth} from "./pages/auth/Auth";
import {Clothes} from "./pages/auth/Clothes";
import {CreateClothes} from "./pages/auth/CreateClothes";
import {ClothesDetail} from "./pages/auth/ClothesDetail";

export const  useRoutes = (isAuth: boolean) => {
    if (isAuth) {
        return (
            <Switch>
                <Route path={"/users"} exact>
                    <Users/>
                </Route>
                <Route path={"/clothes"} exact>
                    <Clothes/>
                </Route>
                <Route path={"/clothes/create"} exact>
                    <CreateClothes/>
                </Route>
                <Route path={"/clothes/detail/:id"} exact>
                    <ClothesDetail/>
                </Route>
                <Redirect to={"/users"} />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path={"/auth"} exact>
                <Auth/>
            </Route>
            <Redirect to={"/auth"} />
        </Switch>
    )
}