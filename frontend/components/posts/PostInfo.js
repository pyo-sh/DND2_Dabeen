import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';

const PostInfo = () => {
    return (
        <PostInfoBox>
            <Icon className="icon" type="close" />
            <div className="title">

                <h1>제목</h1>
                작성일 :
                작성자 : 
            </div>
            <div className="helpInfo">
                <h1>도움정보</h1>
                못 잘 박을 수 있는 망치가 필요합니다.
                거기에다가 빌려주시는 분이 망치질을 잘 하셨으면 좋겠습니다.
            </div>
            <div className="price">
                <h1>가격</h1>
                열정페이
            </div>
            <div className="time">
                <h1>시간</h1>
                오후 3시 ~ 4시사이
            </div>
            <div className="location">
                <h1>위치</h1>
                <div></div>
            </div>
        </PostInfoBox>
    );
};

const PostInfoBox = styled.div`
    border : 1px solid black;
    position : absolute;
    top : 50%;
    left : 50%;
    transform : translate(-50%, -50%);
    display : flex;
    flex-direction : column;

    & .icon {
        margin-left: auto;
        font-size: 1.5em;
    }
`;

export default PostInfo;