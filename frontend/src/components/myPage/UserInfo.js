import React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';
// useRouter를 사용해서 id를 가지고 와서 그 정보를 보여준다!!

const UserInfo = () => {
    // useSelector로 정보를 가져온다. 나일 때랑 다른 사람일 때?..
    return (
        <UserInfoWrapper>
            <div><Icon className="icon" type="mail"/> ansejrrhkd@naver.com</div>
            <div><Icon className="icon" type="phone"/> 010-xxxx-xxxx </div>
            <div><Icon className="icon" type="environment" /> 지도</div>
        </UserInfoWrapper>
    );
};

const UserInfoWrapper = styled.div`
    & div {
        font-size: 20px;
        padding : 4vh;
        & .icon {
            color : #FF4300;
        }
    }
`;

export default UserInfo;