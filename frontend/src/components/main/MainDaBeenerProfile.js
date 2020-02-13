import React from 'react';
import { Avatar, Rate } from 'antd';
import styled from 'styled-components';

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
`;

export default MainDaBeenerProfile;