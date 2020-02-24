import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Divider, Avatar } from "antd";
import Slick from "react-slick";

const dummyLiveHelp = [
    {
        userId : "123",
        nickname : "asdf",
        title : "아무거나",
        date : "2020-02-02",
        location : "부산광역시 남구 대연동",
        picture : "아무거나 이빈다!!"
    },
    {
        userId : "123",
        nickname : "asdf",
        title : "아무거나",
        date : "2020-02-02",
        location : "부산광역시 남구 대연동",
        picture : "아무거나 이빈다!!"
    },
    {
        userId : "123",
        nickname : "asdf",
        title : "아무거나",
        date : "2020-02-02",
        location : "부산광역시 남구 대연동",
        picture : "아무거나 이빈다!!"
    },
    {
        userId : "123",
        nickname : "asdf",
        title : "아무거나",
        date : "2020-02-02",
        location : "부산광역시 남구 대연동",
        picture : "아무거나 이빈다!!"
    },
    {
        userId : "123",
        nickname : "asdf",
        title : "아무거나",
        date : "2020-02-02",
        location : "부산광역시 남구 대연동",
        picture : "아무거나 이빈다!!"
    },
    {
        userId : "123",
        nickname : "asdf",
        title : "아무거나",
        date : "2020-02-02",
        location : "부산광역시 남구 대연동",
        picture : "아무거나 이빈다!!"
    },
];

function SampleNextArrow(props) { // 우 화살표
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style}}
        onClick={onClick}
      />
    );
  };

  function SamplePrevArrow(props) { // 좌 화살표
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style}}
        onClick={onClick}
      />
    );
  }

// 유즈이펙트로 가져온 유저 정보를 가지고 그려야함
const LiveHelpRequest = () => {
  return (
    // <LiveHelpRequestForm>
      <TestSlick 
      initialSlide={0}
      dots={true}
      autoplay={true}
      autoplaySpeed={2500}
      infinite={true}
      slidesToShow={3}
      slidesToScroll={3}
      nextArrow = {<SampleNextArrow/>}
      prevArrow = {<SamplePrevArrow/>}>
          {dummyLiveHelp.map(help => (
              <div key = {help.userId} className="liveHelpRequestFlex">
              <LiveHelpRequestContent>
                {help.picture}
                <Divider orientation="left" style={{ marginTop: "42%" }}/>
                <div className="liveHelpRequestUserInfo">
                  <Avatar size="large" icon="user" />
                  <div>
                    <div className="liveHelpRequestID">{help.userId}</div>
                    <div className="liveHelpRequestNickname">@{help.nickname}</div>
                  </div>
                </div>
              </LiveHelpRequestContent>
              <LiveHelpRequestContentInfo>
                <div className="titleDate">
                  <h3>{help.title}</h3>
                  <div>{help.date}</div>
                </div>
                <div className="location">{help.location}</div>
              </LiveHelpRequestContentInfo>
            </div> 
          ))}
      </TestSlick>
  );
};
const TestSlick = styled(Slick)`
  width: 85vw;
  margin-top: 40px;
  margin-bottom: 40px;
  /* @media only screen and (max-width: 768px) {
    display: flex;
    justify-items : center;
    align-items: center;
    flex-wrap : wrap;
  }  */
  & .slick-next, .slick-prev {
      display : block;
      background : white;
      &::before {
          color : #ff4300;
          line-height : 10px;
          font-size : 50px;
      }
  }
  & .slick-prev {
      margin-left : -10px;
  }
  & .slick-next::before {
    content : ">";
  }
  & .slick-prev::before {
    content : "<";
  }
  & .liveHelpRequestFlex {
    display: flex;
    padding : 0;
    margin : 0 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
     @media only screen and (max-width: 768px) {
      margin-top: 3vh;
    } 
   } 
`;

const LiveHelpRequestContent = styled.div`
  position: relative;
  width : 95%;
  border: solid 1px gray;
  border-radius: 5px;
  cursor: pointer;
  transition : border 0.2s, box-shadow 0.3s ease-in-out;
  &::after {
    position: absolute;
    width : 100%;
    height : 100%;
    z-index : -1;
    top: 0;
    left: 0;
    content : "";
    border-radius: 4px;
    box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.75);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
  &:hover::after {
    opacity: 1;
  }

   & .liveHelpRequestUserInfo {
    display: flex;
    justify-content : flex-start;
    align-items: center;
    margin-top: -37px;
    margin-bottom: 5px;
    & > div {
        display : flex;
        align-items : center;
        margin-top : 10px;
        margin-left : 10px;
    }
  }

  & .liveHelpRequestID {
    color: black;
    margin-right: 8px;
  }

  & .liveHelpRequestNickname {
    color: darkgray;
    font-size: 11px;
  }
`;

const LiveHelpRequestContentInfo = styled.div`
  color: gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width : 90%;

  & > .titleDate {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & > .location {
    border-top: solid 1px gray;
    text-align: right;
  }
`;

export default LiveHelpRequest;
