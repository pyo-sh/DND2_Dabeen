import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

import { Input, Button } from 'antd';

const SignUpUpperDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #d9d9d9;
    
    padding: 40px;
    width: 100%;
    height: 100%;
    max-width: 600px;
    max-height: 900px;
    min-width: 320px;
    
    & Button {
        width: 100%;
        height: 100%;
        max-width: 420px;
        max-height: 50px;
        min-width: 270px;
        min-width: 35px;
    }
`;
const SignUpGetDataDiv = styled.div`
    display: flex;
    flex-direction: column;
   
    padding : 5px;
    max-width: 425px;
    min-width: 270px;
    width : 100%;

    & Input {
        border: none;
        flex : 1;
        border-radius: 0px;
        border-bottom: 1px solid #d9d9d9;

        margin: 5px;
        max-width: 420px;
        min-width: 260px;
    }
    & .Regist {
        display: flex;
        flex-direction: row;
    }
    & .Regist_Input {
        margin: 5px;
        max-width: 200px;
        min-width: 120px;
    }
    
    & div {
        padding: 5px;
    }
    & .Title{

    }
    & .Check{
        color: red;
        align-self: flex-end;
    }
`;

const SignUp = () => {
    const [nickname, setNickname] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [name, setName] = useState('');
    const [firstRegistrationNumber, setFirstRegistrationNumber] = useState('');
    const [secondRegistrationNumber, setSecondRegistrationNumber] = useState('');

    const [isNicknameCorrect, setIsNicknameCorrect] = useState(false);
    const [isIdCorrect, setIsIdCorrect] = useState(false);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [isPasswordChecked, setIsPasswordChecked] = useState(false);
    const [isRegistrationCorrect, setIsRegistrationCorrect] = useState(false);

    const onChangeNickname = useCallback((e)=>{
        const targetString = e.target.value
        const deleteSpace = e.target.value.replace(/(\s*)/g,"");
        if(targetString === '')                 setIsNicknameCorrect(false);
        else if(targetString !== deleteSpace)   setIsNicknameCorrect(false);
        else                                    setIsNicknameCorrect(true);
        setNickname(targetString);
    }, []);
    const onChangeId = useCallback((e) => {
        const targetString = e.target.value
        const deleteSpace = e.target.value.replace(/(\s*)/g,"");
        if(targetString === '')                 setIsIdCorrect(false);
        else if(targetString !== deleteSpace)   setIsIdCorrect(false);
        else                                    setIsIdCorrect(true);
        setId(e.target.value);
    }, []);
    const onChangePassword = useCallback((e) => {
        const targetString = e.target.value
        const deleteSpace = e.target.value.replace(/(\s*)/g,"");
        if(targetString === '')                 setIsPasswordCorrect(false);
        else if(targetString !== deleteSpace)   setIsPasswordCorrect(false);
        else                                    setIsPasswordCorrect(true);
        setPassword(e.target.value);
    }, []);
    const onChangePasswordCheck = useCallback((e) => { setPasswordCheck(e.target.value); }, []);
    const onChangeName = useCallback((e) => {
        
        setName(e.target.value);
    }, []);
    const onChangeFirstRegistrationNumber = useCallback((e) => { setFirstRegistrationNumber(e.target.value) }, []);
    const onChangeSecondRegistrationNumber = useCallback((e) => { setSecondRegistrationNumber(e.target.value) }, []);

    // 비밀번호와 비밀번호 확인 state가 바뀔 때 마다 확인
    useEffect(() => {
        // 비밀번호가 같을 경우
        (password === passwordCheck)    ?   setIsPasswordChecked(true)  :   setIsPasswordChecked(false);
    }, [password, passwordCheck]);

    return (
        <SignUpUpperDiv>
            <SignUpGetDataDiv>
                <div className="Title">닉네임 *</div>
                <Input
                    placeholder="닉네임 입력"
                    onChange={onChangeNickname}
                />
                {isNicknameCorrect || (nickname === '')
                ?   <div className="Check"></div>
                :   <div className="Check">닉네임을 알맞게 입력해주세요</div>
                }
            </SignUpGetDataDiv>
            <SignUpGetDataDiv>
                <div>아이디 *</div>
                <Input
                    placeholder="아이디 입력"
                    onChange={onChangeId}
                />
                {isIdCorrect || (id === '')
                ?   <div className="Check"></div>
                :   <div className="Check">아이디를 알맞게 입력해주세요</div>
                }
            </SignUpGetDataDiv>
            <SignUpGetDataDiv>
                <div>비밀번호 *</div>
                <Input.Password
                    placeholder="비밀번호(8~20자리)"
                    onChange={onChangePassword}
                />
                {isPasswordCorrect || (password === '')
                ?   <div className="Check"></div>
                :   <div className="Check">비밀번호를 알맞게 입력해주세요</div>
                }
            </SignUpGetDataDiv>
            <SignUpGetDataDiv>
                <div>비밀번호 확인 *</div>
                <Input.Password
                    placeholder="비밀번호 재입력"
                    onChange={onChangePasswordCheck}
                />
                {isPasswordChecked
                ?   <div className="Check"></div>
                :   <div className="Check">비밀번호를 확인해주세요</div>
                }
            </SignUpGetDataDiv>
            <SignUpGetDataDiv>
                <div>이름 *</div>
                <Input
                    placeholder="이름 입력"
                    onChange={onChangeName}
                />
            </SignUpGetDataDiv>
            <SignUpGetDataDiv>
                <div>주민등록번호 *</div>
                <div className="Regist">
                    <Input
                        className="Regist_Input"
                        placeholder=""
                        onChange={onChangeFirstRegistrationNumber}
                    />
                    <div>-</div>
                    <Input
                        className="Regist_Input"
                        placeholder=""
                        onChange={onChangeSecondRegistrationNumber}
                    />
                </div>
                {isRegistrationCorrect
                    ?   <div className="Check"></div>
                    :   <div className="Check">이름과 주민등록번호를 확인해주세요</div>
                }
            </SignUpGetDataDiv>
            <Button>가입하기</Button>
        </SignUpUpperDiv>
    );
};

export default SignUp;