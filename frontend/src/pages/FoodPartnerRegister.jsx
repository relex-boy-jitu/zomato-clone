import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


const FoodPartnerRegister = () => {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const businessName = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    axios.post("http://localhost:3000/api/auth/food-partner/register", {
      businessName,
      contactName,
      phone,
      address,
      email,
      password
    }, { withCredentials: true })
      .then(response => {
        console.log(response.data);
        navigate("/create-food");
      })
      .catch(error => {
        console.error("Error registering food partner:", error);
      });
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}> 
        <h2>Food Partner Register</h2>
        <div className="form-group">
          <label htmlFor="businessName">Business Name</label>
          <input type="text" id="businessName" name="businessName" required />
        </div>
        <div className="form-group">
          <label htmlFor="contactName">Contact Name</label>
          <input type="text" id="contactName" name="contactName" required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" name="phone" required />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" name="address" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" required />
        </div>
        <button type="submit" className="button">Register</button>
        <Link to="/food-partner/login" className="link">Already have an account? Login</Link>
        <br />
        <Link to="/user/register" className="link">Register as a normal user</Link>
      </form>
    </div>
  );
};

export default FoodPartnerRegister;