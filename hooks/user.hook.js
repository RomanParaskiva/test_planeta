import { useState, useEffect, useCallback } from "react"

const useUser = () => {
    const [user, setUser] = useState(null)

    useEffect(useCallback(() => {
        getUser()
    }), [])

    const getUser = async () => {
        const res = await fetch('https://test.it-planet.org/user/profile/personal', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })

        if (res.ok) {
            const json = await res.json()
            console.log(json)
            await setUser(json)
        } else {
            localStorage.removeItem('access_token')
        }

    }


    return { user }
}

export default useUser