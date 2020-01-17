//사이드 바(내 정보, 내 평가, 고객센터)
import React from 'react';
import styled from 'styled-components';

const Side = styled.ul`
    list-style : none;
    & li {
        width : 20%;
        padding : 5px;
        border-bottom : 1px solid black;
        color : black;
    }
`;

const SideBar = () => {
    return ( //페이지 이동하는거 만들어야함
        <Side>
            <li>내 정보</li>
            <li>내 평가</li>
            <li>고객센터</li>
        </Side>
    );
};

export default SideBar;