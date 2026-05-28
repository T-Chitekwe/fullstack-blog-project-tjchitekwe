import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

export default function Home() {

  const [posts, setPosts] =
    useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {

      const response =
        await api.get("/posts");

      setPosts(response.data);

    } catch (error) {
      console.log(error);
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

        <div className="nav-right">

          <Link to="/" className="nav-btn">
            Home
          </Link>

          {!localStorage.getItem("token") && (
            <>
              <Link to="/signup" className="nav-btn">
                Signup
              </Link>

              <Link to="/login" className="nav-btn">
                Login
              </Link>
            </>
          )}

          <Link to="/create" className="nav-btn">
            Create Post
          </Link>

          {localStorage.getItem("token") && (
            <LogoutButton />
          )}

        </div>
      </nav>

      <section className="hero">

        <h1>
          Insights
        </h1>

        <h2 className="hero-subheading">
          by TJ Chitekwe
        </h2>

        <p className="hero-text">
          Exploring business,
          technology, faith,
          leadership and life
          insights.
        </p>

        <Link
          to="/create"
          className="btn hero-btn"
        >
          Share an Insight
        </Link>

      </section>

      <div className="container">

        {posts.length === 0 ? (

          <div className="empty-posts">

            <h2>
              No insights shared yet 🧠
            </h2>

            <p>
              Be the first to share
              wisdom, ideas and
              inspiration.
            </p>

            <Link
              to="/create"
              className="btn"
            >
              Create First Post
            </Link>

          </div>

        ) : (

          <div className="posts-grid">

            {posts.map((post) => (
              <Link
                key={post._id}
                to={`/posts/${post._id}`}
                className="post-link"
              >

                <div className="post-card">

                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt="post"
                      className="post-image"
                    />
                  )}

                  <div className="post-content">

                    <h2>
                      {post.title}
                    </h2>

                    <h4>
                      {post.subtitle}
                    </h4>

                    <p>
                      {post.content?.slice(0, 120)}...
                    </p>

                    <small>
                      Written by {post.author?.username}
                    </small>

                    <div className="read-more-btn">
                      Read More →
                    </div>

                  </div>

                </div>

              </Link>
            ))}

          </div>

        )}

      </div>
    </>
  );
}