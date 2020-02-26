import React, {useEffect, useState} from 'react';
import { loadUserRequestAction } from '../../../../reducers/user';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import UserAll from '../../../../components/myPage/UserAll';
import { loadFaqsRequestAction } from '../../../../reducers/questions';

const UserPage = () => {
  const { me, selectUser } = useSelector(state => state.user);
  const { usernum: userNum, pagename } = useRouter().query;
  const [isMe, setIsMe] = useState(me.userNum === userNum);
  const dispatch = useDispatch();
  useEffect(() => {
    if (me.userNum === userNum){ 
      setIsMe(true);
    }
    else {
      setIsMe(false);
    }
  }, [me && me.userNum, userNum]);

  useEffect(() => {
    if (pagename === 'service'){
      dispatch(loadFaqsRequestAction());
    }
    dispatch(loadUserRequestAction({userNum, isMe}));
  }, [isMe, pagename, userNum]);

  return (
    <UserAll userInfo={isMe ? me : selectUser} isMe={isMe} userNum={userNum} pagename={pagename}/>
  );
};

// UserPage.getInitialProps = async context => {
//   const { pagename } = context.query;
//   const userNum = context.query.usernum;
//   // 유저번호에 따라 다른 정보를 가지고 온다..
 
//   const state = context.store.getState();
//   const isMe = state.user.me.userNum === userNum;
//   if (pagename === 'service') {
//     context.store.dispatch(loadFaqsRequestAction());
//   }
//   console.log(pagename);
//   context.store.dispatch(loadUserRequestAction({userNum, isMe}));
//   // 내린거에 따라 내 것인지 아닌지 구분하게 합시다!
//   return { pagename, userNum, isMe };
// };
export default UserPage;
