import { useState } from 'react';
import "./SignUp.css"

const Signup = () => {

  const [signupData, setSignupData] = useState({ username: '', email: '', password: '', role: 'member' });
  const [error, setError] = useState('');

  const handleChange = (e, setState) => {
    setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData)
      });
      
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        alert(data.message);
      } else {
        setError(data.message);
      }
    } catch (err) {
        console.log(err);
      setError('Server error');
    }
  };


  return (
    <div className="main">
   
      <div className="signup">
        <form onSubmit={handleSignup}>
          <label htmlFor="chk" aria-hidden="true">Sign up</label>
          <input type="text" name="username" placeholder="User name" required value={signupData.username} onChange={(e) => handleChange(e, setSignupData)} />
          <input type="email" name="email" placeholder="Email" required value={signupData.email} onChange={(e) => handleChange(e, setSignupData)} />
          <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <select name="role" required value={signupData.role} onChange={(e) => handleChange(e, setSignupData)} style={{width:"100px"}} >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
          </div>
        
          <input type="password" name="password" placeholder="Password" required value={signupData.password} onChange={(e) => handleChange(e, setSignupData)} />
          <button type="submit">Sign up</button>
        </form>
      </div>

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Signup;