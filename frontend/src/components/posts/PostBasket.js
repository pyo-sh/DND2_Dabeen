import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import PostBasketCapsule from './PostBasketCapsule';

const PostBasket = () => {
    return (
        <PostBasketUpperDiv>
            <div className="Basket-Title">
                <div className="Basket-Title-Sort">
                    <div className="Basket-Title-Name">장바구니</div>
                    <div className="Basket-Title-Money">총 30,000원</div>
                </div>
                <div className="Basket-Title-Sort">
                    <div className="Basket-Title-People">2/2</div>
                    <Button className="Basket-Title-Btn">결제</Button>
                </div>
            </div>
            <div className="Basket-Content">
                <PostBasketCapsule></PostBasketCapsule>
            </div>
        </PostBasketUpperDiv>
    );
};

const PostBasketUpperDiv = styled.div`
    width: 100%;
    margin: 100px 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    & .Basket-Title{
        width: 500px;
        padding-bottom: 30px;

        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        & .Basket-Title-Sort{
            display: flex;
            align-items: flex-end;
        }
        & .Basket-Title-Name{
            font-size: 40px;
            font-weight: bold;
        }
        & .Basket-Title-Money{
            font-size: 25px;
            padding-left: 20px;
        }
        & .Basket-Title-People{
            font-size: 20px;
            padding-right: 15px;
        }
        & .Basket-Title-Btn{
            width: 80px;
            height: 27.5px;
            color: white;
            background: #FF4300;
            border-radius: 10px;
        }
    }
    & .Basket-Content{
        display: flex;
        flex-direction: column;
    }
`;

export default PostBasket;