import React from 'react';
import Link from 'next/link';
import { FooterBox, FooterCol } from './Footer.style';
import { Row } from 'antd';

const Footer = () => {
    return (
        <FooterBox>
            <div className="FooterBoxWrapper">
                <div>
                    <Link href="/service"><a>이용약관</a></Link>
                    <Link href="/service"><a>개인정보 처리방침</a></Link>
                </div>
                <div>
                    <Link href="/service"><a>고객센터</a></Link>
                    <Link href="/service"><a>공지사항</a></Link>
                </div>
            </div>
            <div className="FooterCopyright">Copyright ⓒ DaBeen Team. All rights reserved</div>
        </FooterBox>
        );
};

export default Footer;