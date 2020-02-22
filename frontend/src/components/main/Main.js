import React, {useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Carousel } from 'antd';
import LiveHelpRequest from './LiveHelpRequest';
import MainDaBeenerProfile from './MainDaBeenerProfile';
import { loadRecommendRequest } from '../../reducers/opponent';
import { loadLivePostRequestAction } from '../../reducers/posts';

const image = ['main1.jpg', 'main2.jpg', 'main3.jpg', 'main4.jpg'];
const Main = () => {
    const dispatch = useDispatch();
    const { userInfo : { blonSggName }} = useSelector(state => state.user);
    const { recommendOpponents } = useSelector(state => state.opponent);
    const getLivePost = useCallback((categoryNum = 1000) => () => {
        dispatch(loadLivePostRequestAction(categoryNum));
    }, []);
    useEffect(() => {
        dispatch(loadRecommendRequest(blonSggName));
        getLivePost()();
    }, []);
    


    return (
        <MainForm>
            {/* <div className = "mainImage"> 다빈 소개글 적는 부분 */}
                {/* <div style={{fontSize:"40px"}}>DaBeen</div>
                <p>
                    대충 우리 사이트 설명 어쩌고 저쩌고 다빈이라는 이름 예쁘다
                    나는 딸 가지면 이름을 아영이로 짓고싶다 ^^!
                    <br />
                    배경은 사진 넣으면됩니당.
                </p> */}
                <Carousel autoplay dots>
                    {image.map(img => (
                            <img key={img} src={`/images/${img}`} alt={img}/>
                    ))}
                </Carousel>
            {/* </div> */}
            <LiveHelpRequestMenuBar>
                <div className="title">실시간 도움 요청</div>
                <div className="liveHelpRequestForm">
                    <div className="liveHelpRequest" onClick={getLivePost(1000)}>심부름</div>
                    <div className="liveHelpRequest" onClick={getLivePost(2000)}>대여</div>
                    <div className="liveHelpRequest" onClick={getLivePost(3000)}>잡일</div>
                </div>
            </LiveHelpRequestMenuBar>
            <LiveHelpRequest />
            <div className="title">내 주변의 높은 평점을 가진 DaBeener를 확인하세요!</div>
            {recommendOpponents && <MainDaBeenerProfile recommendOpponents={recommendOpponents} />}
        </MainForm>
    );
};

const MainForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width : 100%;
    margin-top: -2vh;
    & .ant-carousel {
        width : 100%;
        height : 50vh;
        & img {
            width : 100%;
            height : 50vh;
        }
        & .slick-dots li button::before {
            content : ""
        }
    }
    & > .mainImage {
        border: solid 1px gray;
        width: 90%;
        margin-top: 30px;
        text-align: center;
        padding : 24px;
    }

    & .title {
        color: #424242;
        font-size: 48px;

        @media only screen and (max-width: 1024px){
            font-size: 36px;
        }

        @media only screen and (max-width: 768px){
            font-size: 28px;
        }

        @media only screen and (max-width: 425px){
            font-size: 20px;
        }
    }
`;

const LiveHelpRequestMenuBar = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100vw;
    margin-top: 5vh;

    & .liveHelpRequestForm {
        display: flex;
        justify-content: space-around;
        width: 20vw;

        @media only screen and (max-width: 425px){
            margin-left: 1vw;
        }
    }

    & .liveHelpRequest {
        /*선택시 색상 변경되게*/
        font-size: 30px;
        cursor: pointer;
        
        :hover{
            color: #FF4300;
        }

        @media only screen and (max-width: 1024px){
            font-size: 20px;
        }

        @media only screen and (max-width: 768px){
            font-size: 18px;
        }

        @media only screen and (max-width: 425px){
            font-size: 12px;
        }
    }
`;

export default Main;