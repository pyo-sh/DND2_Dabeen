import React from 'react';
import { Rate } from 'antd';
import Link from 'next/link';
import {MainDaBeenerProfileForm, MainDaBeenerProfileInfo } from './MainDaBeenerProfile.style';
import { calculateRate } from '../../utils/calculateRate';

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
              {/* <Avatar size={100} icon='user' /> */}
              <img className="MainProfilePicture" src={user.picPath ||'/images/defaultProfile.png'}/>
              <div>@{user.nickname}</div>
              <div style={{ fontSize: 12 }}>{user.userId}</div>
              <Rate
                allowHalf
                disabled
                defaultValue={
                  calculateRate(user.avgRate)
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
