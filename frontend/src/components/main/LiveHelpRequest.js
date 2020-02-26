import React, { useEffect, useState, useRef, useCallback } from "react";
import { Divider, Avatar } from "antd";
import PostDetail from '../posts/PostDetail';
import {TestSlick, LiveHelpRequestContent, LiveHelpRequestContentInfo} from './LiveHelpRequest.style';
const dummyLiveHelp = [
  {
    helpNum: 1,
    userId: '123',
    nickname: 'asdf',
    picture: '아무거나 이빈다!!',
    helpPostDate: '2020-02-24 11:23:13',
    postName: '망치 빌려주세요.', //게시글 제목
    category: '심부름', //카테고리
    helpDeadline: '2020-02-24 23:23:10', // 마감 일시
    helpExec: '2020-03-08 14:06:19', // 수행 일시
    needPersonnel: 3, //필요 인원
    price: 3000, //금액
    execLoc: '경남 창원시 의창구 남산로 20', //이행 위치
    sigungu: '의창구', //이행 시군구
    content: '열정페이로 일하실분 우대합니다!' //요구사항
  },
  {
    helpNum: 2,
    userId: '123',
    nickname: 'asdf',
    picture: '아무거나 이빈다!!',
    helpPostDate: '2020-02-24 11:23:13',
    postName: '망치 빌려주세요.', //게시글 제목
    category: '심부름', //카테고리
    helpDeadline: '2020-02-24 23:23:10', // 마감 일시
    helpExec: '2020-03-08 14:06:19', // 수행 일시
    needPersonnel: 3, //필요 인원
    price: 3000, //금액
    execLoc: '경남 창원시 의창구 남산로 20', //이행 위치
    sigungu: '의창구', //이행 시군구
    content: '열정페이로 일하실분 우대합니다!' //요구사항
  },
  {
    helpNum: 3,
    userId: '123',
    nickname: 'asdf',
    picture: '아무거나 이빈다!!',
    helpPostDate: '2020-02-24 11:23:13',
    postName: '망치 빌려주세요.', //게시글 제목
    category: '심부름', //카테고리
    helpDeadline: '2020-02-24 23:23:10', // 마감 일시
    helpExec: '2020-03-08 14:06:19', // 수행 일시
    needPersonnel: 3, //필요 인원
    price: 3000, //금액
    execLoc: '경남 창원시 의창구 남산로 20', //이행 위치
    sigungu: '의창구', //이행 시군구
    content: '열정페이로 일하실분 우대합니다!' //요구사항
  },
  {
    helpNum: 4,
    userId: '123',
    nickname: 'asdf',
    picture: '아무거나 이빈다!!',
    helpPostDate: '2020-02-24 11:23:13',
    postName: '망치 빌려주세요.', //게시글 제목
    category: '심부름', //카테고리
    helpDeadline: '2020-02-24 23:23:10', // 마감 일시
    helpExec: '2020-03-08 14:06:19', // 수행 일시
    needPersonnel: 3, //필요 인원
    price: 3000, //금액
    execLoc: '경남 창원시 의창구 남산로 20', //이행 위치
    sigungu: '의창구', //이행 시군구
    content: '열정페이로 일하실분 우대합니다!' //요구사항
  },
  {
    helpNum: 5,
    userId: '123',
    nickname: 'asdf',
    picture: '아무거나 이빈다!!',
    helpPostDate: '2020-02-24 11:23:13',
    postName: '망치 빌려주세요.', //게시글 제목
    category: '심부름', //카테고리
    helpDeadline: '2020-02-24 23:23:10', // 마감 일시
    helpExec: '2020-03-08 14:06:19', // 수행 일시
    needPersonnel: 3, //필요 인원
    price: 3000, //금액
    execLoc: '경남 창원시 의창구 남산로 20', //이행 위치
    sigungu: '의창구', //이행 시군구
    content: '열정페이로 일하실분 우대합니다!' //요구사항
  },
  {
    helpNum: 6,
    userId: '123',
    nickname: 'asdf',
    picture: '아무거나 이빈다!!',
    helpPostDate: '2020-02-24 11:23:13',
    postName: '망치 빌려주세요.', //게시글 제목
    category: '심부름', //카테고리
    helpDeadline: '2020-02-24 23:23:10', // 마감 일시
    helpExec: '2020-03-08 14:06:19', // 수행 일시
    needPersonnel: 3, //필요 인원
    price: 3000, //금액
    execLoc: '경남 창원시 의창구 남산로 20', //이행 위치
    sigungu: '의창구', //이행 시군구
    content: '열정페이로 일하실분 우대합니다!' //요구사항
  }
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
  const [ visible, setVisible ] = useState(false);
  const [selectPost, setSelectPost] = useState(dummyLiveHelp[0]);

  const toggleDetail = useCallback(() => setVisible(prev=> !prev),[]);
  const onClickPost = useCallback((helpNum) => () => {
    setSelectPost(dummyLiveHelp.filter(help => helpNum === help.helpNum)[0]);
    toggleDetail();
  },[]);

  return (
    // <LiveHelpRequestForm>
    <>
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
              <div key = {help.helpNum} className="liveHelpRequestFlex" onClick={onClickPost(help.helpNum)}>
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
                  <h3>{help.postName}</h3>
                  <div>{help.helpDeadline}</div>
                </div>
                <div className="location">{help.execLoc}</div>
              </LiveHelpRequestContentInfo>
            </div> 
          ))}
      </TestSlick>
      {visible && <PostDetail setVisible={toggleDetail} data={selectPost}/>}
      </>
  );
};

export default LiveHelpRequest;
