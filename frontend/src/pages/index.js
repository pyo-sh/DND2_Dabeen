import React from "react";
import Main from "../components/main/Main";

const Home = () => {
  return (
      <Main/>
      // <PostDetail />
  );
};

Home.getInitialProps = async context => {
  // 실시간 도움, 주변 평점 높은거 가져오는 거
}

export default Home;
