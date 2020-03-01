import React, { useCallback, useState } from 'react';
import {Input, Button, Modal} from 'antd';
import DaumPostcode from 'react-daum-postcode';
import {Search} from './SearchJuso.style';
//location : 검색한 주소를 담을 변수
//getLocation: 검색한 주소와 시군구명을 저장하는 함수
const SearchJuso = ({location, setLocation}) => {
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
        setLocation(fullAddress);
        setClick(false);
    }, []);

    return (
        <Search>
            {click &&
            <Modal 
                title="도로명 주소"
                visible={click}
                footer={null}
                onCancel={onCancel}
                >
                <div className="SearchJusoContent">
                    <DaumPostcode 
                        onComplete={handleAddress}
                        autoClose={true}
                        />
                </div>
            </Modal>
            }
            {/* <div className="SearchJusoContent">
                <MyLocation myLocation={location}/>
            </div> */}
            <div className="SearchJusoInputAddress">
                <input placeholder="주소를 검색하세요." value={location}  readOnly/>
                <Button type="link" onClick={clickButton}>주소 검색</Button>
            </div>
        </Search>
    );
};

export default SearchJuso;