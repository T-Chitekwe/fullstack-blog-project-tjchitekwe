import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );

      alert(response.data.message);

      navigate("/login");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Signup failed"
      );
    }
  };

  return (
    <>
      <nav className="navbar">

        <Link
          to="/"
          className="logo-wrapper-link"
        >
          <div className="logo-wrapper">
            <div className="logo">
              Insights
            </div>

            <div className="sub-logo">
              by TJ Chitekwe
            </div>
          </div>
        </Link>

      </nav>

      <div className="page-wrapper">
        <div className="form-card">

          <h1>Create Account</h1>

          <p>
            Join the Insights community
          </p>

          <form onSubmit={handleSignup}>
            <input
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <button type="submit">
              Create Account
            </button>
          </form>

          <div className="auth-link">
            <Link to="/login">
              Already have an account?
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}