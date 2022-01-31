import { useState, useEffect, useCallback } from "react"

import useHttp from './http.hook'

const useUser = () => {
    const [user, setUser] = useState(null),
    [statuses, setStatuses] = useState(null),
    { request } = useHttp()

    useEffect(useCallback(() => {
       localStorage.getItem('access_token') ? getUser() : ''
       localStorage.getItem('access_token') ? getStatuses() : ''
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

    const getStatuses = async () => {
        const res = await request('https://test.it-planet.org/user/dict/person-status')
        setStatuses(res)
    }


    return { user, statuses }
}

export default useUser