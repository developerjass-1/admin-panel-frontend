import React from 'react';
import LoginForm from '../components/LoginForm'
import { useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

export default function LoginContainer() {
    const {dologin, loading, error} = useLogin()
    const navigate = useNavigate()
    const submitHandler =  async (data) =>{
        const result = await dologin(data)
        if(result){
            navigate('/dashboard')
        }
    }
  return (
    <LoginForm onSubmit={submitHandler} loading={loading} error={error} />
  )
}
