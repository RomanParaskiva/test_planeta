import { useEffect, useState } from 'react'
import useHttp from '../../hooks/http.hook'
const VerificationCode = () => {

  const [code, setCode] = useState(''),
    { request } = useHttp()
  const handleForm = async ({ target }) => {
    if (target.dataset.numberCodeInput >= code.length) {
     await setCode(code + target.value)
    }

    if (code.length == 6) {
      sendCode()
    }
  }

  const sendCode = async () => {
    const str = `${ code.slice(0,3)}-${ code.slice(4)}`

    alert(str)

  }

  useEffect(() => {
    const numberCodeForm = document.querySelector('[data-number-code-form]')
    const numberCodeInputs = [...numberCodeForm.querySelectorAll('[data-number-code-input]')]

    const handleInput = ({ target }) => {
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

      if (nextIndex < numberCodeInputs.length) {
        numberCodeInputs[nextIndex].focus()
      }
    }

    const handleKeyDown = e => {
      const { code, target } = e

      const currentIndex = Number(target.dataset.numberCodeInput)
      const previousIndex = currentIndex - 1
      const nextIndex = currentIndex + 1

      const hasPreviousIndex = previousIndex >= 0
      const hasNextIndex = nextIndex <= numberCodeInputs.length - 1

      switch (code) {
        case 'ArrowLeft':
        case 'ArrowUp':
          if (hasPreviousIndex) {
            numberCodeInputs[previousIndex].focus()
          }
          e.preventDefault()
          break

        case 'ArrowRight':
        case 'ArrowDown':
          if (hasNextIndex) {
            numberCodeInputs[nextIndex].focus()
          }
          e.preventDefault()
          break
        case 'Backspace':
          if (!e.target.value.length && hasPreviousIndex) {
            numberCodeInputs[previousIndex].value = null
            numberCodeInputs[previousIndex].focus()
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
            <input onInput={handleForm} type="number" min='0' max='9' name='number-code-0' data-number-code-input='0' required placeholder='0' />
            <input onInput={handleForm} type="number" min='0' max='9' name='number-code-1' data-number-code-input='1' required placeholder='0' />
            <input onInput={handleForm} type="number" min='0' max='9' name='number-code-2' data-number-code-input='2' required placeholder='0' />
            <input type="text" name='number-code-3' required readOnly value={'-'} />
            <input onInput={handleForm} type="number" min='0' max='9' name='number-code-3' data-number-code-input='3' required placeholder='0' />
            <input onInput={handleForm} type="number" min='0' max='9' name='number-code-4' data-number-code-input='4' required placeholder='0' />
            <input onInput={handleForm} type="number" min='0' max='9' name='number-code-5' data-number-code-input='5' required placeholder='0' />
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default VerificationCode

// export async function getServerSideProps(ctx) {
//   return {
//     props: {
//       ctx
//     }
//   }
// }