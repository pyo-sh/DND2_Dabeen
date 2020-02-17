import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router'
import styled from 'styled-components';
import { Modal } from 'antd';
import PostList from '../../components/posts/PostList';
import PostWrite from '../../components/posts/PostWrite';

const postmain = () => {
    const categoryNum = useRouter().query.postmain;
    const [postWriteVisible, setPostWriteVisible] = useState(false);
    const getTitle = useCallback(() => {
        switch(categoryNum){
            case "errand": return {
                    mainTitle: "심부름",
                    subTitle: "간단한 심부름을 도와주세요!",
                }
            case "rental": return {
                    mainTitle: "대여",
                    subTitle: "물건을 잠시 맡겨보아요!",
                }
            case "chores": return {
                    mainTitle: "잡일",
                    subTitle: "부족한 일손을 채워보아요!",
                }
            default: return {
                    mainTitle: '',
                    subTitle: '',
                }
        }
    }, [categoryNum]);

    return (
        <PostUpperDiv>
            <div className="postmainTitle">
                <div className="postmainTitleMain">{getTitle().mainTitle}</div>
                <div className="postmainTitleSub">{getTitle().subTitle}</div>
            </div>
            <div className="postmainSearch">
                <PostSearchBox>
                    <div className="postsearchboxTitle">지역</div>
                </PostSearchBox>
                <PostSearchBox>
                    <div className="postsearchboxTitle">신청 마감 일시</div>
                </PostSearchBox>
                <PostSearchBox>
                    <div className="postsearchboxTitle">게시글 마감 일시</div>
                </PostSearchBox>
                <PostSearchBox>
                    <div className="postsearchboxTitle">가격대</div>
                </PostSearchBox>
            </div>
            <div className="postmainContent">
                <PostList categoryNum={categoryNum}/>
            </div>
            <div className="postmainWrite" onClick={useCallback((e)=>{setPostWriteVisible(true)}, [])}>
                <img alt="writePost" src={"/images/postIcon.PNG"}/>
                <Modal visible={postWriteVisible} footer={null} onCancel={useCallback((e)=>{setPostWriteVisible(false)}, [])}>
                    <PostWrite/>
                </Modal>
            </div>
        </PostUpperDiv>
    );
};

const PostUpperDiv = styled.div`
    padding: 70px 200px;
    & .postmainTitle{
        font-weight: bold;
        display: flex;
        align-items: flex-end;
        & .postmainTitleMain{
            font-size: 50px;
        }
        & .postmainTitleSub{
            font-size: 28px;
        }
    }
    & .postmainSearch{
        padding: 10px;
        margin: 10px 0;
        border-radius: 8px;
        background: #F0F0F0;
        font-size: 18px;
    }
    & .postmainContent{
        display: flex;
        justify-content: space-between;
    }
    & .postmainWrite{
        & img{
            width: 86px;
            cursor: pointer;
        }
        position: fixed;
        right: 57px;
        bottom: 100px;
    }
`;
const PostSearchBox = styled.div`
    padding: 5px;
    display: flex;
    align-items: flex-end;
    & .postsearchboxTitle{

    }
`;

export default postmain;