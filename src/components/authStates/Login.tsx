import React from "react";

export const Login = () => {
    return (
        <>
            <form>
                <input type={"email"}/>
                <input type={"password"}/>
                <button type={"submit"}>Войти</button>
            </form>

            <a href={"/"}>Забыли пароль</a>
            <a href={"/"}>Регистрация</a>

            <div>
                Соцсети
            </div>
        </>
    )
}