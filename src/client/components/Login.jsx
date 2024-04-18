import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUp from './SignUp';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }
      setMessage('Login successful');
      setEmail('');
      setPassword('');
      setToken(result.token);
      localStorage.setItem('token', result.token);
      // Redirect to dashboard or another page
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="FormContainer">
  <div className="formCard">
    <div>
      <h1>Login</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            className="login"
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            className="password"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button className="subButton" type="submit">
          Login
        </button>
      </form>
      <p>{message}</p>
    </div>
  </div>
  <div className="formCard">
    <SignUp setToken={setToken} />
  </div>
</div>
  );
};

export default Login;
