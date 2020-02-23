import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Row, Col, Pagination } from "antd";
import PostCapsule from "./PostCapsule";

// 카테고리 번호에 따라 다른 헬프 포스트들을 불러오게 하거나 걸러내게 해야할듯.
const PostList = ({ categoryNum }) => {
  const { helpPosts } = useSelector(state => state.posts);
  const onChangePagination = useCallback((page, pageSize) => {
    console.log(page, pageSize);
  }, []);
  return (
    <PostListUpperDiv>
      <Row gutter={[24, 24]}> 
        {helpPosts.map((help, index) => (
          <ColCapsule xs={24} md={12} xl={8} key={index}>
            <PostCapsule data={help} />
          </ColCapsule>
        ))}
      </Row>
      <Pagination
        className="PostListPagination"
        onChange={onChangePagination}
        simple
        defaultCurrent={1}
        pageSize={6}
        total={12}
      />
    </PostListUpperDiv>
  );
};

const PostListUpperDiv = styled.div`
  padding: 20px 0;
  & .PostListPagination{
    width: 180px;
    font-size: 18px;
      & input {
        width: 50px;
        margin: 0;
      }
      margin: 20px auto;
  }
`;
const ColCapsule = styled(Col)`
  display: flex;
  justify-content: center;
`;

export default PostList;
