import React from 'react';
import Link from 'next/link';
import { FooterBox } from './Footer.style';

const Footer = () => {
    return (
        <FooterBox>
            <div className="FooterBoxWrapper">
                <Link href="/service"><a>이용약관</a></Link>
                <Link href="/service"><a>개인정보 처리방침</a></Link>
                <Link href="/service"><a>고객센터</a></Link>
                <Link href="/service"><a>공지사항</a></Link>
            </div>
            <div className="FooterCopyright">Copyright ⓒ DaBeen Team. All rights reserved</div>
        </FooterBox>
        );
};

export default Footer;