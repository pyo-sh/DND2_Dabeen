import React, { useCallback } from 'react';
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
            <li className={pagename === 'userinfo' ? 'click' : ''}>
              <Link
                href='/userpage/[usernum]/[pagename]'
                as={`/userpage/${userNum}/userinfo`}
              >
                <a>상세정보</a>
              </Link>
            </li>
            <li className={pagename === 'takehelp' ? 'click' : ''}>
              <Link
                href='/userpage/[usernum]/[pagename]'
                as={`/userpage/${userNum}/takehelp`}
              >
                <a>받은 도움</a>
              </Link>
            </li>
            <li className={pagename === 'givehelp' ? 'click' : ''}>
              <Link
                href='/userpage/[usernum]/[pagename]'
                as={`/userpage/${userNum}/givehelp`}
              >
                <a>준 도움</a>
              </Link>
            </li>
            {isMe && 
            <><li className={pagename === 'basket' ? 'click' : ''}>
              <Link
                href='/userpage/[usernum]/[pagename]'
                as={`/userpage/${userNum}/basket`}
              >
                <a>장바구니</a>
              </Link>
            </li>
            <li className={pagename === 'service' ? 'click' : ''}>
              <Link
                href='/userpage/[usernum]/[pagename]'
                as={`/userpage/${userNum}/service`}
              >
                <a>고객센터</a>
              </Link>
            </li></>}
          </ul>
        </section>
        <section className='contentSection'>
          <div>
            {pagename === 'userinfo' ? (<UserInfo userInfo={userInfo} isMe={isMe}/>) :
              pagename === 'takehelp' ? (<MyHelp userNum={userInfo.userNum} helpType='take' />) :
                pagename === 'givehelp' ? (<MyHelp userNum={userInfo.userNum} helpType='give' />) :
                  pagename === 'service' ? (<ServiceCenter isMe={isMe} />) :
                    pagename === 'basket' ? (<PostBasket isMe={isMe}/>) : null}
          </div>
        </section>
      </UserPageWrapper>
    );
};

export default UserAll;