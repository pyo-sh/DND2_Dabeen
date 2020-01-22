//도움말
import React from "react";
import styled from "styled-components";

const HelpBox = styled.div`
  width : 80%;
  & > div {
    border-bottom: 2px solid black;
    padding: 10px;
  }
`;

const HelpExample = () => {
  return (
    <HelpBox>
      <div>
        <h1>도움말</h1>
      </div>
      <div>
        <ol>
          <li>계정의 비밀번호가 기억나질 않아요</li>
          <li>환불을 받으려면 어떻게 해야하나요?</li>
          <li>사기를 당했습니다.</li>
          <li>누군가 나의 이름으로 계정을 사용하고 있어요.</li>
          <li>회원탈퇴에 대해 알고싶어요.</li>
        </ol>
      </div>
    </HelpBox>
  );
};

export default HelpExample;
