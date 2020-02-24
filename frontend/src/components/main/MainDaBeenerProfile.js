import React from 'react';
import { Avatar, Rate } from 'antd';
import styled from 'styled-components';
import Link from 'next/link';

const MainDaBeenerProfile = ({ recommendOpponents }) => {
  return (
    <MainDaBeenerProfileForm>
      {recommendOpponents.map(user => (
        <Link
          href='/userpage/[usernum]/[pagename]'
          as={`/userpage/${user.userNum}/userinfo`}
        >
          <a>
            <MainDaBeenerProfileInfo key={user.userId}>
              <Avatar size={100} icon='user' />
              <div>@{user.nickname}</div>
              <div style={{ fontSize: 12 }}>{user.userId}</div>
              <Rate
                allowHalf
                disabled
                defaultValue={
                  Math.round(user.avgRate + 0.5) === Math.round(user.avgRate)
                    ? user.avgRate
                    : Math.floor(user.avgRate) + 0.5
                }
                style={{ fontSize: 12 }}
              />
            </MainDaBeenerProfileInfo>
          </a>
        </Link>
      ))}
    </MainDaBeenerProfileForm>
  );
};

const MainDaBeenerProfileForm = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 70%;
  & a {
      color: #424242;
  }

  /* @media only screen and (max-width: 1024px){
        width: 50vw;   
    } */

  @media only screen and (max-width: 425px) {
    width: 50vw;
    flex-wrap: wrap;
  }
`;

const MainDaBeenerProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2vh;
  & .ant-rate {
    color: #ff4300;
  }
`;

export default MainDaBeenerProfile;
