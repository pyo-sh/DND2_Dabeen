import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Button, Row, Col } from 'antd';
import PostBasketCapsule from './PostBasketCapsule';
import Router from 'next/router';
import Payment from '../money/Payment';

const dummyBasketData = {
    transactionTime: '',
    resultCode: '',
    description: '',
    data: {
        1:{
            bskt_num: "1",    // 장바구니번호
            help_num: "1",    // 도움번호
            suppl_num: "3",  // 공급자번호
            indv_help_price: 3000,    // 개별도움금액
        },
        2:{
            bskt_num: "1",
            help_num: "2",
            suppl_num: "3",
            indv_help_price: 2000,
        },
        3:{
            bskt_num: "1",
            help_num: "3",
            suppl_num: "3",
            indv_help_price: 5000,
        },
    }
}
const dummyBasketHelp = {
    transactionTime: '',
    resultCode: '',
    description: '',
    data: {
        1: {
            help_num: 1,
            help_pstn_dttm: '2020-02-18',
            cat_num: '1',
            cnsr_num: '1',
            title: "이거는 테스트야 이름이 너무 길면 사라지는지 안사라지는지",
            exec_loc: '이거는 테스트야 이름이 너무 길면 사라지는지 안사라지는지',
            price: 300000000,
            pref_suppl_num: '1',
            pref_help_exec_dttm: '2020-03-23',
            help_aply_cls_dttm: '2020-02-29',
            cont: '오함마 내놔',
            help_aprv_whet: 'false',
            exec_sgg_name: '',
        },
        2: {
            help_num: 2,   // 도움번호
            help_pstn_dttm: '2020-02-18', // 도움게시일시
            cat_num: '4,5,6',    // 카테고리번호
            cnsr_num: '2',   // 수요자번호
            title: "치킨 배달하실 분 9함",  // 제목
            exec_loc: '부산광역시 남구 남천동',   // 이행위치
            price: 2000,  // 금액
            pref_suppl_num: 1, // 희망공급자수
            pref_help_exec_dttm: '2020-02-21',    // 희망도움이행일시
            help_aply_cls_dttm: '2020-02-20', // 도움신청마감일시
            cont: '네네치킨이다',   // 내용
            help_aprv_whet: 'false', // 도움승인여부
            exec_sgg_name: '',  // 이행시군구명
        },
        3: {
            help_num: 3,
            help_pstn_dttm: '2020-02-18',
            cat_num: '1',
            cnsr_num: '3',
            title: "보드게임방 같이 가주실 분",
            exec_loc: '부산광역시 남구 대연1동',
            price: 5000,
            pref_suppl_num: 3,
            pref_help_exec_dttm: '2020-02-23',
            help_aply_cls_dttm: '2020-02-22',
            cont: '보드게임 너무좋아',
            help_aprv_whet: 'false',
            exec_sgg_name: '',
        },
    },
}
const PostBasket = ({isMe}) => {
    // useEffect(() => {
    //     if(!isMe) {
    //         alert('자신만 볼 수 있는 페이지입니다.');
    //         Router.push('/');
    //     }
    // }, [isMe]);
    const [allPrice, setAllPrice] = useState(0);
    const [selectHelps, setSelectHelps] = useState([]);
    const [showPayment, setShowPayment] = useState(false);

    const clickPayment = useCallback(() => {
        setShowPayment(prev => !prev);
    }, []);
    const renderPostBasketCapsule = () => {
        const basketArray = Object.keys(dummyBasketData.data);
        // basketArray.map(index => {
        //     tempPrice += dummyBasketData.data[index].indv_help_price;
        //     tempCount++;
        // });
        return (basketArray.map(index => {
            const arrayData = dummyBasketHelp.data[index];
            if(arrayData){
                return (
                    <Col lg={24} xl={12} xxl={12} key={arrayData.help_num}>
                        <PostBasketCapsule post={arrayData} setAllPrice={setAllPrice} setSelectHelps={setSelectHelps}/>
                    </Col>
                );
            }
        }));
    }

    return (
        <>
        <PostBasketUpperDiv>
            <div className="BasketTitle">
                <div className="BasketTitleMain">
                    <div className="BasketTitleName">장바구니</div>
                    <div className="BasketTitleMoney">총 {allPrice}원</div>
                </div>
                <div className="BasketTitleSort">
    <div className="BasketTitlePeople">3/{selectHelps.length}</div> {/* 불러온 데이터의 길이 중 / 선택된 길이로 해야함 근데   분자/ 분모 가 맞는게 아닌가 */}
                    <Button className="BasketTitleBtn" onClick={clickPayment}>결제</Button>
                </div>
            </div>
            <Row
                className="BasketContent"
                gutter={10}
                >
                {renderPostBasketCapsule()}
            </Row>
        </PostBasketUpperDiv>
        <Payment showPayment={showPayment} clickPayment={clickPayment} allPrice={allPrice} selectHelps={selectHelps}/>
        </>
    );
};

const PostBasketUpperDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    & .BasketTitle{
        width: 100%;
        padding-bottom: 25px;
        border-bottom: 1px solid #BFC7CE;
        display: flex;
        align-items: flex-end;
        flex-wrap: wrap;
        & .BasketTitleMain{
            display: flex;
            align-items: flex-end;
        }
        & .BasketTitleSort{
            margin: 10px 0 0 auto;
            display: flex;
            align-items: flex-end;
        }
        & .BasketTitleName{
            width: 150px;
            font-size: 40px;
            font-weight: bold;
        }
        & .BasketTitleMoney{
            font-size: 25px;
            padding-left: 20px;
        }
        & .BasketTitlePeople{
            font-size: 20px;
            padding-right: 15px;
        }
        & .BasketTitleBtn{
            width: 80px;
            height: 27.5px;
            color: white;
            background: #FF4300;
            border-radius: 10px;
            justify-self: flex-end;
        }
    }
    & .BasketContent{
        
    }
`;

export default PostBasket;