import React, { useEffect, useState } from "react";
import { getPosts, Post, deletePost } from "../api/posts";
import PostItem from "./PostItem";

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then(res => setPosts(res.data));
  }, []);

  const handleDelete = (id: number) => {
    deletePost(id).then(() => setPosts(posts.filter(p => p.id !== id)));
  };

  return (
    <div>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.slice().reverse().map(post => (
          <PostItem key={post.id} post={post} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
};

export default PostList;