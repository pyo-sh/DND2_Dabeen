import React from 'react';
import styled from 'styled-components';
import {Button} from 'antd';

const MainBottomForm = styled.div`
    margin-top: 30px;
    padding-top: 10px;
    border-top: solid 1px darkgray;
    width: 100%;
    color: gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const MainBottom = () => {
    return (
        <MainBottomForm>
            <div>
                <Button type='link' style={{color: 'darkgray'}}>이용약관</Button>
                <Button type='link' style={{color: 'darkgray'}}>개인정보 처리방침</Button>
                <Button type='link' style={{color: 'darkgray'}}>고객센터</Button>
                <Button type='link' style={{color: 'darkgray'}}>공지사항</Button>
            </div>
            <div>Copyright ⓒ DaBeen Team. All rights reserved</div>
        </MainBottomForm>
        );
};

export default MainBottom;