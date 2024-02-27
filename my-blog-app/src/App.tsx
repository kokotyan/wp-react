import { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./component/blog";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = () => {
    axios
      .get("https://hagf.buzz/wp-json/wp/v2/posts")
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {posts.map((item, index) => (
        <Blog
          key={index}
          post={item}
        />
      ))}
    </div>
  );
}
