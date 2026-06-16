import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

export default function CreatePost() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    content: ""
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const data = new FormData();

      data.append("title", formData.title);
      data.append("subtitle", formData.subtitle);
      data.append("content", formData.content);

      if (image) {
        data.append("image", image);
      }

      await api.post("/posts", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Post created successfully!");
      navigate("/");

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Post failed");
    }
  };

  return (
    <>
      <nav className="navbar">

        <Link to="/" className="logo-wrapper-link">
          <div className="logo-wrapper">
            <div className="logo">Insights</div>
            <div className="sub-logo">by TJ Chitekwe</div>
          </div>
        </Link>

        {/* NAV LINKS (optional consistency like Home) */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/create">Create Post</Link>
        </div>

        {/* CONSISTENT LOGOUT */}
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          {localStorage.getItem("token") && <LogoutButton />}
        </button>

      </nav>

      <div className="page-wrapper">
        <div className="form-card">

          <h1>Create Post</h1>
          <p>Share your thoughts</p>

          <form onSubmit={handleCreatePost}>

            <input
              name="title"
              placeholder="Title"
              onChange={handleChange}
              required
            />

            <input
              name="subtitle"
              placeholder="Subtitle"
              onChange={handleChange}
            />

            <textarea
              name="content"
              placeholder="Write your insight..."
              onChange={handleChange}
              required
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <button type="submit">
              Publish Post
            </button>

          </form>

        </div>
      </div>
    </>
  );
}