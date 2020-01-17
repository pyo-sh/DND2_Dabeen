import React from 'react';
import {Button, Input, Row, Col} from 'antd';
import styled from 'styled-components';

const Menubar = styled.div`
    /* display: flex;
    justify-content: space-around;
    align-items: center; */
    margin-top: 2vh;
    text-align: center;

    & .logoInput{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    & > .buttonForm{
    }
`;

const MenuBar = () => {
    return (
        <Menubar>
            <Row>
                <Col span={6} offset={2}>
                    <div className="logoInput">
                        <div>로고</div>
                        <Input.Search 
                        placeholder="도움을 검색하세요!"
                        style={{marginLeft: 10}}
                        />
                    </div>
                </Col>
                <Col span={8} offset={8}>
                    <div className = "buttonForm">
                        <Button type="link" size="small" style={{color: 'gray'}}>로그인</Button>
                        <Button type="link" size="small">회원가입</Button>
                    </div>
                </Col>
            </Row>
            {/* <div className="logoInput">
                <div>로고</div>
                <Input.Search 
                placeholder="도움을 검색하세요!"
                style={{marginLeft: 20}}
                />
            </div>
            <div className = "buttonForm">
                <Button type="link" style={{color: 'gray'}}>로그인</Button>
                <Button type="link">회원가입</Button>
            </div> */}
        </Menubar>
    );
};

export default MenuBar;