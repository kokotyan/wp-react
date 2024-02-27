import { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./component/blog";

export default function App() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios
      .get("http://hagf.buzz/wp-json/wp/v2/posts")
      .then((res) => {
        setPosts(res.data);
      });
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div>
      {posts.map((item, index) => (
        <Blog
          key={index}
          post={item}
        />
      ))}
    </div>
  )
}
