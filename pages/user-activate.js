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

  
  const activateAcc = async (e) => {
    e.preventDefault()
    console.log( userId, code,
      form)
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
    <div className="container">
      
      <div className="auth-form__wrapper">
      <h4 className="text-bold">Заполните информацию о себе</h4>
        <form>
          <Input
            name={'firstname'}
            label={'Имя'}
            onChange={handleForm}
          />

          <Input
            name={'lastname'}
            label={'Фамилия'}
            onChange={handleForm}
          />

          <Input
            name={'login'}
            label={'Логин'}
            onChange={handleForm}
          />

          <button type="submit" onClick={activateAcc} className="btn btn-grey">Создать профиль</button>
        </form>
      </div>
    </div>
  )
}

export default UserActivate