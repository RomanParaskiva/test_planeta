import Input from "../Input"
import Checkbox from "../Checkbox"

const RegisterForm = ({props: { handleForm, regRequest }}) => {
  return (
    <form autoComplete="off">
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
      <button type="submit" onClick={regRequest} className="btn btn-grey">Регистрация</button>

      <Checkbox
        name={'mailing'}
        text={'Соглашаюсь на получение рассылки по электронной почте'}
        callback={handleForm}
      />

      <Checkbox
        name={'policy'}
        text={'Соглашаюсь с <a>политикой обработки персональных данных</a>'}
        callback={handleForm}
      />
    </form>
  )
}

export default RegisterForm