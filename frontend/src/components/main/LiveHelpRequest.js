import React, { useState, useCallback } from "react";
import { Divider, Avatar } from "antd";
import PostDetail from '../posts/PostDetail';
import {TestSlick, LiveHelpRequestContent, LiveHelpRequestContentInfo} from './LiveHelpRequest.style';
import { useSelector } from 'react-redux';


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
  const [selectPost, setSelectPost] = useState('');
  const { livePosts } = useSelector(state => state.posts);
  const toggleDetail = useCallback(() => setVisible(prev=> !prev),[]);
  const onClickPost = useCallback((helpNum) => () => {
    setSelectPost(livePosts.filter(help => helpNum === help.helpNum)[0]);
    toggleDetail();
  },[livePosts]);

  return (
    // <LiveHelpRequestForm>
    // 뭐지 개수가 3의 배수로 안 맞아 떨어지면 제대로 안 되는건가???
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
          {livePosts.map(help => (
              <div key = {help.helpNum} className="liveHelpRequestFlex" onClick={onClickPost(help.helpNum)}>
              <LiveHelpRequestContent>
                {/* {help.helpPicList.length ? help.helpPicList[0] : null} */}
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
                  <h3>{help.helpTitle}</h3>
                  <div>{help.helpDeadline}</div>
                </div>
                <div className="location">{help.location}</div>
              </LiveHelpRequestContentInfo>
            </div> 
          ))}
      </TestSlick>
      {visible && <PostDetail setVisible={toggleDetail} data={selectPost}/>}
      </>
  );
};

export default LiveHelpRequest;
