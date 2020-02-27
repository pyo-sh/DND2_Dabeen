import React from "react";
import Main from "../components/main/Main";
import { loadRecommendRequest } from '../reducers/opponent';
import { loadLivePostRequestAction } from '../reducers/posts';

const Home = () => {
  return (
      <Main/>
      // <PostDetail />
  );
};

Home.getInitialProps = async context => {
  const state = context.store.getState();
  if(state.user.me.address){
    context.store.dispatch(loadRecommendRequest(state.user.me.address));
  }
  else {
    context.store.dispatch(loadRecommendRequest());
  }
  loadLivePostRequestAction(1000);
}

export default Home;
