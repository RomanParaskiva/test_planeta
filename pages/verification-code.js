import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import authContext from '../context/authContext'


const VerificationCode = () => {

  const router = useRouter(),
    { auth: { addChar, deleteChar, code, userId, setCode } } = useContext(authContext)

  useEffect(() => {
    !userId && router.push('/')
  })

  useEffect(() => {
    if (code.length == 6) {
      sendCode()
    }
  }, [code])

  const sendCode = async () => {
    const str = `${code.slice(0, 3)}-${code.slice(3)}`
    await setCode(str)

    const res = await fetch('https://test.it-planet.org/sso/signup/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        confirmationCode: str
      })
    })

    if (res.status == 200) router.push('/user-activate')

  }

  useEffect(() => {
    const numberCodeForm = document.querySelector('[data-number-code-form]')
    const numberCodeInputs = [...numberCodeForm.querySelectorAll('[data-number-code-input]')]

    const handleInput = async ({ target }) => {
      if (!target.value.length) { return target.value = null }

      const inputLength = target.value.length
      let currentIndex = Number(target.dataset.numberCodeInput)

      if (inputLength > 1) {
        const inputValues = target.value.split('')

        inputValues.forEach((value, valueIndex) => {
          const nextValueIndex = currentIndex + valueIndex

          if (nextValueIndex >= numberCodeInputs.length) { return }

          numberCodeInputs[nextValueIndex].value = value
        })

        currentIndex += inputValues.length - 2
      }

      const nextIndex = currentIndex + 1

      await addChar(target.value)

      if (nextIndex < numberCodeInputs.length) {
        numberCodeInputs[nextIndex].focus()
        numberCodeInputs[nextIndex].removeAttribute('readOnly')
        numberCodeInputs[currentIndex].setAttribute('readOnly', true)
      }

    }

    const handleKeyDown = async e => {
      const { code, target } = e

      const currentIndex = Number(target.dataset.numberCodeInput)
      const previousIndex = currentIndex - 1

      const hasPreviousIndex = previousIndex >= 0

      switch (code) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          break

        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault()
          break
        case 'Backspace':
          if (!e.target.value.length && hasPreviousIndex) {
            numberCodeInputs[previousIndex].value = null
            numberCodeInputs[previousIndex].focus()
            numberCodeInputs[currentIndex].setAttribute('readOnly', true)
            numberCodeInputs[previousIndex].removeAttribute('readOnly')
            await deleteChar()
          }
          break
        default:
          break
      }
    }
    numberCodeForm.addEventListener('input', handleInput)
    numberCodeForm.addEventListener('keydown', handleKeyDown)
  })
  return (
    <div className="container">
      <div className="code-form__wrapper">
        <span>Введите код подтверждения</span>
        <span className="text-bold">Мы отправили письмо на email</span>
        <form>
          <fieldset name='number-code' data-number-code-form>
            <input type="number" min='0' max='9' name='number-code-0' data-number-code-input='0' required placeholder='0' />
            <input type="number" min='0' max='9' name='number-code-1' data-number-code-input='1' required placeholder='0' readOnly />
            <input type="number" min='0' max='9' name='number-code-2' data-number-code-input='2' required placeholder='0' readOnly />
            <input type="text" name='number-code-3' required readOnly value={'-'} />
            <input type="number" min='0' max='9' name='number-code-3' data-number-code-input='3' required placeholder='0' readOnly />
            <input type="number" min='0' max='9' name='number-code-4' data-number-code-input='4' required placeholder='0' readOnly />
            <input type="number" min='0' max='9' name='number-code-5' data-number-code-input='5' required placeholder='0' readOnly />
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default VerificationCode

