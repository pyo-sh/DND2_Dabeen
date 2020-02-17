// 자기 소개
import React, { useCallback } from "react";
import { Icon } from "antd";
import styled from "styled-components";
import EvaluationItem from "./EvaluationItem";
import StarScore from "./StarScore";
import Router from 'next/router';

const Introduce = ({ myInfomation, evaluation }) => {
  const {
    id,
    nickname,
    introduce,
    totalHelp,
    totalScore,
    totalRevenu,
    location,
    isDabeener
  } = myInfomation;
  return (
    <IntroWrapper>
      <div className="introMain">
        <div className="introHeader">
          <div className="introProfile">프로필 사진</div>
          <div className="introInfoBox">
            <div className="introInfo">
              <div className="introNick">
                <h1>{nickname}</h1>
                <span>@{id}</span>
              </div>
              <button onClick={useCallback(() => Router.push('/modifyuser'),[])}>edit</button>
            </div>
            <div className="content">{introduce}</div>
            {isDabeener && (
              <div className="myTotalEval">
                <div>
                  <b>{totalHelp}</b>
                  <br />총 도움수
                </div>
                <div>
                  <b>
                    <StarScore score={totalScore} />
                    {totalScore}
                  </b>
                  <br />
                  평점
                </div>
                <div>
                  <b><span className="myRevenu">{totalRevenu}</span>원</b>
                  <br />
                  수익
                </div>
                <Icon type="right" />
              </div>
            )}
          </div>
        </div>
        {!isDabeener && (
          <div className="dabeenerApply">
            <div onClick={useCallback(() => Router.push('/regist'),[])}>
              <h2>다비너 지원하기</h2>
              <p>이웃을 도우며 소소한 행복을 느껴보세요.</p>
            </div>
            <Icon type="right" />
          </div>
        )}
        {isDabeener && (
          <div className="myEvaluation">
            <h2>받은 평가</h2>
            <div className="evaluations">
              {evaluation.map(eItem => (
                <EvaluationItem eItem={eItem} />
              ))}
            </div>
          </div>
        )}
        <div className ="mapBox">
          <h1>내 위치</h1>
          <div className="map"></div>{/* 지도를 나타낸다!*/}
          <div className="myLocation">{location}</div>
        </div>
      </div>
    </IntroWrapper>
  );
};

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
    max-width : 640px;
    padding: 20px;
  }
  & .introHeader {
    display: flex;
    width: 100%;
    padding-bottom: 15px;
    justify-content: space-around;
    flex-wrap: wrap;
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
      width: 100%;
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
    & .myTotalEval {
      display: flex;
      width: 100%;
      justify-content: space-between;
      & div .myRevenu{
        color : #FF4300;
      }
    }
  }
  & .dabeenerApply {
    display: flex;
    border-radius: 5px;
    justify-content: space-around;
    align-items: center;
    background: #f0f0f0;
    color: #8b8b8b;
    & h2 {
      margin: 0;
    }
  }
  & .myEvaluation {
    & .evaluations {
      border: 1px solid black;
      border-bottom: 0px;
    }
  }
  & .mapBox {
    & .map {
    border: 1px solid black;
    height: 40vh;
    }
    & .myLocation {
      border : 1px solid black;
      border-top : 0px;
    }
  }
  @media screen and (max-width: 768px) { /* 768보다 작을 때는 화면 크게 만들거임!!*/
    & .introMain {
      width : 100%;
    }
  }
`;
export default Introduce;
