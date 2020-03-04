import React, { useState, useCallback, useMemo } from "react";
import { Divider } from "antd";
import PostDetail from '../posts/PostDetail';
import { TestSlick, LiveHelpRequestWrapper, LocationIcon, LiveHelpRequestUpperDiv } from './LiveHelpRequest.style';
import { useSelector } from 'react-redux';
import SkeletonCapsule from '../posts/SkeletonCapsule';


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

  const setting = useMemo(()=> ({
    initialSlide : 0,
    dots : true,
    autoplay : true,
    autoplaySpeed : 2500,
    infinite : livePosts.length >= 3,
    slidesToShow : 3,
    slidesToScroll :3,
    nextArrow : <SampleNextArrow/>,
    prevArrow : <SamplePrevArrow/>,
    responsive : [
      {
        breakpoint : 769,
        settings: {
          slidesToScroll : 2,
          slidesToShow : 2,
          infinite : livePosts.length >= 2,
        }
      },
      {
        breakpoint : 426,
        settings: {
          slidesToScroll : 1,
          slidesToShow : 1,
          infinite : livePosts.length >= 1,
        }
      },

    ]
  }), [livePosts.length])

  return (
    // <LiveHelpRequestForm>
    // 뭐지 개수가 3의 배수로 안 맞아 떨어지면 제대로 안 되는건가???
    <>
      <TestSlick 
      {...setting}
    >
          {livePosts.map(help => (
            <div key = {help.helpNum} className="liveHelpRequestFlex" onClick={onClickPost(help.helpNum)}>
              <LiveHelpRequestWrapper>
                <LiveHelpRequestUpperDiv>
                  <div className="LiveHelpRequestLocation">
                    <div className="LiveHelpRequestLocationTriangle"></div>
                    <div className="LiveHelpRequestLocationInfo">
                      <LocationIcon type="environment" />
                      {help.execLoc}
                    </div>
                  </div>
                  {/* {help.helpPicList.length ? help.helpPicList[0] : null} */}
                  {help.helpPic.length ? <img className="LiveHelpRequestImage" src={help.helpPic[0].path}/>
                    :
                    <img className="LiveHelpRequestImage" src={'/images/noImage.jpg'}/>
                  }
                  {/* <Divider orientation="left" style={{ marginTop: "42%" }}/> */}
                  <Divider orientation="left">
                    {help.userPic ? 
                    <img className="LiveHelpRequestUserPicture" src={help.userPic}/>
                    :
                    <img className="LiveHelpRequestUserPicture" src={`/images/defaultProfile.png`}/>
                    }
                  </Divider>
                  <div className="liveHelpRequestUserInfo">
                    <div className="liveHelpRequestNickname">{help.nickname}</div>
                    <div className="liveHelpRequestID">@{help.userId}</div>
                  </div>
                </LiveHelpRequestUpperDiv>
                <div className="liveHelpRequestContent">
                  <div className="liveHelpRequestTitle">{help.helpTitle}</div>
                  <div className="liveHelpRequestDeadline">마감일 : {help.helpDeadLine.split('T')[0]}</div>
                </div>
              </LiveHelpRequestWrapper>
            </div> 
          ))}
      </TestSlick>
      {visible && <PostDetail setVisible={toggleDetail} data={selectPost}/>}
      </>
  );
};

export default LiveHelpRequest;
