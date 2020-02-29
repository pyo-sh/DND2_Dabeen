import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { loadActiveUserPostRequestAction } from "../../reducers/posts";
import { Row, Pagination } from 'antd';
import MyHelpCapsule from "./MyHelpCapsule";
import { MyHelpUpperDiv, MyHelpCol } from './MyHelp.style';

const MyHelp = ({ userNum, helpType, isMe }) => {
  const dispatch = useDispatch();
  const {
    userActivePosts,
    userActivePostsPage,
    userInactivePosts,
    userInactivePostsPage
  } = useSelector(state => state.posts);
  // componentDidMount
  useEffect(() => {
    dispatch(loadActiveUserPostRequestAction({ userNum, page: 0, helpType }));
  }, []);
  // helpType이 바뀔 때 마다 render
  useEffect(() => {
    dispatch(loadActiveUserPostRequestAction({ userNum, page: 0, helpType }));
  }, [helpType]);
  // 페이지 바꿀 때 도움 요청
  const onChangePagination = useCallback(( page, pageSize ) => {
    dispatch(loadActiveUserPostRequestAction({userNum, page, helpType}));
  }, []);
  return (
    <MyHelpUpperDiv>
      <div className="Myhelp">
        <div className="MyhelpTitle">
          {helpType === "take" ? "받을 도움" : "줄 도움"}
        </div>
        <div className="MyhelpContent">
          <Row gutter={[12, 12]}>
            {userActivePosts && userActivePosts.map((element, index) => (
              <MyHelpCol md={24} lg={12} xl={8} key={element.helpNum}>
                <MyHelpCapsule helpType={helpType} helpData={element} isMe={isMe}/>
              </MyHelpCol>
            ))}
          </Row>
          <Pagination
            className="MyhelpContentPage"
            onChange={onChangePagination}
            simple
            defaultCurrent={1}
            pageSize={15}
            total={userActivePostsPage.totalDatas}
          />
        </div>
      </div>
      <div className="Myhelp">
        <div className="MyhelpTitle">
          {helpType === "take" ? "받은 도움" : "준 도움"}
        </div>
        <div className="MyhelpContent">
          <Row gutter={[12, 12]}>
            {userInactivePosts && userInactivePosts.map((element, index) => (
              <MyHelpCol md={24} lg={12} xl={8} key={element.helpNum}>
                <MyHelpCapsule helpType={helpType} helpData={element} />
              </MyHelpCol>
            ))}
          </Row>
          <Pagination
            className="MyhelpContentPage"
            onChange={onChangePagination}
            simple
            defaultCurrent={1}
            pageSize={15}
            total={userInactivePostsPage.totalDatas}
          />
        </div>
      </div>
    </MyHelpUpperDiv>
  );
};


export default MyHelp;
