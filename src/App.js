import "./styles.css";
import { useState, useLayoutEffect } from "react";
import axios from "axios";

const baseURL = "https://jsonplaceholder.typicode.com/posts";

export default function App() {
  const [post, setPost] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useLayoutEffect(() => {
    setIsFetching(true);
    axios.get(baseURL).then((response) => {
      const combineData = response.data.map((data) => {
        return {
          id: data.id,
          title: data.title,
          body: data.body,
          show: false // extra field
        };
      });

      setPost(combineData);
      setIsFetching(false);
    });
  }, []);

  const showToggle = (id) => {
    setPost((post) => {
      return post.map((item) => {
        return item.id === id ? { ...item, show: !item.show } : item;
      });
    });

    const findItem = post.find((p) => p.id === id);
    console.log(findItem);
  };

  return (
    <div>
      {isFetching && "Loading..."}
      {post?.map((item, key) => {
        return (
          <div key={key}>
            <h1>{item.id}</h1>
            {item.show && (
              <>
                <h1>{item.title}</h1>
                <p>{item.body}</p>
              </>
            )}
            <button onClick={() => showToggle(item.id)}>
              {item.show ? "Hide" : "Show"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
