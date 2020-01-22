// 자기 소개
import React from 'react';
import styled from 'styled-components';

const IntroWrapper = styled.div`
    width : 60%;
    & .header {
        display:  flex;
        justify-content : space-between;
    };
    & .header > button {
        border-radius : 5px;
        border : 1px solid black;
        width: 15%;
        height : 5vh;
        background : white;
        color : black;
        box-shadow : 1px 1px grey;
    }
    & .content {
        display : flex;
        justify-content : center;
        color : darkblue;
    }
    & .map {
        border : 1px solid black;
        width : 80%;
        height : 40vh;
    }
`;

const Introduce = () => {
    return (
        <IntroWrapper>
            <div>
                <div className ="header">
                    <h1>소개</h1>
                    <button>변경</button>
                </div>
                <div className="content">안녕 날 소개하지, 내 직업은 ~ 돈 좀 버는 직업이야</div>
            </div>
            <div>
                <h1>위치</h1>
                <div className="map"></div>
            </div>
        </IntroWrapper>
    );
};

export default Introduce;