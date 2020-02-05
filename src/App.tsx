import React, { useReducer, useCallback, useEffect } from "react";
import { appReducer } from "./reducer";
import { Actions } from "./reducer";
import { Post } from "./Post.model";
import Card from "./card";
import "./app.css";
const App = () => {
  const [state, dispatch] = useReducer(appReducer, {
    loading: false,
    data: null,
    error: null
  });

  const getDataHandler = useCallback(() => {
    dispatch({ type: Actions.START });
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(data => {
        dispatch({ type: Actions.RESOLVE, data });
      })
      .catch(error => dispatch({ type: Actions.ERROR, error }));
  }, [state.data]);

  useEffect(() => {
    console.log("Re-rendering, data:", state.data);
  }, [state.data]);

  useEffect(() => {
    getDataHandler();
  }, []);

  const dataList =
    state.data &&
    state.data.map((post: Post) => {
      return (
        <li style={{ display: "inline-block" }}>
          <Card>
            <h3>{post.title}</h3>
            <div>
              <span>User - {post.userId}</span>
              <span>Id - {post.id}</span>
            </div>
            <p>{post.body}</p>
          </Card>
        </li>
      );
    });

  return (
    <div className="App">
      {/* <ul>
        <h2>Please build an application that will:</h2>
        <li>
        grab data from{" "}
        <a
        href=" https://jsonplaceholder.typicode.com/posts"
        target={"_blank"}
        >
        a placeholder api
        </a>{" "}
        on initial load
        </li>
        <li>save that data into a reducer using useReducer hook</li>
        <li>display that data</li>
        <li>have a button to reload the data</li>
      </ul> */}
      <button onClick={getDataHandler} style={{ fontSize: "2rem" }}>
        Get Data
      </button>
      <ul style={{ listStyle: "none", padding: 0, marginTop: 0 }}>
        {dataList}
      </ul>
    </div>
  );
};

export default App;
