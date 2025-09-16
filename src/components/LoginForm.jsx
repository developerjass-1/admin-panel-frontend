import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function LoginForm({onSubmit,loading,error}) {
      const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className='container'>
        <Form onSubmit={e =>{ e.preventDefault(); onSubmit({email,password})}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password}  onChange={(e)=>setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit">
       {loading ? 'Logging in…' : 'Login'}
      </Button>
      {error && <p style={{color:"red"}}>{error.message || error.toString()}</p>}
    </Form>
    </div>
  )
}
