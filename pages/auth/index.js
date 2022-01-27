import { useState } from "react"
import useHttp from "../../hooks/http.hook"

import RegisterForm from "../../components/auth/RegisterForm"
import LoginForm from "../../components/auth/LoginForm"


const AuthPage = () => {
    const [formState, setFormState] = useState(true),
        [form, setForm] = useState({
            email: '',
            password: ''
        }),
        { request } = useHttp()

    const handleForm = async (e) => {
       await setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleFormState = async () => {
      await setFormState(!formState)
    }

    const regRequest = async () => {
        const res = await request('/api/auth/register', {...form})

        console.log(res)
    }

    const loginRequest = async () => {
        const res = await request('/api/auth/login', {...form})

        console.log(res)
    }

    return (
        <div className="container">
            <div className="auth-form__wrapper">
                <div className="auth-form__top">
                    <a onClick={handleFormState} href="#">Регистрация</a>
                    <a onClick={handleFormState} href="#">Войти</a>
                </div>
                {formState ? <RegisterForm props={{ handleForm, regRequest}} /> : <LoginForm props={{ handleForm, loginRequest }} />}
            </div>
        </div>
    )
}

export default AuthPage