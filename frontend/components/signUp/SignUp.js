import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

import { Input, Button } from 'antd';

const SignUpUpperDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #d9d9d9;
    
    margin: auto;
    margin-top: 90px;
    padding: 40px;
    width: 100%;
    height: 900px;
    max-width: 600px;

    min-width: 320px;

    & Button {
        width: 100%;
        height: 100vh;
        max-width: 420px;
        max-height: 50px;
        min-width: 270px;
        min-height: 35px;
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
        height: 30px;

        color: red;
        align-self: flex-end;
    }
`;

// 회원가입 창
const SignUp = () => {
    // 로그인하는데 유저의 필요한 정보의 state
    const [nickname, setNickname] = useState('');   // 닉네임 state
    const [id, setId] = useState('');   // 아이디 state
    const [password, setPassword] = useState('');   // 비밀번호 state
    const [passwordCheck, setPasswordCheck] = useState(''); // 비밀번호 확인 state
    const [name, setName] = useState('');   // 이름 state
    const [firstRegistrationNumber, setFirstRegistrationNumber] = useState(''); // 주민등록번호 앞자리 state
    const [secondRegistrationNumber, setSecondRegistrationNumber] = useState('');   // 주민등록번호 뒷자리 state
    // 입력한 정보가 맞는 정보인지 확인하는 state
    const [isNicknameCorrect, setIsNicknameCorrect] = useState(false);  // 닉네임 확인
    const [isIdCorrect, setIsIdCorrect] = useState(false);  // 아이디 확인
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);  // 비밀번호 확인
    const [isPasswordChecked, setIsPasswordChecked] = useState(false);  // 비밀번호 확인을 확인
    const [isRegistrationCorrect, setIsRegistrationCorrect] = useState(false);  // 이름과 주민등록번호 매칭 확인

    // 닉네임 입력창이 바뀔 때 마다 실행하는 함수
    const onChangeNickname = useCallback((e)=>{
        const targetString = e.target.value;    // Input창의 value 값
        const deleteSpace = e.target.value.replace(/(\s*)/g,"");    // value의 공백을 제거한 값
        if(!targetString)                 setIsNicknameCorrect(false);  // value가 빈 값일 때
        else if(targetString !== deleteSpace)   setIsNicknameCorrect(false);    // value에 공백을 포함했을 때
        else                                    setIsNicknameCorrect(true); // 나머지는 가능한 상황
        // state를 바뀔때마다 setState
        setNickname(targetString);
    }, []);
    // 아이디 입력창이 바뀔 때 마다 실행하는 함수
    const onChangeId = useCallback((e) => {
        const targetString = e.target.value;    // Input창의 value 값
        const deleteSpace = e.target.value.replace(/(\s*)/g,"");    // value의 공백을 제거한 값
        if(!targetString)                 setIsIdCorrect(false);    // value가 빈 값일 때
        else if(targetString !== deleteSpace)   setIsIdCorrect(false);  // value에 공백을 포함했을 때
        else                                    setIsIdCorrect(true);   // 나머지는 가능한 상황
        // state를 바뀔때마다 setState
        setId(e.target.value);
    }, []);
    // 비밀번호 입력창이 바뀔 때 마다 실행하는 함수
    const onChangePassword = useCallback((e) => {
        const targetString = e.target.value;    // Input창의 value 값
        const deleteSpace = e.target.value.replace(/(\s*)/g,"");    // value의 공백을 제거한 값
        if(!targetString)                 setIsPasswordCorrect(false);  // value가 빈 값일 때
        else if(targetString !== deleteSpace)   setIsPasswordCorrect(false);    // value에 공백을 포함했을 때
        else                                    setIsPasswordCorrect(true); // 나머지는 가능한 상황
        // state를 바뀔때마다 setState
        setPassword(e.target.value);
    }, []);
    // 비밀번호 확인 입력창이 바뀔 때 마다 실행하는 함수.
    const onChangePasswordCheck = useCallback((e) => { setPasswordCheck(e.target.value); }, []);
    // 이름 입력창이 바뀔 때 마다 실행하는 함수
    const onChangeName = useCallback((e) => {
        
        setName(e.target.value);
    }, []);
    // 주민등록번호 앞자리 입력창이 바뀔 때 마다 실행하는 함수
    const onChangeFirstRegistrationNumber = useCallback((e) => {
        const targetString = e.target.value;    // Input창의 value 값
        const intCheck = targetString.replace(/[0-9]/g, "");    // value값에서 숫자들을 제외한 string.
        if(!targetString) setFirstRegistrationNumber(e.target.value);   // value가 빈 값일 때
        else if(!intCheck) {  // 숫자들을 제외한 string 값이 비어있으면 string에 숫자만 있는 것이다.
            setFirstRegistrationNumber(e.target.value); // 그러면 state값을 바꾸게 해준다.
        }
        else    console.log("숫자만 입력해");   // 숫자가 아니면 state값을 바꿀 수 없게 만든다.
    }, []);
    // 주민등록번호 뒷자리 입력창이 바뀔 때 마다 실행하는 함수
    const onChangeSecondRegistrationNumber = useCallback((e) => {
        console.log(e.target.value);
        setSecondRegistrationNumber(e.target.value)
    }, []);

    // 비밀번호와 비밀번호 확인 state가 바뀔 때 마다 확인
    useEffect(() => {
        // 비밀번호가 같을 경우 true / 다를 경우 false
        (password === passwordCheck)    ?   setIsPasswordChecked(true)  :   setIsPasswordChecked(false);
    }, [password, passwordCheck]);

    // 이름과 주민번호 확인 state가 바뀔 때 마다 확인
    useEffect(()=> {
        // 일단 조건 없이 true로 해놓았음.
        setIsRegistrationCorrect(true);
    }, [name, firstRegistrationNumber, secondRegistrationNumber]);

    // 가입하기 버튼 눌렀을 때 값을 전달하기 위한 함수
    const onClickSignUp = useCallback((e) => {
        if(isNicknameCorrect && isIdCorrect && isPasswordCorrect && isPasswordChecked && isRegistrationCorrect){
            const userLog = {
                nickname: nickname,
                id: id,
                password: password,
                name: name,
                firstRegistrationNumber: firstRegistrationNumber,
                secondRegistrationNumber: secondRegistrationNumber
            }
            console.dir(userLog);
            return userLog;
        }
        else{
            console.log("로그인 실패");
        }
    }, [
        nickname,
        id,
        password,
        name,
        firstRegistrationNumber,
        secondRegistrationNumber,
        isNicknameCorrect,
        isIdCorrect,
        isPasswordCorrect,
        isPasswordChecked,
        isRegistrationCorrect
    ]);

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
                        value={firstRegistrationNumber}
                        maxLength={6}
                    />
                    <div>-</div>
                    <Input
                        type="number"
                        className="Regist_Input"
                        placeholder=""
                        onChange={onChangeSecondRegistrationNumber}
                        maxLength={7}
                    />
                </div>
                {isRegistrationCorrect
                    ?   <div className="Check"></div>
                    :   <div className="Check">이름과 주민등록번호를 확인해주세요</div>
                }
            </SignUpGetDataDiv>
            <Button
                onClick={onClickSignUp}
            >가입하기</Button>
        </SignUpUpperDiv>
    );
};

export default SignUp;