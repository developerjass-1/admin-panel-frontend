import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate()
    const user = localStorage.getItem("user")
  return (
    <div className='container'>
        <h1 className='mb-3 text-center'>Dashboard</h1>
        <h2 className='text-center'>Welcome {user}</h2>

        <div className='text-center'><button  onClick={()=>{localStorage.clear(); navigate('/')}}>Logout</button></div>
    </div>
  )
}
