import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  Link,
  useNavigate
} from "react-router-dom";

import api from "../api";

import LogoutButton from "../components/LogoutButton";

export default function ViewPost() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [post,
    setPost] =
    useState(null);

  const [isAuthor,
    setIsAuthor] =
    useState(false);

  // 💬 NEW: comment state
  const [comment, setComment] = useState("");

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

      setPost(response.data);

      const token =
        localStorage.getItem(
          "token"
        );

      if (token) {

        const payload =
          JSON.parse(
            atob(
              token.split(".")[1]
            )
          );

        if (
          payload.id ===
          response.data.author
            ?._id
        ) {
          setIsAuthor(true);
        }
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete =
    async () => {

    const confirmDelete =
      window.confirm(
        "Delete this post?"
      );

    if (!confirmDelete)
      return;

    try {

      await api.delete(
        `/posts/${id}`
      );

      alert(
        "Post deleted"
      );

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data
          ?.message
      );

    }
  };

  const handleLike = async () => {
    try {

      const res = await api.put(
        `/posts/${id}/like`
      );

      setPost(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  // 💬 NEW: add comment function
  const handleComment = async () => {
    try {

      if (!comment) return;

      const res = await api.post(
        `/posts/${id}/comment`,
        { text: comment }
      );

      setPost(res.data);
      setComment("");

    } catch (error) {
      console.log(error);
    }
  };

  if (!post) {
    return (
      <div className="loading-page">
        <h2>Loading post...</h2>
      </div>
    );
  }

  return (
    <>
      <nav className="navbar">

        <Link to="/" className="logo-wrapper-link">
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

      <div className="view-post-container">

        <div className="view-post-card">

          <h1>{post.title}</h1>

          <h3>{post.subtitle}</h3>

          <button
            className="like-btn"
            onClick={handleLike}
          >
            ❤️ {post.likes?.length || 0} Likes
          </button>

          {post.imageUrl && (
            <img
              src={post.imageUrl}
              className="view-image"
              alt="post"
            />
          )}

          <div className="post-meta">
            Written by {post.author?.username}
          </div>

          {isAuthor && (
            <div className="post-actions">

              <Link
                to={`/edit/${id}`}
                className="edit-btn"
              >
                Edit
              </Link>

              <button
                className="delete-btn"
                onClick={handleDelete}
              >
                Delete
              </button>

            </div>
          )}

          <p className="full-content">
            {post.content}
          </p>

          {/* 💬 NEW: COMMENT SECTION */}
          <div className="comment-section">

            <h3>Comments</h3>

            <div className="comment-box">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
              />

              <button onClick={handleComment}>
                Post
              </button>
            </div>

            {/* DISPLAY COMMENTS */}
            <div className="comment-list">
              {post.comments?.map((c, index) => (
                <div key={index} className="comment">
                  <b>{c.user?.username || "User"}</b>: {c.text}
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </>
  );
}