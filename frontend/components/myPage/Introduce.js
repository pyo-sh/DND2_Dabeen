// 자기 소개
import React from "react";
import { Icon } from 'antd';
import styled from "styled-components";

const IntroWrapper = styled.div`
  width: 100%;
  margin-top: 65px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  & .introMain {
    border: 1px solid black;
    width: 60%;
    padding: 20px;
  }
  & .introHeader {
    display: flex;
    width: 100%;
    padding-bottom : 15px;
    justify-content: space-around;
    flex-wrap : wrap;
    & .introProfile {
      border: 1px solid black;
      border-radius: 50%;
      width: 150px;
      height: 150px;
      text-align: center;
      line-height: 150px;
    }
    & .introInfoBox {
        width: 60%;
    }
    & .introInfo {
      display: flex;
      width : 100%;
      justify-content: space-between;
      align-items: center;
      & .introNick {
        display: flex;
        align-items: center;
      }
      & button {
        background: #eeeeee;
        border: none;
        color: #969696;
        height: 25px;
        text-transform: uppercase;
        width: 40px;
      }
    }
    & .content {
      color: darkblue;
    }
  }
  & .dabeenerApply {
      display : flex;
      border-radius : 5px;
      justify-content : space-around;
      align-items : center;
      background : #F0F0F0;
      color : #8B8B8B;
      & h2 {
          margin : 0;
      }

  }
  & .map {
    border: 1px solid black;
    width: 80%;
    height: 40vh;
  }
`;

const Introduce = () => {
  return (
    <IntroWrapper>
      <div className="introMain">
        <div className="introHeader">
          <div className="introProfile">프로필 사진</div>
          <div className= "introInfoBox">
            <div className="introInfo">
              <div className="introNick">
                <h1>닉네임</h1>
                <span>@아이디</span>
              </div>
              <button>edit</button>
            </div>
            <div className="content">
              안녕 날 소개하지, 내 직업은 ~ 돈 좀 버는 직업이야
            </div>
          </div>
        </div>
        <div className="dabeenerApply">
          <div>
            <h2>다비너 지원하기</h2>
            <p>이웃을 도우며 소소한 행복을 느껴보세요.</p>
          </div>
          <Icon type="right" />
        </div>
        <div>
          <h1>내 위치</h1>
          <div className="map"></div>
        </div>
      </div>
    </IntroWrapper>
  );
};

export default Introduce;
