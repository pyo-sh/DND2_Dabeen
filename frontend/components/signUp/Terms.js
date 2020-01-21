// 약간의 동의를 확인하기 위해 만든 화면
import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Icon } from "antd";
const TermsWrapper = styled.div`
  width: 80%;
  height: 80vh;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  & .checkButton {
    border: none;
    background: none;
  }
  & .termBox {
    display: flex;
    width: 60%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
  }
  & .terms {
    color: ${props => (props.termsCheck ? "green" : "grey")};
  }
  & .use {
    color: ${props => (props.useTermCheck ? "green" : "grey")};
  }
  & .privacy {
    color: ${props => (props.privacyInfoCheck ? "green" : "grey")};
  }
  & .term {
    width: 100%;
    height: 15vh;
    border: 1px solid grey;
  }
  & .termDanger {
    color: red;
  }

  & > button {
    background: #cd6133;
    border: none;
    color: white;
    cursor: pointer;
    width: 25%;
  }
`;

const Terms = () => {
  const [termsCheck, setTermsCheck] = useState(false);
  const [useTermCheck, setUseTermCheck] = useState(false);
  const [privacyInfoCheck, setPrivacyInfoCheck] = useState(false);

  const termsCheckOnClick = useCallback(
    e => {
      setUseTermCheck(!termsCheck);
      setPrivacyInfoCheck(!termsCheck);
      setTermsCheck(!termsCheck);
    },
    [termsCheck]
  );

  const useTermCheckOnClick = useCallback(() => {
    setUseTermCheck(!useTermCheck);
  }, [useTermCheck]);

  const privacyInfoCheckOnClick = useCallback(() => {
    setPrivacyInfoCheck(!privacyInfoCheck);
  }, [privacyInfoCheck]);

  const nextButtonOnClick = useCallback(() => {
    if (!termsCheck) {
      alert("모든 이용약관에 동의하셔야 합니다.");
      return;
    }
    // 다음 할 일
  }, [termsCheck]);

  useEffect(() => {
    useTermCheck && privacyInfoCheck
      ? setTermsCheck(true)
      : setTermsCheck(false);
  }, [termsCheck, useTermCheck, privacyInfoCheck]);
  
  return (
    <TermsWrapper
      termsCheck={termsCheck}
      useTermCheck={useTermCheck}
      privacyInfoCheck={privacyInfoCheck}
    >
      <h1>DaBeen</h1>
      <div>
        이용약관, 개인정보 수집 및 이용에 모두 동의합니다.
        <button className="checkButton terms" onClick={termsCheckOnClick}>
          <Icon type="check-circle" />
        </button>
      </div>
      <div className="termBox">
        <span>다빈 이용약관 안내</span>
        <div className="term">blah blah</div>
        <div>
          <button className="checkButton use" onClick={useTermCheckOnClick}>
            <Icon type="check-circle" />
          </button>
          다빈 이용약관 동의
        </div>
      </div>
      <div className="termBox">
        <span>개인정보 수집 및 이용에 대한 안내</span>
        <div className="term">blah blah</div>
        <div>
          <button
            className="checkButton privacy"
            onClick={privacyInfoCheckOnClick}
          >
            <Icon type="check-circle" />
          </button>
          개인 정보 수집 및 이용에 대한 안내 확인 동의
        </div>
      </div>
      {termsCheck || (
        <div className="termDanger">동의하셔야 가입이 가능합니다.</div>
      )}
      <button onClick={nextButtonOnClick}>다음 단계</button>
    </TermsWrapper>
  );
};

export default Terms;
