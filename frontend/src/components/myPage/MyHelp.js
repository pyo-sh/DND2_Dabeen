import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { loadUserPostRequestAction } from "../../reducers/posts";
import { Row, Pagination } from 'antd';
import MyHelpCapsule from "./MyHelpCapsule";

const MyHelp = ({ userNum, helpType }) => {
  const dispatch = useDispatch();
  const { userPosts } = useSelector(state => state.posts);
  // componentDidMount
  useEffect(() => {
    dispatch(loadUserPostRequestAction({ userNum, page:1, helpType }));
  }, []);
  // 페이지 바꿀 때 도움 요청
  const onChangePagination = useCallback(( userNum, page, pageSize) => {
    console.log(page, pageSize);
    dispatch(loadUserPostRequestAction({page, helpType}));
  }, []);
  return (
    <MyHelpUpperDiv>
      <div className="Myhelp">
        <div className="MyhelpTitle">
          {helpType === "take" ? "받을 도움" : "줄 도움"}
        </div>
        <div className="MyhelpContent">
          <Row gutter={[12, 12]}>
            {userPosts.map((element, index) => (
              <MyHelpCol md={24} lg={12} xl={8} key={element.helpNum}>
                <MyHelpCapsule helpData={element} />
              </MyHelpCol>
            ))}
          </Row>
          <Pagination
            className="MyhelpContentPage"
            onChange={onChangePagination}
            simple
            defaultCurrent={1}
            pageSize={4}
            total={12}
          />
        </div>
      </div>
      <div className="Myhelp">
        <div className="MyhelpTitle">
          {helpType === "take" ? "받은 도움" : "준 도움"}
        </div>
        <div className="MyhelpContent">
          <Row gutter={[12, 12]}>
            {userPosts.map((element, index) => (
              <MyHelpCol md={24} lg={12} xl={8} key={element.helpNum}>
                <MyHelpCapsule helpData={element} />
              </MyHelpCol>
            ))}
          </Row>
          <Pagination
            className="MyhelpContentPage"
            onChange={onChangePagination}
            simple
            defaultCurrent={1}
            pageSize={4}
            total={12}
          />
        </div>
      </div>
    </MyHelpUpperDiv>
  );
};


export default MyHelp;
