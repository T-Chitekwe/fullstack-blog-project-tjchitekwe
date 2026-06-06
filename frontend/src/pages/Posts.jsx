import { useState, useEffect } from "react";
import api from "../api";

function Posts() {
  const [posts, setPosts] = useState([]);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    content: ""
  });

  const fetchPosts = async () => {
    try {
      const res = await api.get("api/posts");
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/posts", form);

      setForm({
        title: "",
        subtitle: "",
        content: ""
      });

      fetchPosts();

    } catch (err) {
  console.log("FULL ERROR:", err);
  console.log("RESPONSE:", err.response);

  alert(
    err.response?.data?.message ||
    err.response?.data?.error ||
    JSON.stringify(err.response?.data) ||
    "Failed to create post"
  );
}
  };

  return (
    <div className="container">

      <h1>Blog Posts</h1>

      <form onSubmit={handleSubmit}>

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="subtitle"
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={handleChange}
        />

        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Create Post
        </button>

      </form>

      {posts.map((post) => (
        <div key={post._id} className="post">

          <h2>{post.title}</h2>
          <h4>{post.subtitle}</h4>
          <p>{post.content}</p>

          <small>
            By: {post.author?.username}
          </small>

        </div>
      ))}

    </div>
  );
}

export default Posts;