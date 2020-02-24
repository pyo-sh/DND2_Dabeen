// 약간의 동의를 확인하기 위해 만든 화면
import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Icon } from "antd";
import Router from "next/router";

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
    setUseTermCheck(prev => !prev);
  }, []);

  const privacyInfoCheckOnClick = useCallback(() => {
    setPrivacyInfoCheck(prev => !prev);
  }, []);

  const nextButtonOnClick = useCallback(() => {
    if (!termsCheck) {
      alert("모든 이용약관에 동의하셔야 합니다.");
      return;
    }
    Router.push("/signup");
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
      <div className="termsWrap">
        <img src='/images/logo.svg' alt='dabeen logo' />
        <div>
          이용약관, 개인정보 수집 및 이용에 모두 동의합니다.
          <button className="checkButton terms" onClick={termsCheckOnClick}>
            <Icon type="check-circle" />
          </button>
        </div>
        <div className="termBox">
          <span>다빈 이용약관 안내</span>
          <div className="term">
            다빈이 정보를 제공하기 위해서는 고객님의 동의가 필요합니다.
          </div>
          <div>
            <button className="checkButton use" onClick={useTermCheckOnClick}>
              <Icon type="check-circle" />
            </button>
            다빈 이용약관 동의
          </div>
        </div>
        <div className="termBox">
          <span>개인정보 수집 및 이용에 대한 안내</span>
          <div className="term">
            개인정보를 수집하여 고객님들에게 좋은 정보를 주기 위해 노력할
            것입니다.
          </div>
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
      </div>
    </TermsWrapper>
  );
};

const TermsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 65px;
  & img {
    width : 50%;
  }
  & .termsWrap {
    width: 60%;
    max-width : 550px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding : 15px;
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
      background: #ff4300;
      border: none;
      border-radius: 5px;
      color: white;
      cursor: pointer;
      width: 25%;
      height : 30px;
    }
  }
  @media screen and (max-width: 768px) {
    & .termsWrap {
      width : 100%;
      max-width: 452px;
    }
  }
`;
export default Terms;
