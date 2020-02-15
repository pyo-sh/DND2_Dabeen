import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import {Input, Button, Modal} from 'antd';
import MyLocation from './MyLocation';
import DaumPostcode from 'react-daum-postcode';

//location : 검색한 주소를 담을 변수
//getLocation: 검색한 주소를 location에 저장하는 함수
//click: 주소 검색 버튼 클릭시 상태가 변하는 변수
//clickButton: 주소 검색 버튼 클릭시 수행 할 함수
//onClose: Modal창을 닫거나 주소 검색 후 지도 창을 표시하게 하는 함수
const SearchJuso = ({location, getLocation, click, clickButton, onClose}) => {

    const handleAddress = useCallback(data => {
        const fullAddress = data.address;
        
        getLocation(fullAddress);
        onClose();
    }, [])

    return (
        <Search>
            <div className="inputAddress">
            <Input placeholder="주소" value={location} />
            <Button onClick={clickButton}>주소 검색</Button>
            </div>
            {click ? 
            <Modal 
                title="도로명 주소"
                visible={click}
                footer={null}
                onClose={onClose}
            >
                <div className="content">
                <DaumPostcode 
                onComplete={handleAddress}
                autoClose={true}
                />
                </div>
            </Modal> : 
            <MyLocation myLocation={location}/>
            } 
        </Search>
    );
};

const Search = styled.div`

    & .inputAddress {
        margin-bottom: 1vh;
    }
    & .ant-input {
        width: 15vw;
        margin-right: 0.5vw;

        & :hover, :focus{
          border: 1px solid #d9d9d9;
          box-shadow: none;
        }
    }

    & .ant-btn {
        width: 5vw;
        background: #FF4300;
        border: 1px solid #FF4300;
        color: #FFFFFF;

        &:hover, :focus {
            opacity: 0.9;
            background: #FF4300;
            border: 1px solid #FF4300;
            color: #FFFFFF;
        }
    }

    & .content {
        width: 29vw;
        height: 20vh;
    }
`;

export default SearchJuso;