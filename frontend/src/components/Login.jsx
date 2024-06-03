import { useState } from 'react';
import './Login.css';



const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      const data = await response.json();
      if (response.ok) {
        alert('Login successful');
        localStorage.setItem('token', data.token);
     
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="main">
      <div className="login">
        <form onSubmit={handleLogin}>
          <label htmlFor="chk" aria-hidden="true">Login</label>
          <input type="email" name="email" placeholder="Email" required value={loginData.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required value={loginData.password} onChange={handleChange} />
          <button type="submit">Login</button>
        </form>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Login;