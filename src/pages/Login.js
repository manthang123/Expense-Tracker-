import React from 'react'
import Template from '../components/Template'
import loginImg from "../assets/login.png"

const Login = ({setIsLoggedIn}) => {
  return (
    <Template
      title="Welcome Back"
      desc1="Empowering students with financial literacy for a secure future.."
      desc2="Master your finances, secure your future.."
      image={loginImg}
      formType="login"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Login
