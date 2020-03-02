import React, { useCallback, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import UserInfo from './UserInfo';
import MyHelp from './MyHelp';
import PostBasket from './PostBasket';
import ServiceCenter from '../service/ServiceCenter';
import { Rate } from 'antd';
import { UserPageWrapper } from './UserAll.style';

const UserAll = ({userInfo, userNum, pagename, isMe}) => {
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
            <Link
              href='/userpage/[usernum]/[pagename]'
              as={`/userpage/${userNum}/userinfo`}
            >
              <li className={pagename === 'userinfo' ? 'click' : ''}>
                <a>상세정보</a>
              </li>
            </Link>
            <Link
              href='/userpage/[usernum]/[pagename]'
              as={`/userpage/${userNum}/takehelp`}
            >
              <li className={pagename === 'takehelp' ? 'click' : ''}>
                <a>받은 도움</a>
              </li>
            </Link>
            <Link
              href='/userpage/[usernum]/[pagename]'
              as={`/userpage/${userNum}/givehelp`}
            >
              <li className={pagename === 'givehelp' ? 'click' : ''}>
                <a>준 도움</a>
              </li>
            </Link>
            {isMe && (
              <>
                <Link
                  href='/userpage/[usernum]/[pagename]'
                  as={`/userpage/${userNum}/basket`}
                >
                  <li className={pagename === 'basket' ? 'click' : ''}>
                    <a>장바구니</a>
                  </li>
                </Link>
                <Link
                  href='/userpage/[usernum]/[pagename]'
                  as={`/userpage/${userNum}/service`}
                >
                  <li className={pagename === 'service' ? 'click' : ''}>
                    <a>고객센터</a>
                  </li>
                </Link>
              </>
            )}
          </ul>
        </section>
        <section className='contentSection'>
          <div>
            {pagename === 'userinfo' ? (
              <UserInfo userInfo={userInfo} isMe={isMe} />
            ) : pagename === 'takehelp' ? (
              <MyHelp userNum={userInfo.userNum} isMe={isMe} helpType='take' />
            ) : pagename === 'givehelp' ? (
              <MyHelp userNum={userInfo.userNum} isMe={isMe} helpType='give' />
            ) : pagename === 'service' ? (
              <ServiceCenter isMe={isMe} />
            ) : pagename === 'basket' ? (
              <PostBasket userNum={userInfo.userNum} isMe={isMe} />
            ) : null}
          </div>
        </section>
      </UserPageWrapper>
    );
};

export default UserAll;