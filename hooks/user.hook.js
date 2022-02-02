import { useState, useEffect, useCallback } from "react"

import useHttp from './http.hook'

const useUser = () => {
    const [user, setUser] = useState(null),
    [statuses, setStatuses] = useState([]),
    { request } = useHttp()

    useEffect(useCallback(() => {
       localStorage.getItem('access_token') ? getUser() : ''
       if(localStorage.getItem('access_token')){
        getStatuses()
       }
    }), [])

    const getUser = async () => {
        const res = await request('https://test.it-planet.org/user/profile/personal')

        if (res.code == '001-003'){
                localStorage.removeItem('access_token')
        }

      if (res) await setUser(res) 
    }

    const getStatuses = async () => {
        const res = await request('https://test.it-planet.org/user/dict/person-status')
       
        setStatuses(res)
    }

    return { appUser: { user, statuses, getUser }}
}

export default useUser