import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';

const PostBasketCapsule = () => {
    const [iconState, setIconState] = useState(false);
    const onClickIcon = useCallback((e) => {
        setIconState(!iconState);
    } , [iconState]);
    return (
        <PostBasketCapsuleWrapper>
            <PostBasketCheckIcon
                type="check-circle"
                setcolor={iconState}
                onClick={onClickIcon}
                />
            <PostBasketCapsuleUpperDiv>
                <div className="Basket-Capsule-Capture">

                </div>
                <PostBasketContent>
                    <div className="PostBasketContent-Title">튼튼 오함마 망치가 필요해요</div>
                    <div className="PostBasketContent-Info">
                        <div className="PostBasketContent-Info-Money">20,000원</div>
                        <div className="PostBasketContent-Info-TimeWrapper">
                            <div className="PostBasketContent-Info-FinishTime">신청 마감 : 20~~년 ~월 ~일</div>
                            <div className="PostBasketContent-Info-DoingTime">수행일 : 20~~년 ~월 ~일</div>
                        </div>
                    </div>
                    <div className="PostBasketContent-People">
                        <div className="PostBasketContent-People-Applied">신청인원 : 3/3</div>
                        <div className="PostBasketContent-People-Btn">재 선택</div>
                    </div>
                    <div className="PostBasketContent-PayCheck">
                        결제가능
                    </div>
                </PostBasketContent>
            </PostBasketCapsuleUpperDiv>
        </PostBasketCapsuleWrapper>
    );
};

const PostBasketCapsuleWrapper = styled.div`
    display: flex;
    align-items: center;
`;
const PostBasketCapsuleUpperDiv = styled.div`
    width: 500px;
    padding: 40px 0;
    border-top: 1px solid #d9d9d9;
    display: flex;
    align-items: center;
    & .Basket-Capsule-Capture{
        width: 225px;
        height: 150px;
        margin-right: 10px;
        border: 1px solid #d9d9d9;
        border-radius: 10px;
    }
`;
const PostBasketCheckIcon = styled(Icon)`
    font-size: 20px;
    margin-left: -30px;
    margin-right: 10px;
    color: ${props => props.setcolor? "#FF3400" : "none"};
    cursor: pointer;
`;
const PostBasketContent = styled.div`
    margin-left: 10px;
    & .PostBasketContent-Title{
        font-size: 20px;
        font-weight: bold;
    }
    & .PostBasketContent-Info{
        display: flex;
        padding-bottom: 10px;
        & .PostBasketContent-Info-Money{
            padding-right: 10px;
            border-right: 1px solid #d9d9d9;
        }
        & .PostBasketContent-Info-TimeWrapper{
            padding-left: 10px;
            & .PostBasketContent-Info-FinishTime{
                
            }
            & .PostBasketContent-Info-DoingTime{

            }
        }
    }
    & .PostBasketContent-People{
        padding-top: 10px;
        border-top: 1px solid #d0d0d0;
        display: flex;
        align-items: flex-end;
        & .PostBasketContent-People-Applied{
            margin-right: 10px;
        }
        & .PostBasketContent-People-Btn{
            width: 50px;
            margin-left: 10px;
            text-align: center;
            color: white;
            background: #FF4300;
            border-radius: 10px;
        }
    }
    & .PostBasketContent-PayCheck{

    }
`;

export default PostBasketCapsule;