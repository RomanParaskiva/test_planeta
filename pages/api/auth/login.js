import NextCors from 'nextjs-cors'
import validator from "validator"

const handler = async (req, res) => {
    try {

        await NextCors(req, res, {
            // Options
            methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        })

        if (!req.body) {
            throw new Error('Неверные данные')
        }

        const { email, password } = req.body

        if (!validator.isEmail(email)) throw new Error('Некорректный емейл')
        
        const response = await fetch('https://test.it-planet.org/sso/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: email, password })
        })

        res.status(response.status).json(response.body)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default handler