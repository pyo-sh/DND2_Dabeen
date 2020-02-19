import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import PostBasketCapsule from './PostBasketCapsule';

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
            title: "아그야, 오함마 가져와라",
            exec_loc: '부산광역시 남구 대연1동',
            price: 3000,
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
const PostBasket = () => {
    const [allPrice, setAllPrice] = useState(0);
    const [helpCount, setHelpCount] = useState(0);
    const renderPostBasketCapsule = () => {
        const basketArray = Object.keys(dummyBasketData.data);
        // basketArray.map(index => {
        //     tempPrice += dummyBasketData.data[index].indv_help_price;
        //     tempCount++;
        // });
        return (basketArray.map(index => {
            const arrayData = dummyBasketHelp.data[index];
            if(arrayData){
                return (<PostBasketCapsule post={arrayData} key={index}/>);
            }
        }));
    }

    return (
        <PostBasketUpperDiv>
            <div className="Basket-Title">
                <div className="Basket-Title-Sort">
                    <div className="Basket-Title-Name">장바구니</div>
                    <div className="Basket-Title-Money">총 {allPrice}원</div>
                </div>
                <div className="Basket-Title-Sort">
                <div className="Basket-Title-People">2/{helpCount}</div>
                    <Button className="Basket-Title-Btn">결제</Button>
                </div>
            </div>
            <div className="Basket-Content">
                {renderPostBasketCapsule()}
            </div>
        </PostBasketUpperDiv>
    );
};

const PostBasketUpperDiv = styled.div`
    width: 100%;
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