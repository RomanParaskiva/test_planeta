const useHttp = () => {
  
  const request = async (url, method = 'GET', data = null) => {
    try{
      const token = localStorage.getItem('access_token') || ''
      const res = await fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

        if(res.status == 200) {
          const json = await res.json()

          return json
        } 

    } catch(e){
      console.log(e)
    }
  }

  return {request}
}

export default useHttp