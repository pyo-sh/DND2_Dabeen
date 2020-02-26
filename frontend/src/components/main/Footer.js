import React from 'react';
import Link from 'next/link';
import { FooterBox } from './Footer.style';
import {Button} from 'antd';

const Footer = () => {
    return (
        <FooterBox>
            <div>
                <Button type='link' style={{color: 'darkgray'}}>이용약관</Button>
                <Button type='link' style={{color: 'darkgray'}}>개인정보 처리방침</Button>
                <Link href="/service"><a>고객센터</a></Link>
                <Button type='link' style={{color: 'darkgray'}}>공지사항</Button>
            </div>
            <div>Copyright ⓒ DaBeen Team. All rights reserved</div>
        </FooterBox>
        );
};

export default Footer;