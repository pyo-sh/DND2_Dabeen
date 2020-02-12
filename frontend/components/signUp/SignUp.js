import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Input, Button, Select } from 'antd';
import { signUpRequestAction } from '../../reducers/user';
import Router from 'next/router';
// 회원가입 창
const SignUp = () => {
  
    const dispatch = useDispatch(); // 디스패치

    // 현재 날짜가 필요할 거 같아서..
    const nowDate = new Date();
    // 로그인하는데 유저의 필요한 정보의 state
    const [id, setId] = useState('');   // 아이디 state
    const [password, setPassword] = useState('');   // 비밀번호 state
    const [passwordCheck, setPasswordCheck] = useState(''); // 비밀번호 확인 state
    const [nickname, setNickname] = useState('');   // 닉네임 state
    const [name, setName] = useState('');   // 이름 state
    const [birthYear, setBirthYear] = useState(nowDate.getFullYear()); // 생년월일 중 년
    const [birthMonth, setBirthMonth] = useState(nowDate.getMonth()+1);   // 생년월일 중 월
    const [birthDay, setBirthDay] = useState(nowDate.getDate());
    const [email, setEmail] = useState(''); // 이메일 state
    const [telephone, setTelephone] = useState('');
    const [mainAddress, setMainAddress] = useState('');
    const [subAddress, setSubAddress] = useState('');

    // 입력한 정보가 맞는 정보인지 확인하는 state
    const [isIdCorrect, setIsIdCorrect] = useState(false);  // 아이디 확인
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);  // 비밀번호 확인
    const [isPasswordChecked, setIsPasswordChecked] = useState(false);  // 비밀번호 확인을 확인
    const [isNicknameCorrect, setIsNicknameCorrect] = useState(false);  // 닉네임 확인
    const [isRegistrationCorrect, setIsRegistrationCorrect] = useState(false);  // 이름과 주민등록번호 매칭 확인
    const [isEmailCorrect, setIsEmailCorrect] = useState(false);  // 아이디 확인
    
    // 문자열내용을 전달하기 위함
    const check_num = /[0-9]/g; // 숫자
    const check_eng = /[a-z|A-Z]/g; // 문자
    const check_spc = /[~!@#$%^&*()_+|<>?:{}]/g; // 특수문자
    const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g; // 한글
    const check_spa = /(\s)/g;             // 공백

    // 생년월일 선택지를 render 하기 위함
    const yearOptions = Array(80)
        .fill(0)
        .map((v, index) => (
            <Select.Option className="Month-Item" key={`${nowDate.getFullYear() - index}`}>
                {nowDate.getFullYear() - index}
            </Select.Option>
        )
    );
    const monthOptions = Array(12)
        .fill(0)
        .map((v, index) => (
            <Select.Option className="Month-Item" key={`${index}`}>
                {index+1}
            </Select.Option>
        )
    );
    const dayOptions = Array(31)
        .fill(0)
        .map((v, index) => {
        return (
            <Select.Option className="Month-Item" key={`${index+1}`}>
                {index+1}
            </Select.Option>
        );
    });

    // 아이디 = 허용 : [영어 / 숫자], 불가 : [공백, 한글, 특수문자]
    // 비밀번호 = 허용 : [영어 / 숫자 / 특수문자], 불가 : [공백, 한글]
    // 닉네임 = 허용 : [영어 / 한글 / 숫자], 불가 : [특수문자, 공백]
    // 이름 = 허용 : [영어 / 한글 / 공백], 불가 : [특수문자, 숫자]
    // 이메일 = 허용 : [영어 / 숫자 / @], 불가 : [특수문자, 한글, 공백]
    // 전화번호 = 허용 : [숫자], 불가 : [나머지]
    // 주소 = 허용 : [한글 / 숫자 / 영어 / 공백 / ,.:], 불가 : [특수문자]
    // setState는 지정, checkObject는 허용하는 문자들을 배열로 넣어준다.
    const onChangeInput = (setState, checkObject) => useCallback((e) => {
        const targetString = e.target.value;    // Input창의 value 값
        let deleteString = targetString;
        // checkObject들을 모두 지운다.
        checkObject.forEach(element => {
            deleteString = deleteString.replace(element, "");
        });
        // 지운 값이 비어있다면?? setState
        if(!deleteString)
            setState(e.target.value);
    }, []);
    // 생년월일 선택 시 바뀔 때 설정하는 거
    const onChangeSelect = (setState) => useCallback((e) => {
        setState(e);
    }, []);

    // 비밀번호와 비밀번호 확인 state가 바뀔 때 마다 확인
    useEffect(() => {
        // 비밀번호가 같을 경우 true / 다를 경우 false
        (password === passwordCheck)    ?   setIsPasswordChecked(true)  :   setIsPasswordChecked(false);
    }, [password, passwordCheck]);
    
    // 가입하기 버튼 눌렀을 때 값을 전달하기 위한 함수
    const onClickSignUp = useCallback((e) => {
        if(isNicknameCorrect && isIdCorrect && isPasswordCorrect && isPasswordChecked && isRegistrationCorrect){
            const userLog = {
                id,
                password,
                nickname,
                name,
                birthYear,
                birthMonth,
                birthDay,
                email,
                telephone,
                mainAddress,
                subAddress,
            }
            dispatch(signUpRequestAction(userLog)); // 회원가입 요청
            Router.push('/');
        }
        else{
            alert('회원가입 실패!');
        }
    }, [
        nickname,
        id,
        password,
        name,
        birthYear,
        birthMonth,
        birthDay,
        email,
        telephone,
        mainAddress,
        subAddress,

        isNicknameCorrect,
        isIdCorrect,
        isPasswordCorrect,
        isPasswordChecked,
        isRegistrationCorrect
    ]);

    return (
        <SignUpUpperDiv>
            <div className="Title">회원가입</div>
            <div className="Content">
                <SignUpGetDataDiv>
                    <div className="Sign-Title">아이디 *</div>
                    <Input
                        placeholder="아이디 입력"
                        onChange={onChangeInput(setId, [check_eng, check_num])}
                        value={id}
                    />
                    {isIdCorrect || (id === '')
                    ?   <div className="Check"></div>
                    :   <div className="Check">아이디를 알맞게 입력해주세요</div>
                    }
                </SignUpGetDataDiv>
                <SignUpGetDataDiv>
                    <div className="Sign-Title">비밀번호 *</div>
                    <Input.Password
                        placeholder="비밀번호(8~20자리)"
                        onChange={onChangeInput(setPassword, [check_eng, check_num, check_spc])}
                        value={password}
                        maxLength={20}
                    />
                    {isPasswordCorrect || (password === '')
                    ?   <div className="Check"></div>
                    :   <div className="Check">비밀번호를 알맞게 입력해주세요</div>
                    }
                </SignUpGetDataDiv>
                <SignUpGetDataDiv>
                    <div className="Sign-Title">비밀번호 확인 *</div>
                    <Input.Password
                        placeholder="비밀번호 재입력"
                        onChange={onChangeInput(setPasswordCheck, [check_eng, check_num, check_spc])}
                        value={passwordCheck}
                        maxLength={20}
                    />
                    {isPasswordChecked
                    ?   <div className="Check"></div>
                    :   <div className="Check">비밀번호를 확인해주세요</div>
                    }
                </SignUpGetDataDiv>
                <SignUpGetDataDiv>
                    <div className="Sign-Title">닉네임 *</div>
                    <Input
                        placeholder="닉네임 입력"
                        onChange={onChangeInput(setNickname, [check_eng, check_num, check_kor])}
                        value={nickname}
                    />
                    {isNicknameCorrect || (nickname === '')
                    ?   <div className="Check"></div>
                    :   <div className="Check">닉네임을 알맞게 입력해주세요</div>
                    }
                </SignUpGetDataDiv>
                <SignUpGetDataDiv>
                    <div className="Sign-Title">이름 *</div>
                    <Input
                        placeholder="이름 입력"
                        onChange={onChangeInput(setName, [check_eng, check_kor, check_spa])}
                        value={name}
                    />
                </SignUpGetDataDiv>
                <SignUpGetDataDiv>
                    <div className="Sign-Title">생년월일 *</div>
                    <div className="Birth">
                        <Select
                            className="Birth-Year"
                            defaultValue={birthYear}
                            onChange={onChangeSelect(setBirthYear)}
                            >
                            {yearOptions}
                        </Select>
                        <Select 
                            className="Birth-Month"
                            defaultValue={birthMonth}
                            onChange={onChangeSelect(setBirthMonth)}
                            >
                            {monthOptions}
                        </Select>
                        <Select
                            className="Birth-Day"
                            defaultValue={birthDay}
                            onChange={onChangeSelect(setBirthMonth)}
                            >
                            {dayOptions}
                        </Select>
                    </div>
                    {isRegistrationCorrect
                        ?   <div className="Check"></div>
                        :   <div className="Check">이름과 생년월일을 확인해주세요</div>
                    }
                </SignUpGetDataDiv>
                <SignUpGetDataDiv>
                    <div className="Sign-Title">이메일 *</div>
                    <Input
                        placeholder="이메일 입력"
                        onChange={onChangeInput(setEmail, [check_eng, check_num, /[@]/g])}
                        value={email}
                    />
                    {isEmailCorrect
                        ?   <div className="Check"></div>
                        :   <div className="Check">이메일을 확인해주세요</div>
                    }
                </SignUpGetDataDiv>
                <SignUpGetDataDiv>
                    <div className="Sign-Title">전화번호 *</div>
                    <Input
                        placeholder="'-'를 제외한 숫자"
                        onChange={onChangeInput(setTelephone, [check_num])}
                        value={telephone}
                    />
                </SignUpGetDataDiv>
                <SignUpGetDataDiv>
                    <div className="Sign-Title">주소 *</div>
                    <Input
                        placeholder="시"
                        onChange={onChangeInput(setMainAddress, [check_eng, check_num, check_kor, /[,.:;'"]/g])}
                        value={mainAddress}
                    />
                    <Input
                        placeholder="면/읍/리?"
                        onChange={onChangeInput(setSubAddress, [check_eng, check_num, check_kor, check_spa, /[,.:;'"]/g])}
                        value={subAddress}
                    />
                    {isEmailCorrect
                        ?   <div className="Check-All"></div>
                        :   <div className="Check-All">전부 필수 작성란입니다.</div>
                    }
                </SignUpGetDataDiv>
                <Button
                    className="Sign-Button"
                    onClick={onClickSignUp}
                >가입하기</Button>
            </div>
        </SignUpUpperDiv>
    );
};


const SignUpUpperDiv = styled.div`
    margin: 90px auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    & .Title{
        font-size: 50px;
        font-weight: bold;
        width: 100%;
        max-width: 600px;
        min-width: 320px;
    }
    & .Content{
        border: 1px solid #d9d9d9;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 50px;
        width: 100%;
        max-width: 600px;
        min-width: 320px;
        /* height: 1120px; */

        & .Sign-Button {
            width: 100%;
            height: 100vh;
            max-width: 420px;
            max-height: 50px;
            min-width: 270px;
            min-height: 35px;
            background: #FF9644;
        }
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
        flex : 1;
        border: none;
        border-radius: 0px;
        border-bottom: 1px solid #d9d9d9;

        margin: 5px;
        max-width: 420px;
        min-width: 260px;

        & :hover, :focus{
            border: none;
            border-bottom: 2px solid #FF9644;
            box-shadow: none;
        }
    }
    & .Birth {
        & .Birth-Year{
            width: 140px;
            margin-left: 10px;
        }
        & .Birth-Month{
            width: 100px;
            margin-left: 10px;
        }
        & .Birth-Day{
            width: 100px;
            margin-left: 10px;
        }
    }
    
    & .Sign-Title{
        font-weight: bold;
    }
    & .Check{
        height: 30px;

        color: red;
        align-self: flex-end;
    }
    & .Check-All{
        margin-top: 20px;
        height: 30px;
        color: red;
        align-self: flex-end;
    }
`;

export default SignUp;