import React from 'react';
import styled from 'styled-components';

import { Avatar, Button, Cascader, Icon } from 'antd';

const RegistSupplierUpperDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin: auto;

    & div {
        display: flex;
    }

    & .Title{
        flex-direction: column;
        margin: 10px auto;
        padding: 0 10px;
        width: 90%;
        max-width: 1520px;
        min-width: 300px;
        height: 70px;
    }
    & .Title-Main{
        border-bottom: 1px solid #d9d9d9;

        font-size: 25px;
    }
    & .Title-Sub{
        margin-left: auto;
        padding-top: 5px;

        font-size: 20px;
    }

    & .Table{
        margin: 10px auto;
        padding: 20px 0;
        width: 90%;
        max-width: 1500px;
        min-width: 300px;
        /* height: 30vh; */
        max-height: 450px;
        min-height: 80px;

        border-top: 1px solid #d9d9d9;
    }
    & .Table-Title{
        width: 30%;
        max-width: 250px;
        min-width: 50px;
        margin-left: auto;
        font-size: 20px;
    }
    & .Table-Content{
        flex-direction: column;
        width: 100%;
        max-width: 1200px;
        min-width: 260px;
        height: 100%;

        & .Table-Content-Profile{
            margin: 20px;
            margin-bottom: 0px;
        }

        & .Table-Content-User{
            flex-direction: column;

            margin-top: 10px;
            width: 40vw;
            max-width: 400px;
            min-width: 270px;
            height: 10vh;
            max-height: 100px;
            min-height: 80px;

            & div{
                align-items: flex-end;
                padding-bottom: 10px;
            }
            & h2{margin: 0px;}
        }

        & .Table-Content-Cascader{
            max-width: 280px;
            min-width: 260px;
        }
    }
    & .Table-Content-Description{
        flex-direction: column;
        justify-content: center;

        padding: 10px;
        height: 30%;
        max-height: 200px;
        min-height: 150px;

        border: 1px solid #d9d9d9;
        border-radius: 10px;
        font-size: 17px;

        & .Table-Content-Description-Icon{
            padding: 5px;
            & svg{
                margin-right: 10px;
            }
        }
    }

    & .Buttons{
        justify-content: space-between;

        margin-bottom: 40px;
        width: 30vw;
        max-width: 500px;
        min-width: 250px;
        & .Button{
            width: 40%;
            max-width: 200px;
            min-width: 100px;
            height: 40px;
        }
    }
`;

// Cascader 창 옵션 설정
const options = [
    {
      value: 'work',
      label: '잡일',
    },
    {
      value: 'borrow',
      label: '빌려주기',
    },
  ];
// 공급자 등록 창
const RegistSupplier = () => {
    return (
        <RegistSupplierUpperDiv>
            <div className="Title">
                <div className="Title-Main">공급자 등록</div>
                <div className="Title-Sub">* 필수</div>    
            </div>
            <div className="Table">
                <div className="Table-Title">프로필 사진*</div>
                <div className="Table-Content">
                    <div className="Table-Content-Description">
                        주의
                        <br/>
                        * 얼굴이 나오지 않은 증명사진 / 캐릭터 / 단순배경 / 동물은 승인되지 않습니다.
                        <div className="Table-Content-Description-Icon">
                            <Icon type="stop" style={{fontSize: '50px'}}/>
                            <Icon type="stop" style={{fontSize: '50px'}}/>
                            <Icon type="stop" style={{fontSize: '50px'}}/>
                            <Icon type="stop" style={{fontSize: '50px'}}/>
                        </div>
                    </div>
                    <Avatar className="Table-Content-Profile" size={150} icon="user"/>
                </div>
            </div>
            <div className="Table">
                <div className="Table-Title">인증*</div>
                <div className="Table-Content">
                    <div className="Table-Content-Description">
                        인증 가이드
                        <br/><br/>
                        어쩌고 저쩌고 뭐시기 저시기
                    </div>
                    <div className="Table-Content-User">
                        <div>
                            <h2>신분증</h2>
                            주민등록증 / 운전면허증 / 여권
                        </div>
                        <Button>업로드</Button>
                    </div>
                </div>
            </div>
            <div className="Table">
                <div className="Table-Title">카테고리*</div>
                <div className="Table-Content">
                    <Cascader
                        className="Table-Content-Cascader"
                        options={options}
                        placeholder="선호하는 카테고리 선택"
                    />
                </div>
            </div>
            <div className="Buttons">
                <Button className="Button">임시저장</Button>
                <Button className="Button">저장</Button>
            </div>
        </RegistSupplierUpperDiv>
    );
};

export default RegistSupplier;