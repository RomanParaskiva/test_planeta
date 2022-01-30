import { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import authContext from "../context/authContext"
import Input from "../components/Input"

const UserActivate = () => {
  const { auth: { userId, code } } = useContext(authContext),
    [form, setForm] = useState({}),
    router = useRouter()

  useEffect(() => {
    if (!userId || !code) {
      router.push('/')
    }
  }, [userId, code])

  const handleForm = async ({ target }) => {
    await setForm({ ...form, [target.name]: target.value })
  }

  const activateAcc = async () => {
    const res = await fetch('https://test.it-planet.org/sso/signup/activate/personal', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        userId,
        confirmationCode: code,
        ...form
      })
    })

    if (res.ok) {
      router.push('/')
    }
  }
  return (
    <div className="contaner">
      <span>Заполните инофрмацию о себе</span>
      <div className="auth-form__wrapper">
        <form>
          <Input
            type={'text'}
            name={'firstname'}
            label={'Имя'}
            callback={handleForm}
          />

          <Input
            type={'text'}
            name={'lastname'}
            label={'Фамилия'}
            callback={handleForm}
          />

          <Input
            type={'text'}
            name={'login'}
            label={'Логин'}
            callback={handleForm}
          />

          <button type="submit" onClick={activateAcc} className="btn btn-grey">Создать профиль</button>
        </form>
      </div>
    </div>
  )
}

export default UserActivate