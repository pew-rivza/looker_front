import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {Clothes} from "./pages/auth/Clothes";
import {CreateClothes} from "./pages/auth/CreateClothes";
import {ClothesDetail} from "./pages/auth/ClothesDetail";
import {Login} from "./components/authStates/Login";
import {Registration} from "./components/authStates/Registration";
import {ForgetPassword} from "./components/authStates/ForgetPassword";
import {EmailConfirmation} from "./components/authStates/EmailConfirmation";
import {NewPassword} from "./components/authStates/NewPassword";

export const  useRoutes = (isAuth: boolean) => {
    if (isAuth) {
        return (
            <Switch>
                <Route path={"/clothes"} exact>
                    <Clothes/>
                </Route>
                <Route path={"/clothes/create"} exact>
                    <CreateClothes/>
                </Route>
                <Route path={"/clothes/detail/:id"} exact>
                    <ClothesDetail/>
                </Route>
                <Redirect to={"/clothes"} />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path={"/login"} exact>
                <Login/>
            </Route>
            <Route path={"/confirmation/:user"} exact>
                <EmailConfirmation />
            </Route>
            <Route path={"/password/:user"} exact>
                <NewPassword />
            </Route>
            <Route path={"/registration"} exact>
                <Registration/>
            </Route>
            <Route path={"/forget"} exact>
                <ForgetPassword/>
            </Route>
            <Redirect to={"/login"} />
        </Switch>
    )
}