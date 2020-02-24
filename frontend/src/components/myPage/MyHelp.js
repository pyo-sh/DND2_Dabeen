import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { loadUserPostRequestAction } from "../../reducers/posts";
import styled from "styled-components";
import { Row, Col, Pagination } from 'antd';
import MyHelpCapsule from "./MyHelpCapsule";

const MyHelp = ({ helpType }) => {
  const dispatch = useDispatch();
  const { userPosts } = useSelector(state => state.posts);
  // componentDidMount
  useEffect(() => {
    dispatch(loadUserPostRequestAction({page:1, helpType}));
  }, []);
  // 페이지 바꿀 때 도움 요청
  const onChangePagination = useCallback((page, pageSize) => {
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

const MyHelpUpperDiv = styled.div`
  width: 100%;
  & .Myhelp {
    display: flex;
    flex-direction: column;
    & .MyhelpTitle {
      font-size: 40px;
      font-weight: bold;
      padding-bottom: 25px;
      border-bottom: 1px solid #bfc7ce;
    }
    & .MyhelpContent{
      padding: 20px 0;
    }
    & .MyhelpContentPage{
      width: 180px;
      & input {
        width: 50px;
        margin: 0;
      }
      margin: 20px auto;
    }
  }
`;
const MyHelpCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MyHelp;
