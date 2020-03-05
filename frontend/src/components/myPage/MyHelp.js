import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { loadActiveUserPostRequestAction, loadInactiveUserPostRequestAction } from "../../reducers/posts";
import { Row, Pagination } from 'antd';
import MyHelpCapsule from "./MyHelpCapsule";
import { MyHelpUpperDiv, MyHelpCol } from './MyHelp.style';

const MyHelp = ({ userNum, helpType, isMe }) => {
  const dispatch = useDispatch();
  const [nowActivePage, setNowActivePage] = useState(1);
  const [nowInactivePage, setNowInActivePage] = useState(1);
  const {
    userActivePosts,
    userActivePostsPage,
    userInactivePosts,
    userInactivePostsPage
  } = useSelector(state => state.posts);
  // componentDidMount
  useEffect(() => {
    dispatch(loadActiveUserPostRequestAction({ userNum, page: nowActivePage-1, helpType }));
    dispatch(loadInactiveUserPostRequestAction({ userNum, page: nowInactivePage-1, helpType }));
  }, []);
  // helpType이 바뀔 때 마다 render
  useEffect(() => {
    dispatch(loadActiveUserPostRequestAction({ userNum, page: nowActivePage-1, helpType }));
    dispatch(loadInactiveUserPostRequestAction({ userNum, page: nowInactivePage-1, helpType }));
  }, [helpType]);
  useEffect(()=>{
    dispatch(loadActiveUserPostRequestAction({ userNum, page: nowActivePage-1, helpType }));
  }, [nowActivePage])
  useEffect(()=>{
    dispatch(loadInactiveUserPostRequestAction({ userNum, page: nowInactivePage-1, helpType }));
  }, [nowInactivePage]);
  // 페이지 바꿀 때 도움 요청
  const onChangePagination = (setState) => useCallback(( page, pageSize ) => {
    setState(page);
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
            onChange={onChangePagination(setNowActivePage)}
            current={nowActivePage}
            defaultCurrent={1}
            pageSize={userActivePostsPage.helpsPerPage}
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
                <MyHelpCapsule helpType={helpType} helpData={element} isMe={isMe}/>
              </MyHelpCol>
            ))}
          </Row>
          <Pagination
            className="MyhelpContentPage"
            onChange={onChangePagination(setNowInActivePage)}
            current={nowInactivePage}
            defaultCurrent={1}
            pageSize={userInactivePostsPage.helpsPerPage}
            total={userInactivePostsPage.totalDatas}
          />
        </div>
      </div>
    </MyHelpUpperDiv>
  );
};


export default MyHelp;
