import Input from "../Input"
import Checkbox from "../Checkbox"

const RegisterForm = ({props: { handleForm, regRequest }}) => {
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
      <Input
        type={'password'}
        name={'passwordConfim'}
        label={'Повторите пароль'}
        onChange={handleForm}
      />
      <button type="submit" onClick={regRequest} className="btn btn-grey">Регистрация</button>

      <Checkbox
        name={'mailing'}
        text={'Соглашаюсь на получение рассылки по электронной почте'}
        onChange={handleForm}
      />

      <Checkbox
        name={'policy'}
        text={'Соглашаюсь с <a>политикой обработки персональных данных</a>'}
        onChange={handleForm}
      />
    </form>
  )
}

export default RegisterForm