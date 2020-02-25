import React, { useCallback } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import Link from 'next/link';
import UserInfo from './UserInfo';
import MyHelp from './MyHelp';
import PostBasket from './PostBasket';
import ServiceCenter from '../service/ServiceCenter';
import { Rate } from 'antd';

const UserAll = ({userInfo, userNum, pagename, isMe}) => {
  console.log(userInfo);
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
      height: 80vw;
      min-height: 200px;
      max-height: 300px;
      border-radius: 5px;
    }
    & .userParagraph{
      padding-top: 17.5px;
    }
    & .userIntroduce{
      width: 100%;
      padding: 10px 15px;
      display: flex;
      flex-direction: column;
      & .userNickname{
          margin-bottom: 0;
      }
    }
    & .userRate{
      display: flex;
      align-items: center;
      padding-left: 3px;
      & .userRateTitle{
        color: #FF4300;
        padding: 4px 0 0 13px;
        font-size: 15px;
        font-weight: bold;
      }
    }
    & .userRegistButton{
      width: 100%;
      border : 0;
      background : #F0F0F0;
      border-radius : 5px;
      height : 27px;
      cursor: pointer;
      &:hover {
          color : black;
      }
    }
    & .contentNavbar {
      width : 100%;
      padding: 10px;
      margin: 25px 0;
      display : flex;
      flex-direction: column;
      justify-content : space-evenly;
      list-style : none;
      border-top: 1px solid #F0F0F0;
      border-bottom: 1px solid #F0F0F0;
      & li {
        margin: 5px;
        padding: 10px;
        border-radius: 2px;
      }
      & .click {
        & a{
          color : #FF9644;
        }
        background: #F0F0F0;
        border-right: 3px solid #FF4300
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
export default UserAll;