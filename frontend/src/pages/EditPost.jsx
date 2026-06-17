import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams,
  Link
} from "react-router-dom";

import api from "../api";

import LogoutButton from "../components/LogoutButton";

export default function EditPost() {

  const { id } = useParams();

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({
      title: "",
      subtitle: "",
      content: ""
    });

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost =
    async () => {

    try {

      const response =
        await api.get(
          `/posts/${id}`
        );

      setFormData({
        title:
          response.data.title,
        subtitle:
          response.data.subtitle,
        content:
          response.data.content
      });

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleUpdate =
    async (e) => {

    e.preventDefault();

    try {

      await api.put(
        `/posts/${id}`,
        formData
      );

      alert(
        "Post updated!"
      );

      navigate(
        `/posts/${id}`
      );

    } catch (error) {

      alert(
        error.response?.data
          ?.message
      );

    }
  };

  return (
    <>
      {/* 🔥 UPDATED NAVBAR ONLY */}
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

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/create">Create Post</Link>
        </div>

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

          <h1>Edit Post</h1>

          <form onSubmit={handleUpdate}>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
            />

            <input
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
            />

            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
            />

            <button>
              Update Post
            </button>

          </form>

        </div>

      </div>
    </>
  );
}