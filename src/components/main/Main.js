import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'antd';
import LiveHelpRequest from './LiveHelpRequest';
import MainDaBeenerProfile from './MainDaBeenerProfile';
import { loadLivePostRequestAction } from '../../reducers/posts';
import {LiveHelpRequestMenuBar, MainForm} from './Main.style';
import { loadRecommendRequest } from '../../reducers/opponent';
import { getCookie } from '../../utils/cookieFunction';

const image = ['main1.jpg', 'main2.jpg', 'main3.jpg', 'main4.jpg'];
const Main = () => {
    const dispatch = useDispatch();
    const { me : { address, userNum }} = useSelector(state => state.user);
    const { recommendOpponents, sggUser } = useSelector(state => state.opponent);
    const { isUserResult } = useSelector(state => state.posts);
    const [selectLiveMenu, setSelectLiveMenu] = useState("errand");

    const getLivePost = useCallback((categoryNum = 1000) => () => {
        dispatch(loadLivePostRequestAction({categoryNum, location : address}));
        setSelectLiveMenu(categoryNum === 1000 ? "errand" : categoryNum === 2000 ? "rent" : "etc");
    }, [address]);
    
    useEffect(() => {
        dispatch(loadRecommendRequest({address, userNum, cookie : getCookie()}));
        dispatch(loadLivePostRequestAction({location: address, categoryNum : 1000}))
    }, [address, userNum]);

    return (
        <MainForm>
            <Carousel className="MainCarousel" autoplay dots>
                {image.map(img => (
                        <img key={img} src={`/images/${img}`} alt={img}/>
                ))}
            </Carousel>
            <div className="LiveHelpRequestWrapper">
                <LiveHelpRequestMenuBar selectLiveMenu={selectLiveMenu}>
                    <div></div>
                    <h1 className="LiveHelpRequestTitle">{isUserResult ? "주변 실시간 도움 " : "전체 실시간 도움" }</h1>
                    <div className="LiveHelpRequestForm">
                        <div className="LiveHelpRequest" name="errand" onClick={getLivePost(1000)}>심부름</div>
                        <div className="LiveHelpRequest" name="rent" onClick={getLivePost(2000)}>대여</div>
                        <div className="LiveHelpRequest" name="etc" onClick={getLivePost(3000)}>잡일</div>
                    </div>
                </LiveHelpRequestMenuBar>
                <LiveHelpRequest />
            </div>
            <div className="MainDaBeenerProfileWrapper">
                <div className="MainDaBeenerProfileTitle">{sggUser ? "내 주변의 높은 평점을 가진 DaBeener를 확인하세요!" : "전체에서 높은 평점을 가진 DaBeener를 확인하세요!"}</div>
                {recommendOpponents && <MainDaBeenerProfile recommendOpponents={recommendOpponents} />}
            </div>
        </MainForm>
    );
};

export default Main;