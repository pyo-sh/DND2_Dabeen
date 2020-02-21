import React, { useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';
import UserInfo from '../../../../components/myPage/UserInfo';
import MyHelp from '../../../../components/myPage/MyHelp';
import PostBasket from '../../../../components/myPage/PostBasket';
import ServiceCenter from '../../../../components/service/ServiceCenter';
import { Rate } from 'antd';
import { loadUserRequestAction } from '../../../../reducers/user';
import { useSelector } from 'react-redux';

const dummyUserData = {
  transaction_time: 'xxxx-xx-xx',
  result_code: 'OK',
  description: 'OK',
  data: {
    user_num: 1,
    id: 'dabeen2005',
    user_name: '홍길동',
    email: 'AdminUser1@gmail.com',
    brith_date: 'xxxx-xx-xx',
    nickname: '다빈',
    address: 'xx시 xxx대로 xxxx',
    blon_sgg_name: 'xxxx',
    phone_num: '010-1111-1111',
    suppl_whet: 'Y',
    pic_path: 'xxxxxxxx',
    rrn_rear: 'xxxxxxxx',
    avg_rate: 3.45,
    own_milege: 5000
  }
};

const UserPage = ({ userid, pagename, isMe }) => {
  // isMe 에 따라서 다르게
  // const router = useRouter();
  // const {userid, pagename} = router.query;
  const { userInfo } = useSelector(state => state.user);
  const dabeenerRegist = useCallback(() => {
    Router.push('/regist');
  }, []);
  return (
    <UserPageWrapper>
      <section className='profileSection'>
        <div className='userInfomation'>
          <img className='userImage'></img>
          <div className='userIntroduce'>
            <h1 className='userNickname'>{userInfo.nickname}</h1>
            {userInfo.userRole === 'y' ? (
              <div className='userRate'>
                <div>
                  <Rate
                    allowHalf
                    disabled
                    defaultValue={userInfo.agvRate}
                    style={{ fontSize: 12 }}
                  />
                </div>
                <div className='userRateTitle'>{userInfo.avgRate}</div>
              </div>
            ) : (
              <button onClick={dabeenerRegist} className='userRegistButton'>
                다비너 신청
              </button>
            )}
            <div className='userParagraph'>안녕하세요 ~ 입니다</div>
          </div>
        </div>
        <ul className='contentNavbar'>
          <h1>메뉴</h1>
          <li className={pagename === 'userinfo' ? 'click' : ''}>
            <Link
              href='/userpage/[userid]/[pagename]'
              as={`/userpage/${userid}/userinfo`}
            >
              <a>상세정보</a>
            </Link>
          </li>
          <li className={pagename === 'takehelp' ? 'click' : ''}>
            <Link
              href='/userpage/[userid]/[pagename]'
              as={`/userpage/${userid}/takehelp`}
            >
              <a>받은 도움</a>
            </Link>
          </li>
          <li className={pagename === 'givehelp' ? 'click' : ''}>
            <Link
              href='/userpage/[userid]/[pagename]'
              as={`/userpage/${userid}/givehelp`}
            >
              <a>준 도움</a>
            </Link>
          </li>
          <li className={pagename === 'basket' ? 'click' : ''}>
            <Link
              href='/userpage/[userid]/[pagename]'
              as={`/userpage/${userid}/basket`}
            >
              <a>장바구니</a>
            </Link>
          </li>
          <li className={pagename === 'service' ? 'click' : ''}>
            <Link
              href='/userpage/[userid]/[pagename]'
              as={`/userpage/${userid}/service`}
            >
              <a>고객센터</a>
            </Link>
          </li>
        </ul>
      </section>
      <section className='contentSection'>
        <div>
          {pagename === 'userinfo' ? (<UserInfo userInfo={userInfo} />) : 
           pagename === 'takehelp' ? (<MyHelp helpType='take' />) : 
           pagename === 'givehelp' ? (<MyHelp helpType='give' />) : 
           pagename === 'service' ? (<ServiceCenter />) : 
           pagename === 'basket' ? (<PostBasket />) : null}
        </div>
      </section>
    </UserPageWrapper>
  );
};

const UserPageWrapper = styled.article`
  width: 100%;
  margin: 25px 0;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
  & a {
    color: black;
    cursor: pointer;
  }
  & .profileSection {
    width: 80%;
    min-width: 200px;
    max-width: 300px;
    height: 100%;
    margin: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    & .userInfomation {
      width: 100%;
      border: 1px solid #d0d0d0;
      border-radius: 5px;
    }
    & .userImage {
      width: 100%;
      height: 20vw;
      min-height: 200px;
      max-height: 300px;
      border-radius: 5px;
    }
    & .userIntroduce {
      width: 100%;
      padding: 10px 15px;
      display: flex;
      flex-direction: column;
      & .userNickname {
        margin-bottom: 0;
      }
    }
    & .userParagraph {
      padding-top: 17.5px;
    }
    & .userRate {
      display: flex;
      align-items: center;
      padding-left: 3px;
      & .userRateTitle {
        color: #ff4300;
        padding: 4px 0 0 13px;
        font-size: 15px;
        font-weight: bold;
      }
    }
    & .userRegistButton {
      width: 100%;
      border: 0;
      background: #f0f0f0;
      border-radius: 5px;
      height: 27px;
      cursor: pointer;
      &:hover {
        color: black;
      }
    }
    & .contentNavbar {
      width: 100%;
      padding: 10px;
      margin: 25px 0;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      list-style: none;
      border-top: 1px solid #f0f0f0;
      border-bottom: 1px solid #f0f0f0;
      & li {
        margin: 5px;
        padding: 10px;
        border-radius: 2px;
      }
      & .click {
        & a {
          color: #ff9644;
        }
        background: #f0f0f0;
        border-right: 3px solid #ff4300;
      }
    }
  }
  & .ant-rate {
    color: #ff4300;
  }
  & .contentSection {
    width: 75vw;
    max-width: 900px;
    min-width: 280px;
    margin: 0 20px;
    display: flex;
    flex-direction: column;
  }
`;

UserPage.getInitialProps = async context => {
  const { pagename, userid } = context.query;
  // 페이지네임에 따라 다른 정보를 가지고 온다..
  const state = context.store.getState();
  const isMe = state.user.userInfo.userId === userid;
  if (isMe) {
    context.store.dispatch(loadUserRequestAction(state.user.userInfo.userNum));
  } else {
    console.log('내가 아닐 때 할 일');
  }
  // 내린거에 따라 내 것인지 아닌지 구분하게 합시다!
  return { pagename, userid, isMe };
};
export default UserPage;
