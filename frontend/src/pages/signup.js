import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button, Select } from "antd";
import { signUpRequestAction } from "../reducers/user";
import Router from "next/router";
import DabeenInput, {
  check_num,
  check_eng,
  check_spc,
  check_kor,
  check_spa
} from "../components/signUp/InputFunctions";
import { inputCheckChangeHook } from "../hooks/inputChangeHook";

// 회원가입 창
const SignUpMain = () => {
  const dispatch = useDispatch(); // 디스패치
  const { isSigningup, signUpSuccess } = useSelector(state => state.user);
  useEffect(() => {
    if (signUpSuccess) {
      Router.push("/");
    }
  }, [signUpSuccess]);
  const nowDate = new Date();
  // 로그인하는데 유저의 필요한 정보의 state
  const [id, changeId] = inputCheckChangeHook("", [check_eng, check_num]); // 아이디 state
  const [password, changePassword] = inputCheckChangeHook("", [
    check_eng,
    check_num,
    check_spc
  ]); // 비밀번호 state
  const [passwordCheck, changePasswordCheck] = inputCheckChangeHook("", [
    check_eng,
    check_num,
    check_spc
  ]); // 비밀번호 확인 state
  const [nickname, changeNickname] = inputCheckChangeHook("", [
    check_eng,
    check_num,
    check_kor
  ]); // 닉네임 state
  const [name, changeName] = inputCheckChangeHook("", [
    check_eng,
    check_kor,
    check_spa
  ]); // 이름 state
  const [birthYear, setBirthYear] = useState(nowDate.getFullYear()); // 생년월일 중 년
  const [birthMonth, setBirthMonth] = useState(nowDate.getMonth() + 1); // 생년월일 중 월
  const [birthDay, setBirthDay] = useState(nowDate.getDate());
  const [email, changeEmail] = inputCheckChangeHook("", [
    check_eng,
    check_num,
    /[@.]/g
  ]); // 이메일 state
  const [telephone, changeTelephone] = inputCheckChangeHook("", [check_num]);
  const [mainAddress, changeMainAddress] = inputCheckChangeHook("", [
    check_eng,
    check_num,
    check_kor,
    check_spa,
    /[,.:;'"]/g
  ]);
  const [subAddress, changeSubAddress] = inputCheckChangeHook("", [
    check_eng,
    check_num,
    check_kor,
    check_spa,
    /[,.:;'"]/g
  ]);

  // 입력한 정보가 맞는 정보인지 확인하는 state
  const [isIdCorrect, setIsIdCorrect] = useState(false); // 아이디 확인
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false); // 비밀번호 확인
  const [isPasswordChecked, setIsPasswordChecked] = useState(false); // 비밀번호 확인을 확인
  const [isNicknameCorrect, setIsNicknameCorrect] = useState(false); // 닉네임 확인
  const [isRegistrationCorrect, setIsRegistrationCorrect] = useState(false); // 이름과 주민등록번호 매칭 확인
  const [isEmailCorrect, setIsEmailCorrect] = useState(false); // 아이디 확인

  // 생년월일 선택지를 render 하기 위함
  const yearOptions = Array(80)
    .fill(0)
    .map((v, index) => (
      <Select.Option
        className="Month-Item"
        key={`${nowDate.getFullYear() - index}`}
      >
        {nowDate.getFullYear() - index}
      </Select.Option>
    ));
  const monthOptions = Array(12)
    .fill(0)
    .map((v, index) => (
      <Select.Option className="Month-Item" key={`${index}`}>
        {index + 1}
      </Select.Option>
    ));
  const dayOptions = Array(31)
    .fill(0)
    .map((v, index) => {
      return (
        <Select.Option className="Month-Item" key={`${index + 1}`}>
          {index + 1}
        </Select.Option>
      );
    });
  // 생년월일 선택 시 바뀔 때 설정하는 거
  const onChangeSelect = setState =>
    useCallback(e => {
      setState(e);
    }, []);

  // 비밀번호와 비밀번호 확인 state가 바뀔 때 마다 확인
  useEffect(() => {
    // 비밀번호가 같을 경우 true / 다를 경우 false
    password === passwordCheck
      ? setIsPasswordChecked(true)
      : setIsPasswordChecked(false);
  }, [password, passwordCheck]);

  // 가입하기 버튼 눌렀을 때 값을 전달하기 위한 함수
  const onClickSignUp = useCallback(
    e => {
      // if(isNicknameCorrect && isIdCorrect && isPasswordCorrect && isPasswordChecked && isRegistrationCorrect)
      if (true) {
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
          subAddress
        };
        dispatch(signUpRequestAction(userLog)); // 회원가입 요청
      } else {
        alert("회원가입 실패!");
      }
    },
    [
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
    ]
  );

  return (
    <SignUpUpperDiv>
      <div className="SignupTitle">회원가입</div>
      <div className="SignupContent">
        <SignUpGetDataDiv>
          <div className="SignupContentTitle">아이디 *</div>
          <DabeenInput
            type="text"
            placeholder="아이디 입력"
            value={id}
            onChangeFunc={changeId}
          />
          {isIdCorrect || id === "" ? (
            <div className="SignupContentCheck"></div>
          ) : (
            <div className="SignupContentCheck">
              아이디를 알맞게 입력해주세요
            </div>
          )}
        </SignUpGetDataDiv>
        <SignUpGetDataDiv>
          <div className="SignupContentTitle">비밀번호 *</div>
          <DabeenInput
            type="password"
            placeholder="비밀번호(8~20자리)"
            value={password}
            onChangeFunc={changePassword}
            maxlength={20}
          />
          {isPasswordCorrect || password === "" ? (
            <div className="SignupContentCheck"></div>
          ) : (
            <div className="SignupContentCheck">
              비밀번호를 알맞게 입력해주세요
            </div>
          )}
        </SignUpGetDataDiv>
        <SignUpGetDataDiv>
          <div className="SignupContentTitle">비밀번호 확인 *</div>
          <DabeenInput
            type="password"
            placeholder="비밀번호 재입력"
            value={passwordCheck}
            onChangeFunc={changePasswordCheck}
            maxLength={20}
          />
          {isPasswordChecked ? (
            <div className="SignupContentCheck"></div>
          ) : (
            <div className="SignupContentCheck">비밀번호를 확인해주세요</div>
          )}
        </SignUpGetDataDiv>
        <SignUpGetDataDiv>
          <div className="SignupContentTitle">닉네임 *</div>
          <DabeenInput
            type="text"
            placeholder="닉네임 입력"
            value={nickname}
            onChangeFunc={changeNickname}
          />
          {isNicknameCorrect || nickname === "" ? (
            <div className="SignupContentCheck"></div>
          ) : (
            <div className="SignupContentCheck">
              닉네임을 알맞게 입력해주세요
            </div>
          )}
        </SignUpGetDataDiv>
        <SignUpGetDataDiv>
          <div className="SignupContentTitle">이름 *</div>
          <DabeenInput
            type="text"
            placeholder="이름 입력"
            value={name}
            onChangeFunc={changeName}
          />
        </SignUpGetDataDiv>
        <SignUpGetDataDiv>
          <div className="SignupContentTitle">생년월일 *</div>
          <div className="SignupContentBirth">
            <Select
              className="SignupContentBirthYear"
              defaultValue={birthYear}
              onChange={onChangeSelect(setBirthYear)}
            >
              {yearOptions}
            </Select>
            <Select
              className="SignupContentBirthMonth"
              defaultValue={birthMonth}
              onChange={onChangeSelect(setBirthMonth)}
            >
              {monthOptions}
            </Select>
            <Select
              className="SignupContentBirthDay"
              defaultValue={birthDay}
              onChange={onChangeSelect(setBirthMonth)}
            >
              {dayOptions}
            </Select>
          </div>
          {isRegistrationCorrect ? (
            <div className="SignupContentCheck"></div>
          ) : (
            <div className="SignupContentCheck">
              이름과 생년월일을 확인해주세요
            </div>
          )}
        </SignUpGetDataDiv>
        <SignUpGetDataDiv>
          <div className="SignupContentTitle">이메일 *</div>
          <DabeenInput
            type="text"
            placeholder="이메일 입력"
            value={email}
            onChangeFunc={changeEmail}
          />
          {isEmailCorrect ? (
            <div className="SignupContentCheck"></div>
          ) : (
            <div className="SignupContentCheck">이메일을 확인해주세요</div>
          )}
        </SignUpGetDataDiv>
        <SignUpGetDataDiv>
          <div className="SignupContentTitle">전화번호 *</div>
          <DabeenInput
            type="text"
            placeholder="'-'를 제외한 숫자"
            value={telephone}
            onChangeFunc={changeTelephone}
          />
        </SignUpGetDataDiv>
        <SignUpGetDataDiv>
          <div className="SignupContentTitle">주소 *</div>
          <DabeenInput
            type="text"
            placeholder="시"
            value={mainAddress}
            onChangeFunc={changeMainAddress}
          />
          <DabeenInput
            type="text"
            placeholder="면/읍/리?"
            value={subAddress}
            onChangeFunc={changeSubAddress}
          />
          {isEmailCorrect ? (
            <div className="SignupContentCheckAll"></div>
          ) : (
            <div className="SignupContentCheckAll">전부 필수 작성란입니다.</div>
          )}
        </SignUpGetDataDiv>
        <Button
          className="SignupContentButton"
          onClick={onClickSignUp}
          loading={isSigningup}
        >
          가입하기
        </Button>
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

  & .SignupTitle {
    font-size: 50px;
    font-weight: bold;
    width: 100%;
    max-width: 600px;
    min-width: 320px;
  }
  & .SignupContent {
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

    & .SignupContentButton {
      width: 100%;
      height: 100vh;
      max-width: 420px;
      max-height: 50px;
      min-width: 270px;
      min-height: 35px;
      background: #ff4300;
      color: white;
    }
  }
`;
const SignUpGetDataDiv = styled.div`
  display: flex;
  flex-direction: column;

  padding: 5px;
  max-width: 425px;
  min-width: 270px;
  width: 100%;

  & .SignupContentBirth {
    & .SignupContentBirthYear {
      width: 140px;
      margin-left: 10px;
    }
    & .SignupContentBirthMonth {
      width: 100px;
      margin-left: 10px;
    }
    & .SignupContentBirthDay {
      width: 100px;
      margin-left: 10px;
    }
  }

  & .SignupContentTitle {
    font-weight: bold;
  }
  & .SignupContentCheck {
    height: 30px;

    color: red;
    align-self: flex-end;
  }
  & .SignupContentCheckAll {
    margin-top: 20px;
    height: 30px;
    color: red;
    align-self: flex-end;
  }
`;

export default SignUpMain;
