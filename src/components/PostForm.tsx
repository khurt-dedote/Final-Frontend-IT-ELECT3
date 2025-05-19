import React, { useState } from "react";
import { createPost, Post } from "../api/posts";

interface Props {
  onPostCreated: (post: Post) => void;
}

const PostForm: React.FC<Props> = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    const res = await createPost({ content, imageUrl });
    onPostCreated(res.data);
    setContent("");
    setImageUrl("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2em" }}>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="What's on your mind?"
        rows={3}
        style={{ width: "100%" }}
      />
      <input
        type="text"
        value={imageUrl}
        onChange={e => setImageUrl(e.target.value)}
        placeholder="Image URL (optional)"
        style={{ width: "100%", margin: "0.5em 0" }}
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;