import axios from "axios";
import { useEffect, useState } from 'react'; 
import "./blog.css"

interface Post {
  title: { rendered: string };
  excerpt: { rendered: string };
  _links: { "wp:featuredmedia": { href: string }[] };
}

interface BlogProps {
  post: Post;
}

export default function Blog({ post }: BlogProps) {
  const [featuredImage, setFeaturedImage] = useState<string | undefined>();

  const getImage = () => {
    // postが存在し、_links["wp:featuredmedia"]が存在し、配列が空でない場合にのみ画像を取得する
    if (post && post._links["wp:featuredmedia"] && post._links["wp:featuredmedia"].length > 0) {
      axios.get(post._links["wp:featuredmedia"][0].href).then((response) => {
        setFeaturedImage(response.data.source_url);
      });
    }
  };
  

  useEffect(() => {
    getImage();
  }, [post]); // postが変更される度にgetImage関数が呼び出される

  return (
    <div className="container">
      <div className="blog-container">
        <p className="blog-date">
          {new Date(Date.now()).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <h2 className="blog-title">{post.title.rendered}</h2>
        <p
          className="blog-excerpt"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
        {featuredImage && <img src={featuredImage} className="mask" alt="Featured" />}
      </div>
    </div>
  );
}
