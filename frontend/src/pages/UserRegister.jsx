import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const UserRegister = () => {
  
   const navigate = useNavigate();
 
   const handleSubmit = async (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value.trim();
    const lastName = e.target.lastName.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    
    if (!firstName || !lastName || !email || !password) {
      alert("All fields are required");
      return;
    }
    
    try {
      const response = await axios.post("http://localhost:3000/api/auth/user/register", {
        fullName: `${firstName} ${lastName}`,
        email,
        password,
      },{
        withCredentials : true
      });
      
      console.log(response.data);
      
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed: " + (error.response?.data?.message || error.message));
    }
  };
  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>User Register</h2>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" required />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" className="button">Register</button>
        <Link to="/user/login" className="link">Already have an account? Login</Link>
        <br />
        <Link to="/food-partner/register" className="link">Register as a food partner</Link>
      </form>
    </div>
  );
};

export default UserRegister;