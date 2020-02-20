import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import {Input, Button, Modal} from 'antd';
import MyLocation from './MyLocation';
import DaumPostcode from 'react-daum-postcode';

//location : 검색한 주소를 담을 변수
//getLocation: 검색한 주소와 시군구명을 저장하는 함수
const SearchJuso = ({location, getLocation}) => {
    const [click, setClick] = useState(false);

    //주소 검색 누르면 주소 검색 창 나오게한다.
    const clickButton = useCallback(() => {
        setClick(true);
    }, []);

    const onCancel = useCallback(() => {
        setClick(false);
    }, []);

    const handleAddress = useCallback(data => {
        const fullAddress = data.address;
        const sigunguName = data.sigungu;
        getLocation(fullAddress, sigunguName);
        setClick(false);
    }, [])
    console.log(location);
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
                onCancel={onCancel}
            >
                <div className="content">
                <DaumPostcode 
                onComplete={handleAddress}
                autoClose={true}
                />
                </div>
            </Modal> : 
            <div className="content">
                <MyLocation myLocation={location}/>
            </div>
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
        font-size: 0.8vw;

        &:hover, :focus {
            opacity: 0.9;
            background: #FF4300;
            border: 1px solid #FF4300;
            color: #FFFFFF;
        }
    }

    & .content {
        width: 30vw;
        height: 20vh;
    }
`;

export default SearchJuso;