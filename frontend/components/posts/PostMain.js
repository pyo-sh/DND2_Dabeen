import React from 'react';
import MenuBar from '../main/MenuBar';
import MainBottom from '../main/MainBottom';
import PostWrite from './PostWrite';

const PostMain = () => {
    return (
        <>
        <MenuBar />
        <PostWrite />
        <MainBottom />
        </>
    );
};

export default PostMain;