import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
const navigate = useNavigate();

const [formData, setFormData] =
useState({
email: "",
password: ""
});

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]:
e.target.value
});
};

const handleLogin = async (e) => {
e.preventDefault();

try {
  const response =
  await axios.post(
    "https://fullstack-blog-project-tjchitekwe.onrender.com/api/auth/login",
    formData
  );

  localStorage.setItem(
    "token",
    response.data.token
  );

  alert("Login successful!");

  navigate("/");

} catch (error) {
  alert(
    error.response?.data?.message ||
    "Login failed"
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

      <h1>Welcome Back</h1>

      <p>
        Login to continue
      </p>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Login
        </button>
      </form>

      <div className="auth-link">
        <Link to="/signup">
          Need an account?
        </Link>
      </div>

    </div>
  </div>
</>
);
}