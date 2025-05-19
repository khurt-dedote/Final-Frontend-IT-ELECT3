import React, { useState } from "react";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import { Post } from "../api/posts";

const Home: React.FC = () => {
  const [refresh, setRefresh] = useState(0);

  const handlePostCreated = (_: Post) => {
    setRefresh(r => r + 1);
  };

  return (
    <div>
      <h1>Social Feed</h1>
      <PostForm onPostCreated={handlePostCreated} />
      {/* Use refresh as a key to force remounting PostList */}
      <PostList key={refresh} />
    </div>
  );
};

export default Home;