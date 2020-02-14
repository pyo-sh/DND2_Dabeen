import React, { useState } from 'react';
import styled from 'styled-components';

import PostCapsule from './PostCapsule';

const PostList = () => {
    return (
        <PostListUpperDiv>
            <div className="Title">
                <div className="Title-Main">심부름  </div>
                <div className="Title-Sub">간단한 심부름을 도와주세요!</div>
            </div>
            <div className="Search">
                <PostListSearchBox>
                    <div className="Search-Title">지역</div>
                </PostListSearchBox>
                <PostListSearchBox>
                    <div className="Search-Title">신청 마감 일시</div>
                </PostListSearchBox>
                <PostListSearchBox>
                    <div className="Search-Title">게시글 마감 일시</div>
                </PostListSearchBox>
                <PostListSearchBox>
                    <div className="Search-Title">가격대</div>
                </PostListSearchBox>
            </div>
            <div className="Content">
                <PostCapsule></PostCapsule>
            </div>
        </PostListUpperDiv>
    );
};

const PostListUpperDiv = styled.div`
    padding: 70px 200px;
    & .Title{
        font-weight: bold;
        display: flex;
        align-items: flex-end;
        & .Title-Main{
            font-size: 50px;
        }
        & .Title-Sub{
            font-size: 28px;
        }
    }
    & .Search{
        padding: 10px;
        border-radius: 8px;
        background: #F0F0F0;
        font-size: 18px;
    }
`;
const PostListSearchBox = styled.div`
    padding: 5px;
    display: flex;
    align-items: flex-end;
    & .Search-Title{
        
    }
`;

export default PostList;