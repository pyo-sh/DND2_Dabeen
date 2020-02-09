import React from 'react';
import styled from 'styled-components';
import {Button} from 'antd';

const MainBottomForm = styled.div`
    margin-top: 20px;
    padding-top: 10px;
    border-top: solid 1px darkgray;
    width: 100%;
    color: #7A7A7A;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > .mainBottomContent {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 15vw;
        font-size: 15px;
    }
`;

const MainBottom = () => {
    return (
        <MainBottomForm>
            <div className="mainBottomContent">
                <div>이용약관</div>
                <div>개인정보 처리방침</div>
                <div>고객센터</div>
                <div>공지사항</div>
            </div>
            <div style={{fontSize: 10}}>Copyright ⓒ DaBeen Team. All rights reserved</div>
        </MainBottomForm>
        );
};

export default MainBottom;