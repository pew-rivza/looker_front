import {createContext} from "react";

function loginNoop(token: any, userId: any) {}
function logoutNoop() {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: loginNoop,
    logout: logoutNoop,
    isAuth: false
})