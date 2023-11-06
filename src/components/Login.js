import React from 'react'

const Login = () => {
  const sendLogin = () => {
    return;
  }
  return (
    <>
      <h3>Login</h3>
      <form action="#" onSubmit={sendLogin}>
        <div>
          <label htmlFor="login-username">UserName</label>
          <input type="text" id="login-username"/>
        </div>
        <div>
          <label htmlFor="login-password">Password</label>
          <input type="password" id="login-password"/>
        </div>
        <input type="button" value="Submit"/>
      </form>
    </>
  )
}

export default Login