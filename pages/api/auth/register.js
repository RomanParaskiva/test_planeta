import validator from 'validator'
const handler = async (req, res) => {
    try {
        if (!req.body) {
            throw new Error('Неверные данные')
        }
        console.log(req)
        const { email, password, passwordConfim, mailing } = req.body

        if (!validator.isEmail(email)) throw new Error('Некорректный емейл')

        if (password !== passwordConfim) throw new Error('Пароли не совпадают')

        const response = await fetch('https://test.it-planet.org/sso/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              }
              , 
              body : JSON.stringify({username: email, password, mailing})
        })

        if(response.status == 200) res.status(200).json(res.body)

        throw new Error('Серверная ошибка')
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default handler