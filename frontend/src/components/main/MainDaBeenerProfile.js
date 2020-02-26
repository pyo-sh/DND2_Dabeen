import React from 'react';
import { Avatar, Rate } from 'antd';
import Link from 'next/link';
import {MainDaBeenerProfileForm, MainDaBeenerProfileInfo } from './MainDaBeenerProfile.style';

const MainDaBeenerProfile = ({ recommendOpponents }) => {
  return (
    <MainDaBeenerProfileForm>
      {recommendOpponents.map(user => (
        <Link
          href='/userpage/[usernum]/[pagename]'
          as={`/userpage/${user.userNum}/userinfo`}
          key={user.userNum}
        >
          <a>
            <MainDaBeenerProfileInfo >
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

export default MainDaBeenerProfile;
