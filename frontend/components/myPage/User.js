// 유저 창
import React from "react";
import styled from "styled-components";

const User = () => {
  return (
    <UserBox>
      <div className="pic">
        <img src="/react.png"></img>
      </div>
      <div>
        <div className="idBox">
            <div>닉네임</div>
            <div>아이디</div>
        </div>
        <div className="evaluate">0개의 평가</div>
        <div className="etc">
          <div>총 도움수
              <div>0 개</div>
          </div>
          <div>만족도
              <div>0%</div>
          </div>
        </div>
      </div>
      <div>
        <button>프로필 등록 / 수정</button>
      </div>
    </UserBox>
  );
};

const UserBox = styled.div`
  width: 80%;
  height: 25vh;
  border: 1px solid black;
  border-radius : 15px;
  display: flex;
  justify-content : space-around;
  align-items : center;
  & img {
      width: 150px;
      height: 150px;
      border-radius : 50%;
      margin : auto;
      object-fit : cover;
      border : 2px solid #2c3e50;
      padding : 8px;
  }
  & .idBox {
      display : flex;
      justify-content : space-between;
      width : 100%;
  }
  & .etc {
      display : flex;
  }
  & .etc > div {
      margin : 0 5px;
  }
  & button {
      border : none;
      background : #cd6133;
      border-radius : 5px;
      color : white;
      padding : 8px;
      font-size: 13px;
      width : 150px;
  }
`;

export default User;
