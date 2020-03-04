import React from "react";
import Main from "../components/main/Main";
import { loadRecommendRequest } from '../reducers/opponent';
import { loadLivePostRequestAction } from '../reducers/posts';

const Home = () => {
  return (
      <Main/>
  );
};

// Home.getInitialProps = async context => {
//   loadLivePostRequestAction(1000);
// }

export default Home;