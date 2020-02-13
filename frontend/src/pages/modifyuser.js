import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
// import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from 'antd';
import Router from 'next/router';

const modifyuser = () => {
    // 현재 날짜가 필요할 거 같아서..
    const nowDate = new Date();
    // 로그인하는데 유저의 필요한 정보의 state
    const [nickname, setNickname] = useState('');   // 닉네임 state
    const [introduce, setIntroduce] = useState(""); // 소개 state
    const [password, setPassword] = useState('');   // 비밀번호 state
    const [passwordCheck, setPasswordCheck] = useState(''); // 비밀번호 확인 state
    const [email, setEmail] = useState(''); // 이메일 state
    const [telephone, setTelephone] = useState('');
    const [mainAddress, setMainAddress] = useState('');
    const [subAddress, setSubAddress] = useState('');

    // 입력한 정보가 맞는 정보인지 확인하는 state
    const [isNicknameCorrect, setIsNicknameCorrect] = useState(false);  // 닉네임 확인
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);  // 비밀번호 확인
    const [isPasswordChecked, setIsPasswordChecked] = useState(false);  // 비밀번호 확인을 확인
    const [isEmailCorrect, setIsEmailCorrect] = useState(false);  // 이메일 확인
    
    // 문자열내용을 전달하기 위함
    const check_num = /[0-9]/g; // 숫자
    const check_eng = /[a-z|A-Z]/g; // 문자
    const check_spc = /[~!@#$%^&*()_+|<>?:{}]/g; // 특수문자
    const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g; // 한글
    const check_spa = /(\s)/g;             // 공백

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
    const onClickModify = useCallback((e) => {
        if(isNicknameCorrect && isPasswordCorrect && isPasswordChecked && isEmailCorrect){
            const userLog = {
                nickname,
                password,
                email,
                telephone,
                mainAddress,
                subAddress,
            }
            
        }
        else{
            alert('회원가입 실패!');
        }
    }, [
        nickname,
        password,
        email,
        telephone,
        mainAddress,
        subAddress,

        isNicknameCorrect,
        isPasswordCorrect,
        isPasswordChecked,
    ]);

    return (
        <ModifyUserUpperDiv>
            <div className="Title">회원정보 수정</div>
            <div className="Content">
                <div className="Modify-Profile">프로필 사진</div>
                <ModifyUserGetDataDiv>
                    <div className="Modify-Title">닉네임 *</div>
                    <Input
                        placeholder="닉네임 입력"
                        onChange={onChangeInput(setNickname, [check_eng, check_num, check_kor])}
                        value={nickname}
                    />
                    {isNicknameCorrect || (nickname === '')
                    ?   <div className="Check"></div>
                    :   <div className="Check">닉네임을 알맞게 입력해주세요</div>
                    }
                </ModifyUserGetDataDiv>
                <ModifyUserGetDataDiv>
                    <div className="Modify-Title">소개</div>
                    <Input
                        onChange={onChangeInput(setIntroduce, [check_eng, check_num])}
                        value={introduce}
                    />
                </ModifyUserGetDataDiv>
                <hr className="Hr"></hr>
                <ModifyUserGetDataDiv>
                    <div className="Modify-Title">비밀번호 *</div>
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
                </ModifyUserGetDataDiv>
                <ModifyUserGetDataDiv>
                    <div className="Modify-Title">비밀번호 확인 *</div>
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
                </ModifyUserGetDataDiv>
                <hr className="Hr"></hr>
                <ModifyUserGetDataDiv>
                    <div className="Modify-Title">이메일 *</div>
                    <Input
                        placeholder="이메일 입력"
                        onChange={onChangeInput(setEmail, [check_eng, check_num, /[@]/g])}
                        value={email}
                    />
                    {isEmailCorrect
                        ?   <div className="Check"></div>
                        :   <div className="Check">이메일을 확인해주세요</div>
                    }
                </ModifyUserGetDataDiv>
                <ModifyUserGetDataDiv>
                    <div className="Modify-Title">전화번호 *</div>
                    <Input
                        placeholder="'-'를 제외한 숫자"
                        onChange={onChangeInput(setTelephone, [check_num])}
                        value={telephone}
                    />
                </ModifyUserGetDataDiv>
                <ModifyUserGetDataDiv>
                    <div className="Modify-Title">주소 *</div>
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
                </ModifyUserGetDataDiv>
                <div className="Tips">
                    - 아이디, 이름, 생년월일은 수정이 불가능 합니다.
                    <br/>- 닉네임은 변경 후 1개월간 재변경이 불가능합니다.
                    <br/>- 휴대전화 번호 변경 시 반드시 인증을 거쳐야 합니다.
                </div>
                <div className="Btn">
                    <Button
                        className="Btn-Back"
                        onClick={useCallback(() => Router.push('/mypage'),[])}
                        // loading = {}
                        >취소</Button>
                    <Button
                        className="Btn-Modify"
                        onClick={onClickModify}
                        // loading ={null}
                        >수정</Button>
                </div>
            </div>
        </ModifyUserUpperDiv>
    );
};

const ModifyUserUpperDiv = styled.div`
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
        & .Modify-Profile{
            border: 1px solid black;
            border-radius: 50%;
            width: 150px;
            height: 150px;
            text-align: center;
            line-height: 150px;
        }
        & .Hr{
            width: 100%;
            color: #d9d9d9;
            border: none;
            border-top: 1px solid #d9d9d9;
            margin: 35px 0;
        }
        & .Tips{
            width: 100%;
            margin: 10px 0;
            max-width: 425px;
            min-width: 270px;
            font-size: 16px;
        }
    }
    & .Btn{
        display: flex;
        & .Btn-Back{
            width: 100%;
            height: 100vh;
            max-width: 100px;
            max-height: 40px;
            min-width: 60px;
            min-height: 30px;
        }
        & .Btn-Modify {
            width: 100%;
            height: 100vh;
            max-width: 100px;
            max-height: 40px;
            min-width: 60px;
            min-height: 30px;
            background: #FF9644;
        }
    }
`;
const ModifyUserGetDataDiv = styled.div`
    display: flex;
    flex-direction: column;
   
    padding : 5px;
    max-width: 425px;
    min-width: 270px;
    width : 100%;

    & input {
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
    
    & .Modify-Title{
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

export default modifyuser;