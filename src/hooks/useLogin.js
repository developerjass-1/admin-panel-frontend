import { useState } from 'react'
import { login } from '../services/api'
import { toast } from 'react-toastify'

export default function useLogin() {
    const[loading, setLoading] = useState(false)
    const[error, setError] = useState(null)

    const dologin = async({username,password})=>{
      setLoading(true)
      setError(null)
        try {
          const res = await login(username,password)
          const accesstoken = localStorage.setItem("accessToken", res.data.tokens.access)
          const user = localStorage.setItem("user", res.data.user.username)
        console.log(res.data)
        console.log(res.data.user.username)
        toast.success(res.message)
        return res
        } catch (err) {
      // axios error handling
      if (err.detail) {
        setError(err.detail) 
        toast.error(err.detail)// from DRF
      } else if (err.message) {
        setError(err.message)
        toast.error(err.message) // JS error
      } else {
        setError("An unknown error occurred")
      }
      return null
        }finally{
          setLoading(false)
        }
    }
  return {dologin, loading, error}
}
