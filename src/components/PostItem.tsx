import React from "react";
import { Post } from "../api/posts";

interface Props {
  post: Post;
  onDelete: (id: number) => void;
}

const PostItem: React.FC<Props> = ({ post, onDelete }) => (
  <div className="post-item" style={{ border: "1px solid #ccc", margin: "1em 0", padding: "1em" }}>
    <div>
      <b>{post.author || "Anonymous"}</b> &middot; <span>{post.createdAt?.slice(0, 19).replace("T", " ")}</span>
    </div>
    <div>{post.content}</div>
    {post.imageUrl && <img src={post.imageUrl} alt="post" style={{ maxWidth: 400 }} />}
    <div>
      <button onClick={() => post.id && onDelete(post.id)}>Delete</button>
    </div>
  </div>
);

export default PostItem;