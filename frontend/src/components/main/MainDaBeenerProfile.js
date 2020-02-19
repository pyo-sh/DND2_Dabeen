import React from 'react';
import { Avatar, Rate } from 'antd';
import styled from 'styled-components';

const defaultDabeener = [
    {
        userId: "adf",
        nickname : "123",
        userRate : 4,
        profile : ""
    },
    {
        userId: "adf",
        nickname : "123",
        userRate : 4.5,
        profile : ""
    },
    {
        userId: "adf",
        nickname : "123",
        userRate : 4,
        profile : ""
    },
    {
        userId: "adf",
        nickname : "123",
        userRate : 4,
        profile : ""
    },
    {
        userId: "adf",
        nickname : "123",
        userRate : 4,
        profile : ""
    },
]

const MainDaBeenerProfile = () => {
    return (
        <MainDaBeenerProfileForm>
            {defaultDabeener.map(user => (
                <MainDaBeenerProfileInfo>
                <Avatar size = {100} icon="user"/>
                <div>@{user.nickname}</div>
                <div style={{fontSize: 12}}>{user.userId}</div>
                <Rate allowHalf disabled defaultValue={user.userRate} style={{fontSize: 12}}/>
            </MainDaBeenerProfileInfo>
            ))}
        </MainDaBeenerProfileForm>
    );
};

const MainDaBeenerProfileForm = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 70%;
    
    /* @media only screen and (max-width: 1024px){
        width: 50vw;   
    } */

    @media only screen and (max-width: 425px){
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