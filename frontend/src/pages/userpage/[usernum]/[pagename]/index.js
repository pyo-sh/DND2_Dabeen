import React from 'react';

import { loadUserRequestAction } from '../../../../reducers/user';
import { useSelector } from 'react-redux';
import UserAll from '../../../../components/myPage/UserAll';
const UserPage = ({ userNum, pagename, isMe }) => {
  // isMe 에 따라서 다르게
  // const router = useRouter();
  // const {userid, pagename} = router.query;
  const { me, selectUser } = useSelector(state => state.user);
 
  return (
    <UserAll userInfo={isMe ? me : selectUser} userNum={userNum} pagename={pagename}/>
  );
};



UserPage.getInitialProps = async context => {
  const { pagename } = context.query;
  const userNum = context.query.usernum;
  // 유저번호에 따라 다른 정보를 가지고 온다..
  const state = context.store.getState();
  const isMe = state.user.me.userNum === userNum;
  context.store.dispatch(loadUserRequestAction({userNum, isMe}));
  // 내린거에 따라 내 것인지 아닌지 구분하게 합시다!
  return { pagename, userNum, isMe };
};
export default UserPage;
