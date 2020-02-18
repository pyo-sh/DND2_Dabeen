import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import {useRouter} from 'next/router';
import GiveHelp from '../../../../components/myPage/GiveHelp';
import TakeHelp from '../../../../components/myPage/TakeHelp';
import UserInfo from '../../../../components/myPage/UserInfo';
import ServiceCenter from '../../../../components/service/ServiceCenter';
import StarScore from '../../../../components/myPage/StarScore';

const UserPage = () => {
    const router = useRouter();
    const {userid, pagename} = router.query;
    return (
        <UserPageWrapper>
            <section className="profileSection">
                <div className="userProfile">
                </div>
                <div>안녕하세요 ~ 입니다</div>
                <div>총 평점</div>
                <div><StarScore score={4.5}/>{4.5}</div>
                <button>다비너 신청</button>
            </section>
            <section className="contentSection">
                <ul className="contentNavbar">
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
                      pagename === "service" ? <ServiceCenter/> : null
                    }
                </div>
            </section>
        </UserPageWrapper>
    );
};

const UserPageWrapper = styled.article`
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
        width : 30%;
        height : 100%;
        display : flex;
        flex-direction : column;
        align-items : center;
        & .userProfile {
            margin-top : 40px;
            border : 1px solid darkgrey;
            border-radius :5px;
            width : 20vw;
            min-width : 200px;
            max-width : 300px;
            height : 20vw;
            min-height : 200px;
            max-height : 300px;
        }
        & button {
            color : white;
            border : 0;
            background : #ff4300;
            border-radius : 5px;
            width: 150px;
            height : 30px;
            cursor: pointer;
            &:hover {
                color : black;
            }
        }
    }
   & .contentSection {
       display: flex;
       flex-direction : column;
       align-items : center;
       width : 55%;
       height : 100%;
       & .contentNavbar {
           display : flex;
           margin : 40px 0 0;
           justify-content : space-evenly;
           list-style : none;
           border-bottom : 1px solid darkgray;
           width : 100%;
           min-width : 350px;
           & li {
               padding : 15px;
           }
       }
       & > div {
           width : 80%;
       }
   }
`;
export default UserPage;