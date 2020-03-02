import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostBasketUpperDiv } from './PostBasket.style';
import { Button, Row, Col } from 'antd';

import PayResult from '../money/PayResult';
import PostBasketCapsule from './PostBasketCapsule';
import Payment from '../money/Payment'
import { loadUserBasketPostRequestAction } from '../../reducers/basket';
import { getCookie } from '../../utils/cookieFunction';

const PostBasket = ({ userNum, isMe }) => {
    const dispatch = useDispatch();
    const { userBasketPosts } = useSelector(state => state.basket);
    const [allPrice, setAllPrice] = useState(0);
    const [selectHelps, setSelectHelps] = useState([]);
    const [showPayment, setShowPayment] = useState(false);
    const [showResult, setShowResult] = useState(false);

    // // ComponentDidMount
    // useEffect(() => {
    //     dispatch(loadUserBasketPostRequestAction({userNum}));
    // }, []);
    // userNum이 바뀌면 장바구니도 바뀌겠졍
    useEffect(() => {
        dispatch(loadUserBasketPostRequestAction({userNum, cookie : getCookie()}));
    }, [userNum]);
    
    const clickPayment = useCallback(() => {
        if(selectHelps.length !== 0){
            setShowPayment(prev => !prev);
        }
        else{
            alert("결제할 목록을 선택해주세요!");
        }
    }, [selectHelps]);
    const clickResult = useCallback(() => {
        // 돌아갈 때 render를 초기화 하기 위함
        if(showResult){
            setAllPrice(0);
            setSelectHelps([]);
            dispatch(loadUserBasketPostRequestAction({userNum, cookie : getCookie()}));
            setShowResult(false);
        }
        else{
            setShowResult(true);
        }
    }, [showResult]);

    return (
        <>
        <PostBasketUpperDiv>
            <div className="BasketTitle">
                <div className="BasketTitleMain">
                    <div className="BasketTitleName">장바구니</div>
                    <div className="BasketTitleMoney">총 {allPrice}원</div>
                </div>
                <div className="BasketTitleSort">
                    <div className="BasketTitlePeople">{selectHelps.length}/{userBasketPosts && userBasketPosts.length}</div>
                    <Button className="BasketTitleBtn" onClick={clickPayment}>결제</Button>
                </div>
            </div>
            {showResult
            ?   <PayResult setVisible={clickResult}/>
            :   <Row
                    className="BasketContent"
                    gutter={10}
                    >
                    {userBasketPosts && userBasketPosts.map(basket => (
                        <Col lg={24} xl={12} xxl={12} key={basket.helpNum}>
                            <PostBasketCapsule post={basket} setAllPrice={setAllPrice} setSelectHelps={setSelectHelps}/>
                        </Col>) )}
                </Row>
            }
        </PostBasketUpperDiv>
        <Payment
            userNum={userNum}
            showPayment={showPayment}
            clickPayment={clickPayment}
            allPrice={allPrice}
            selectHelps={selectHelps}
            setResultVisible={clickResult}
            />
        </>
    );
};

export default PostBasket;