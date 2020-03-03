import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostBasketUpperDiv } from './PostBasket.style';
import { Button, Row, Col } from 'antd';

import PostBasketCapsule from './PostBasketCapsule';
import Payment from '../money/Payment'
import { loadUserBasketPostRequestAction, postPaidFalseRequestAction } from '../../reducers/basket';
import { getCookie } from '../../utils/cookieFunction';

const PostBasket = ({ userNum, isMe }) => {
    const dispatch = useDispatch();
    const { userBasketPosts } = useSelector(state => state.basket);
    const [allPrice, setAllPrice] = useState(0);
    const [selectHelps, setSelectHelps] = useState([]);
    const [showPayment, setShowPayment] = useState(false);

    // userNum이 바뀌면 장바구니도 바뀌겠졍
    useEffect(() => {
        setAllPrice(0);
        setSelectHelps([]);
        dispatch(loadUserBasketPostRequestAction({userNum, cookie : getCookie()}));
    }, [userNum]);
    
    const clickPayment = useCallback(() => {
        if(selectHelps.length !== 0){
            setShowPayment(prev => !prev);
            dispatch(postPaidFalseRequestAction());
        }
        else{
            alert("결제할 목록을 선택해주세요!");
        }
    }, [selectHelps]);

    const reRender = useCallback(() => {
        dispatch(loadUserBasketPostRequestAction({userNum, cookie : getCookie()}));
        setShowPayment(false);
    });

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
            <Row
                className="BasketContent"
                gutter={10}
                >
                {userBasketPosts && userBasketPosts.map(basket => (
                    <Col lg={24} xl={12} xxl={12} key={basket.helpNum}>
                        <PostBasketCapsule post={basket} setAllPrice={setAllPrice} setSelectHelps={setSelectHelps}/>
                    </Col>))}
            </Row>
        </PostBasketUpperDiv>
        <Payment
            userNum={userNum}
            showPayment={showPayment}
            clickPayment={clickPayment}
            allPrice={allPrice}
            selectHelps={selectHelps}
            reRenderFunction={reRender}
            />
        </>
    );
};

export default PostBasket;