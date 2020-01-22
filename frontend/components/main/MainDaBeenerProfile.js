import React from 'react';
import { Avatar, Rate } from 'antd';
import styled from 'styled-components';

const MainDaBeenerProfileForm = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const MainDaBeenerProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const MainDaBeenerProfile = () => {
    return (
        <MainDaBeenerProfileForm>
            <MainDaBeenerProfileInfo>
                <Avatar size = {100} icon="user"/>
                <div>@닉네임</div>
                <div style={{fontSize: 12}}>아이디</div>
                <Rate disabled defaultValue={4} style={{fontSize: 12}}/>
            </MainDaBeenerProfileInfo>
            <MainDaBeenerProfileInfo>
                <Avatar size = {100} icon="user"/>
                <div>@닉네임</div>
                <div style={{fontSize: 12}}>아이디</div>
                <Rate disabled defaultValue={4} style={{fontSize: 12}}/>
            </MainDaBeenerProfileInfo>
            <MainDaBeenerProfileInfo>
                <Avatar size = {100} icon="user"/>
                <div>@닉네임</div>
                <div style={{fontSize: 12}}>아이디</div>
                <Rate disabled defaultValue={4} style={{fontSize: 12}}/>
            </MainDaBeenerProfileInfo>
            <MainDaBeenerProfileInfo>
                <Avatar size = {100} icon="user"/>
                <div>@닉네임</div>
                <div style={{fontSize: 12}}>아이디</div>
                <Rate disabled defaultValue={4} style={{fontSize: 12}}/>
            </MainDaBeenerProfileInfo>
            <MainDaBeenerProfileInfo>
                <Avatar size = {100} icon="user"/>
                <div>@닉네임</div>
                <div style={{fontSize: 12}}>아이디</div>
                <Rate disabled defaultValue={4} style={{fontSize: 12}}/>
            </MainDaBeenerProfileInfo>
        </MainDaBeenerProfileForm>
    );
};

export default MainDaBeenerProfile;