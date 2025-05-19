import { useEffect, useState } from "react";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  type Post,
} from "./service/postService";
import "./App.css";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({ content: "", imageUrl: "", author: "" });
  const [editing, setEditing] = useState<null | Post>(null);

  const fetchPosts = async () => {
    setPosts(await getPosts());
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Always send author when creating
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.content.trim()) return;
    const author = newPost.author?.trim() ? newPost.author : "Anonymous";
    const payload = { ...newPost, author };
    await createPost(payload);
    setNewPost({ content: "", imageUrl: "", author: "" });
    fetchPosts();
  };

  const handleDelete = async (id: number) => {
    await deletePost(id);
    fetchPosts();
  };

  const handleEdit = (post: Post) => {
    setEditing({ ...post }); // ensure a fresh copy
  };

  // Do NOT update author on edit
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing || !editing.content.trim()) return;
    const { id, content, imageUrl } = editing;
    // Do not send author field when updating
    await updatePost(id!, { content, imageUrl });
    setEditing(null);
    fetchPosts();
  };

  return (
    <div className="container">
      <h1>Social Media App</h1>

      <form className="post-form" onSubmit={editing ? handleUpdate : handleCreate}>
        <textarea
          placeholder="What's on your mind?"
          value={editing ? editing.content : newPost.content}
          onChange={(e) =>
            editing
              ? setEditing({ ...editing, content: e.target.value })
              : setNewPost({ ...newPost, content: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={editing ? editing.imageUrl ?? "" : newPost.imageUrl}
          onChange={(e) =>
            editing
              ? setEditing({ ...editing, imageUrl: e.target.value })
              : setNewPost({ ...newPost, imageUrl: e.target.value })
          }
        />
        {/* Only show author input when creating */}
        {!editing && (
          <input
            type="text"
            placeholder="Author"
            value={newPost.author}
            onChange={(e) =>
              setNewPost({ ...newPost, author: e.target.value })
            }
          />
        )}
        <button type="submit">{editing ? "Update" : "Post"}</button>
        {editing && (
          <button type="button" onClick={() => setEditing(null)}>
            Cancel
          </button>
        )}
      </form>

      <div className="feed">
        {posts
          .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
          .map((post) => (
            <div className="post-card" key={post.id}>
              <div className="post-header">
                <span className="author">{post.author ?? "Anonymous"}</span>
                <span className="timestamp">
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleString()
                    : ""}
                </span>
              </div>
              <div className="post-content">{post.content}</div>
              {post.imageUrl && (
                <img className="post-image" src={post.imageUrl} alt="post" />
              )}
              <div className="post-actions">
                <button onClick={() => handleEdit(post)}>Edit</button>
                <button onClick={() => post.id && handleDelete(post.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;