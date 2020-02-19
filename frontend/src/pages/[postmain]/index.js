import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import PostList from "../../components/posts/PostList";
import PostWrite from "../../components/posts/PostWrite";
import PostSearch from "../../components/posts/PostSearch";

const postmain = () => {
  const categoryNum = useRouter().query.postmain; // 어떤 카테고리를 선택했는지에 대한 props
  const [postWriteVisible, setPostWriteVisible] = useState(false); // 게시글 쓰기 버튼을 클릭했을 때 Modal창 띄우기 위함

  // 카테고리 정한것을 바꿨을 때, postWrite이 보이는 상태이면 다시 Modal창을 닫아야함
  useEffect(() => {
    setPostWriteVisible(false);
  }, [categoryNum]);
  // postWrite Modal창을 닫을 수 있는 함수
  const setPostWriteInvisible = useCallback(e => {
    setPostWriteVisible(prev => !prev);
  }, []);

  // 보고자 하는 카테고리가 바뀔 때 보여주는 Title을 결정해주는 함수
  const getTitle = useCallback(() => {
    switch (categoryNum) {
      case "errand":
        return {
          mainTitle: "심부름",
          subTitle: "간단한 심부름을 도와주세요!"
        };
      case "rental":
        return {
          mainTitle: "대여",
          subTitle: "물건을 잠시 맡겨보아요!"
        };
      case "chores":
        return {
          mainTitle: "잡일",
          subTitle: "부족한 일손을 채워보아요!"
        };
      default:
        return {
          mainTitle: "",
          subTitle: ""
        };
    }
  }, [categoryNum]);

  return (
    <PostUpperDiv>
      <div className="postmainWrapper">
        <div className="postmainTitle">
          <div className="postmainTitleMain">{getTitle().mainTitle}</div>
          <div className="postmainTitleSub">{getTitle().subTitle}</div>
        </div>
        <PostSearch categoryNum={categoryNum}/>
        <div className="postmainContent">
          <PostList categoryNum={categoryNum}/>
        </div>
        <div
          className="postmainWrite"
          onClick={useCallback(e => {
            setPostWriteVisible(true);
          }, [])}
        >
          <img
            className="postmainWriteIcon"
            alt="writePost"
            src={"/images/postIcon.PNG"}
          />
        </div>
        {postWriteVisible ? (
          <PostWrite setInvisible={setPostWriteInvisible} />
        ) : null}
      </div>
    </PostUpperDiv>
  );
};

const PostUpperDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 70px;
  & .postmainWrapper {
    width: 100%;
    max-width: 1200px;
    min-width: 320px;
    padding: 0 10px;
  }
  & .postmainTitle {
    font-weight: bold;
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    padding: 0 10px;
    & .postmainTitleMain {
      min-width: 100px;
      font-size: 50px;
    }
    & .postmainTitleSub {
      padding-left: 10px;
      font-size: 28px;
    }
  }
  & .postmainContent {
    display: flex;
    justify-content: space-between;
  }
  & .postmainWrite {
    & .postmainWriteIcon {
      width: 86px;
      cursor: pointer;
    }
    position: fixed;
    right: 57px;
    bottom: 100px;
    & .postmainWriteModal {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.65);
      z-index: 3;
    }
  }
`;

export default postmain;
