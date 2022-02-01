import { useState, useEffect } from "react"
import { useRouter } from "next/router"

const useAuth = () => {
    const [email, setEmail] = useState(null),
        [userId, setUserId] = useState(null),
        [code, setCode] = useState(''),
        router = useRouter()

    useEffect(() => {
       localStorage.getItem('access_token') && router.push('/core/')
       !localStorage.getItem('access_token') && router.push('/')
    }, [email, userId])

    const addChar = async (char) => { await setCode(code + char) }
    const deleteChar = async () => { await setCode(code.substring(0, code.length - 1)) }

    const login = async (obj) => { 
        try {
            await setUserId(obj.id)
            await setEmail(obj.username)
            localStorage.setItem('access_token', obj.token)
        } catch (error) {
            console.log(error)
        }
       
    }

    const logout = () => { }

    const saveId = (id) => {
        setUserId(id)
    }

    return { auth: { login, logout, saveId, userId, email, addChar, deleteChar, code, setCode } }
}

export default useAuth