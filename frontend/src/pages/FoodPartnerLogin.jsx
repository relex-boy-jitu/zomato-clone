import React from 'react';
import { Link } from 'react-router-dom';
import axios  from 'axios';
import { useNavigate } from 'react-router-dom';

const FoodPartnerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const responce = await axios.post("http://localhost:3000/api/auth/food-partner/login", {
      email,
      password,
    },{withCredentials : true});
    console.log(responce.data);

    navigate("/create-food");

}
  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Food Partner Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" className="button">Login</button>
        <Link to="/food-partner/register" className="link">Don't have an account? Register</Link>
        <br />
        <Link to="/user/login" className="link">Login as a normal user</Link>
      </form>
    </div>
  );
};

export default FoodPartnerLogin;