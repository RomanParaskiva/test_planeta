import Input from "../Input"

const LoginForm = ({ props: { handleForm, loginRequest } }) => {
  return (
    <form autoComplete="off">
      <Input
        type={'email'}
        name={'email'}
        label={'E-mail'}
        onChange={handleForm}
      />
      <Input
        type={'password'}
        name={'password'}
        label={'Пароль'}
        onChange={handleForm}
      />

      <button type="submit" onClick={loginRequest} className="btn btn-grey">Вход</button>

    </form>
  )
}

export default LoginForm