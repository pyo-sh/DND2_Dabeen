import React from 'react';
import {Button, Input} from 'antd';
import styled from 'styled-components';

const Menubar = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;

    & > .logoInput{
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const MenuBar = () => {
    return (
        <Menubar>
            <div className="logoInput">
                <div>로고</div>
                <Input.Search 
                placeholder="도움을 검색하세요!"
                style={{width: 500, marginLeft: 20}}
                />
            </div>
            <div>
                <Button type="link" style={{color: 'gray'}}>로그인</Button>
                <Button type="link">회원가입</Button>
            </div>
        </Menubar>
    );
};

export default MenuBar;