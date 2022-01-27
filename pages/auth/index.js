import { useState } from "react"
import Link from "next/link"
import Input from "../../components/Input"


const AuthPage = () => {
    const [formState, setFormState] = useState(true),
        [form, setForm] = useState({
            email: '',
            password: ''
        })

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleFormState = () => {
        setFormState(!formState)
    }
    return (
        <div className="container">
            <div className="auth-form__wrapper">
                <div className="auth-form__top">
                    <a onClick={handleFormState} href="#">Регистрация</a>
                    <a onClick={handleFormState} href="#">Войти</a>
                </div>
                <form>
                    <Input
                        type={'email'}
                        name={'email'}
                        label={'E-mail'}
                        callback={handleForm}
                    />
                    <Input
                        type={'password'}
                        name={'password'}
                        label={'Пароль'}
                        callback={handleForm}
                    />
                    <Input
                        type={'password'}
                        name={'passwordConfim'}
                        label={'Повторите пароль'}
                        callback={handleForm}
                    />
                    <button className="btn btn-grey">Регистрация</button>
                    <div className="checkbox__wrapper">
                        <label for="newsletter">
                            <input type="checkbox" id="newsletter" name="newsletter" value={false} />
                            <div className="checkbox-mimic">
                                <img src="/chk-checked.svg" alt="" />
                            </div>
                            <span>Соглашаюсь на получение рассылки по электронной почте</span>
                        </label>
                    </div>

                    <div className="checkbox__wrapper">
                        <label for="newsletter">
                            <input type="checkbox" id="newsletter" name="newsletter" value={false} />
                            <div className="checkbox-mimic">
                                <img src="/chk-checked.svg" alt="" />
                            </div>
                            <span>Соглашаюсь с <Link href={'#'}>политикой обработки персональных данных</Link></span>
                        </label>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AuthPage