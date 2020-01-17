import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

const MainForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > .mainImage {
        border: solid 1px gray;
        width: 90vw;
        height: 30vh;
        margin-top: 30px;
        text-align: center;
    }

    & > .buttonForm {
        margin-top: 30px;
    }

    & > h1 {
        margin-top: 50px;
        color: gray;
        font-size: 30px;
    }
`;

const LiveHelpRequestMenuBar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    & > .liveHelpRequest {
        border-bottom: solid 1px gray;  /*선택시 색상 변경되게*/
        width: 10vw;
        font-size: 17px;
        margin-top: 10px;
        margin-left: 25px;
    }
`;

const Main = () => {
    return (
        <MainForm>
            <div className = "mainImage"> {/* 다빈 소개글 적는 부분 */}
                <div style={{fontSize:"40px"}}>DaBeen</div>
                <p>
                    대충 우리 사이트 설명 어쩌고 저쩌고 다빈이라는 이름 예쁘다
                    나는 딸 가지면 이름을 아영이로 짓고싶다 ^^!
                    <br />
                    배경은 사진 넣으면ㄷ ㅚㅁㄷ
                </p>
            </div>
            <div className="buttonForm"> {/* 카테고리 */}   
                <Button size="large" style={{marginLeft: 20}}>카테고리1</Button>
                <Button size="large" style={{marginLeft: 20}}>카테고리2</Button>
                <Button size="large" style={{marginLeft: 20}}>카테고리3</Button>
                <Button size="large" style={{marginLeft: 20}}>카테고리4</Button>     
            </div>
            <h1>실시간 도움 요청</h1>
            <LiveHelpRequestMenuBar>
                <div className="liveHelpRequest">메뉴1</div>
                <div className="liveHelpRequest">메뉴2</div>
                <div className="liveHelpRequest">메뉴3</div>
                <div className="liveHelpRequest">메뉴4</div>
            </LiveHelpRequestMenuBar>
        </MainForm>
    );
};

export default Main;