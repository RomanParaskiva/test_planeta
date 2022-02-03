import { useState, useEffect } from "react"
import { useRouter } from "next/router"

const useAuth = () => {
    const [email, setEmail] = useState(null),
        [userId, setUserId] = useState(null),
        [code, setCode] = useState(''),
        router = useRouter()

    useEffect(() => {
       localStorage.getItem('access_token') && router.push('/core')
       !localStorage.getItem('access_token') && router.push('/')
    }, [email])

    const addChar = async (char) => { await setCode(code + char) }
    const deleteChar = async () => { await setCode(code.substring(0, code.length - 1)) }

    const login = async (obj) => { 
             setUserId(obj.id)
             setEmail(obj.username)
             localStorage.setItem('access_token', obj.token)      
    }

    const logout = () => { }

    const saveId = (id) => {
        setUserId(id)
    }

    return { auth: { login, logout, saveId, userId, email, addChar, deleteChar, code, setCode } }
}

export default useAuth