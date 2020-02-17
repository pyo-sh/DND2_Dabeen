import React, { useState } from 'react';
import styled from 'styled-components';

import PostCapsule from './PostCapsule';

const PostList = ({ categoryNum }) => {
    return (
        <PostListUpperDiv>
            <PostCapsule/>
        </PostListUpperDiv>
    );
};

const PostListUpperDiv = styled.div`
    
`;

export default PostList;