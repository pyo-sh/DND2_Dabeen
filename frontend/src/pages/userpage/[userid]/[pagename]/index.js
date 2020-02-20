import React, { useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';
import GiveHelp from '../../../../components/myPage/GiveHelp';
import TakeHelp from '../../../../components/myPage/TakeHelp';
import UserInfo from '../../../../components/myPage/UserInfo';
import ServiceCenter from '../../../../components/service/ServiceCenter';
import StarScore from '../../../../components/myPage/StarScore';
import { Rate } from 'antd';

const UserPage = ({userid, pagename}) => {
    // const router = useRouter();
    // const {userid, pagename} = router.query;
    const dabeenerRegist = useCallback(() => {
        Router.push('/regist');
    }, []);
    return (
        <UserPageWrapper>
            <section className="profileSection">
                <div className="userInfomation">
                    <img className="userImage"></img>
                    <div className="userIntroduce">
                        <h1 className="userNickname">유저 닉네임</h1>
                        {/* <div className="userRate">
                            <div>
                                <Rate allowHalf disabled defaultValue={4.2} style={{fontSize: 12}}/>
                            </div>
                            <div className="userRateTitle">(3.8)</div>
                        </div> */}
                        <button
                            onClick={dabeenerRegist}
                            className="userRegistButton"
                            >
                            다비너 신청
                        </button>
                        <div className="userParagraph">안녕하세요 ~ 입니다</div>
                    </div>
                </div>
                <ul className="contentNavbar">
                    <h1>메뉴</h1>
                    <li className={pagename==="userinfo" ? "click" : ""}><Link href="/userpage/[userid]/[pagename]" as={`/userpage/${userid}/userinfo`}><a>상세정보</a></Link></li>
                    <li className={pagename==="takehelp" ? "click" : ""}><Link href="/userpage/[userid]/[pagename]" as={`/userpage/${userid}/takehelp`}><a>받은 도움</a></Link></li>
                    <li className={pagename==="givehelp" ? "click" : ""}><Link href="/userpage/[userid]/[pagename]" as={`/userpage/${userid}/givehelp`}><a>준 도움</a></Link></li>
                    <li className={pagename==="service" ? "click" : ""}><Link href="/userpage/[userid]/[pagename]" as={`/userpage/${userid}/service`}><a>고객센터</a></Link></li>
                </ul>
            </section>
            <section className="contentSection">
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
    @media screen and (max-width: 768px) {
        flex-direction : column;
        align-items : center;
    }
    & a {
        color : black;
        cursor: pointer;
    }
    & .profileSection {
        width : 20vw;
        min-width : 200px;
        max-width : 300px;
        height : 100%;

        display : flex;
        flex-direction : column;
        align-items : center;
        & .userInfomation {
            width: 100%;
            border : 1px solid #d0d0d0;
            border-radius :5px;
        }
        & .userImage{
            width: 100%;
            height : 20vw;
            min-height : 200px;
            max-height : 300px;
            border-radius: 5px;
        }
        & .userIntroduce{
            width: 100%;
            padding: 10px 15px;
            display: flex;
            flex-direction: column;
            & .userNickname{
                margin-bottom: 0;
            }
        }
        & .userParagraph{
            padding-top: 17.5px;
        }
        & .userRate{
            display: flex;
            align-items: center;
            padding-left: 3px;
            & .userRateTitle{
                color: #FF4300;
                padding: 4px 0 0 13px;
                font-size: 15px;
                font-weight: bold;
            }
        }
        & .userRegistButton{
            width: 100%;
            border : 0;
            background : #F0F0F0;
            border-radius : 5px;
            height : 27px;
            cursor: pointer;
            &:hover {
                color : black;
            }
        }
        & .contentNavbar {
            width : 100%;
            padding: 10px;
            margin: 25px 0;
            display : flex;
            flex-direction: column;
            justify-content : space-evenly;
            list-style : none;
            border-top: 1px solid #F0F0F0;
            border-bottom: 1px solid #F0F0F0;
           & li {
                margin: 5px;
                padding: 10px;
                border-radius: 2px;
           }
            & .click {
                & a{
                    color : #FF9644;
                }
                background: #F0F0F0;
                border-right: 3px solid #FF4300
            }
       }
    }
   & .ant-rate {
       color : #ff4300;
   }
   & .contentSection {
       display: flex;
       flex-direction : column;
       align-items : center;
       width : 60%;
       height : 100%;
       & > div {
           width : 80%;
       }
   }
`;

UserPage.getInitialProps = async context => {
    const { pagename, userid } = context.query;
    // 페이지네임에 따라 다른 정보를 가지고 온다..
    // context.store.dispatch({
//     type: LOAD_POST_REQUEST,
//     data: context.query.id
//   });
    return { pagename, userid }
}
export default UserPage;