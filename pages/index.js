import { useState, useContext } from "react"
import useHttp from "../hooks/http.hook"
import { useRouter } from "next/router"

import authContext from "../context/authContext"

import RegisterForm from "../components/auth/RegisterForm"
import LoginForm from "../components/auth/LoginForm"


const AuthPage = () => {
  const [formState, setFormState] = useState(true),
    [form, setForm] = useState({
      email: '',
      password: ''
    }),
    { request, loading, requestError } = useHttp(),
    { auth: { saveId, userId, login } } = useContext(authContext),
    router = useRouter()


  const handleForm = async ({target}) => {
    await setForm({ ...form, [target.name]: target.value })
  }

  const handleFormState = async () => {
    await setFormState(!formState)
  }

  const regRequest = async (e) => {
    e.preventDefault()
    const { id } = await request('/api/auth/register', 'POST', JSON.stringify({ ...form }))
    await saveId(id)
    router.push('/verification-code')
  }

  const loginRequest = async () => {
      const res = await request('/api/auth/login', 'POST', JSON.stringify({...form}))
      login(res)
      router.push('/core/')
  }

  return (
    <div className="container">
      {loading ? (
        <img src="/loading-fast.gif" width={200} height={200} alt="" />
      ) : (
        <div className="auth-form__wrapper">
          {requestError ? <span>{requestError.message}</span> : (
            <div className="auth-form__top">
              <a onClick={handleFormState} href="#">Регистрация</a>
              <a onClick={handleFormState} href="#">Войти</a>
            </div>
          )}
          {formState ? <RegisterForm props={{ handleForm, regRequest }} /> : <LoginForm props={{ handleForm, loginRequest }} />}
        </div>
      )}
    </div>
  )
}

export default AuthPage
