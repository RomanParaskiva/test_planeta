import { useState, useEffect } from "react"
const useHttp = () => {
  const [loading, setLoading] = useState(false),
    [requestError, setRequestError] = useState(null)

  const request = async (url, method = 'GET', body = null) => {
    try {
      setLoading(true)

      const token = localStorage.getItem('access_token') || ''

      const res = await fetch(url, {
        method,
        body,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (res.status == 401) {
        localStorage.removeItem('access_token')
        setLoading(false)
      }

      if (!res.ok) {
        setRequestError(res.error)
        setLoading(false)
      }
     
      const json = await res.json()
      setLoading(false) 
      return json

    } catch (e) {
      console.log(e)
    }
  }

  return { request, loading, requestError }
}

export default useHttp