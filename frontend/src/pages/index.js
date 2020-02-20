import React from "react";
import Main from "../components/main/Main";

const Home = () => {
  return (
      <Main/>
      // <PostDetail />
  );
};

Home.getInitialProps = async context => {
  // context.store.dispatch({

  // })

  // 위의 dispatch를 사용해서 실시간 도움요청의 자료
  // 그리고 내 주변의 높은 평점을 가진 다비너를 가지고 오도록 한다.

  // 그러면 serverside rendering을 통해 가지고 오고 그값을 Main에서 useSelector를 통해서
  // 가지고 올 수 있다.
}

export default Home;
