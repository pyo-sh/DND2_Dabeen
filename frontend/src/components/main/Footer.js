import React from 'react';
import styled from 'styled-components';
import {Button} from 'antd';

const Footer = () => {
    return (
        <FooterBox>
            <div>
                <Button type='link' style={{color: 'darkgray'}}>이용약관</Button>
                <Button type='link' style={{color: 'darkgray'}}>개인정보 처리방침</Button>
                <Button type='link' style={{color: 'darkgray'}}>고객센터</Button>
                <Button type='link' style={{color: 'darkgray'}}>공지사항</Button>
            </div>
            <div>Copyright ⓒ DaBeen Team. All rights reserved</div>
        </FooterBox>
        );
};

const FooterBox = styled.div`
    position: absolute;
    height : 2.5rem;
    width : 100%;
    bottom: 0;
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

export default Footer;