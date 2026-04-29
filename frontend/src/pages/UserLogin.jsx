import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const UserLogin = () => {

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault(); 

      const email = e.target.email.value;
      const password = e.target.password.value;
    
    const response = await axios.post("http://localhost:3000/api/auth/user/login", {
      email,
      password,
    },{withCredentials : true});
    
    console.log(response.data);
    navigate("/");
  };
  return (
    <div className="form-container">
      <form className="form" onSubmit={handlesubmit}>
        <h2>User Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" className="button">Login</button>
        <Link to="/user/register" className="link">Don't have an account? Register</Link>
        <br />
        <Link to="/food-partner/login" className="link">Login as a food partner</Link>
      </form>
    </div>
  );
};

export default UserLogin;