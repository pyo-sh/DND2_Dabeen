import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import {useRouter} from 'next/router';
import GiveHelp from '../../../../components/myPage/GiveHelp';
import TakeHelp from '../../../../components/myPage/TakeHelp';
import UserInfo from '../../../../components/myPage/UserInfo';

const UserPage = () => {
    const router = useRouter();
    const {userid, pagename} = router.query;
    return (
        <UserPageWrapper>
            <section className="profileSection">
                <div className="userProfile">
                </div>
                <div>안녕하세요 ~ 입니다</div>
            </section>
            <section className="contentSection">
                <ul>
                    <li><Link href="/userpage/[userid]/[pagename]" as={`/userpage/${userid}/userinfo`}><a className={pagename==="userinfo" ? "click" : ""}>상세정보</a></Link></li>
                    <li><Link href="/userpage/[userid]/[pagename]" as={`/userpage/${userid}/takehelp`}><a className={pagename==="takehelp" ? "click" : ""}>받은 도움</a></Link></li>
                    <li><Link href="/userpage/[userid]/[pagename]" as={`/userpage/${userid}/givehelp`}><a className={pagename==="givehelp" ? "click" : ""}>준 도움</a></Link></li>
                    <li><Link href="/userpage/[userid]/[pagename]" as={`/userpage/${userid}/service`}><a className={pagename==="service" ? "click" : ""}>고객센터</a></Link></li>
                </ul>
                <div>
                    {
                      pagename === "userinfo" ? <UserInfo/> :
                      pagename === "takehelp" ? <TakeHelp/> :
                      pagename === "givehelp" ? <GiveHelp/> : 
                      null
                    }
                </div>
            </section>
        </UserPageWrapper>
    );
};

const UserPageWrapper = styled.article`
    margin-top : 30px;
    height: 100%;
    width : 100%;
    display : flex;
    justify-content : center;
    align-items : center;
    @media screen and (max-width: 768px) {
        flex-direction : column;
    }
    & a {
        color : black;
        cursor: pointer;
    }
    & a.click {
        color : #ff4300;
    }
    & .profileSection {
        width : 40%;
        height : 100%;
        & .userProfile {
            margin-top : 40px;
            border : 1px solid darkgrey;
            width : 80%;
            height : 50%;
        }
    }
   & .contentSection {
       display: flex;
       flex-direction : column;
       justify-content : center;
       align-items : center;
       margin-top : 70px;
       width : 60%;
       height : 100%;
       & ul {
           display : flex;
           justify-content : space-evenly;
           list-style : none;
           border-bottom : 1px solid darkgray;
           overflow : auto;
           width : 80%;
           min-width : 350px;
           & li {
               padding : 15px;
           }
       }
   }
`;
export default UserPage;