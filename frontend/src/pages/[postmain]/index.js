import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router'
import styled from 'styled-components';
import { Input, DatePicker } from 'antd';
import PostList from '../../components/posts/PostList';
import PostWrite from '../../components/posts/PostWrite';

const dateFormat = 'YYYY/MM/DD';

const postmain = () => {
    const categoryNum = useRouter().query.postmain;     // 어떤 카테고리를 선택했는지에 대한 props
    const [postWriteVisible, setPostWriteVisible] = useState(false);
    // 카테고리 정한것을 바꿨을 때, postWrite이 보이는 상태이면 없애기 위함이다
    useEffect(() => {
        setPostWriteVisible(false);
    }, [categoryNum]);
    
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
            <div className="postmainWrapper">
                <div className="postmainTitle">
                    <div className="postmainTitleMain">{getTitle().mainTitle}</div>
                    <div className="postmainTitleSub">{getTitle().subTitle}</div>
                </div>
                <div className="postmainSearch">
                    <PostSearchBox>
                        <div className="postsearchboxTitle">지역</div>
                        <Input className="postsearchboxInput"/>
                    </PostSearchBox>
                    <PostSearchBox>
                        <div className="postsearchboxTitle">신청 마감 일시</div>
                        <DatePicker className="postsearchboxDatePicker" format={dateFormat} />{/*defaultValue={moment('2015/01/01', dateFormat)}}*/}
                    </PostSearchBox>
                    <PostSearchBox>
                        <div className="postsearchboxTitle">게시글 마감 일시</div>
                        <DatePicker className="postsearchboxDatePicker" format={dateFormat} />{/*defaultValue={moment('2015/01/01', dateFormat)}}*/}
                    </PostSearchBox>
                    <PostSearchBox>
                        <div className="postsearchboxTitle">가격대</div>
                        <Input className="postsearchboxInput"/>
                    </PostSearchBox>
                </div>
                <div className="postmainContent">
                    <PostList categoryNum={categoryNum}/>
                </div>
                <div className="postmainWrite" onClick={useCallback((e)=>{setPostWriteVisible(true)}, [])}>
                    <img
                        className="postmainWriteIcon"
                        alt="writePost"
                        src={"/images/postIcon.PNG"}
                        />
                    {postWriteVisible
                    ?   <PostWrite/>
                    :   null}
                </div>
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
    & .postmainWrapper{
        width: 100%;
        max-width: 1200px;
        min-width: 320px;
        padding: 0 10px;
    }
    & .postmainTitle{
        font-weight: bold;
        display: flex;
        align-items: flex-end;
        flex-wrap: wrap;
        padding: 0 10px;
        & .postmainTitleMain{
            min-width: 100px;
            font-size: 50px;
        }
        & .postmainTitleSub{
            padding-left: 10px;
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
        & .postmainWriteIcon{
            width: 86px;
            cursor: pointer;
        }
        position: fixed;
        right: 57px;
        bottom: 100px;
        & .postmainWriteModal{
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
const PostSearchBox = styled.div`
    padding: 5px;
    display: flex;
    align-items: flex-end;
    & .postsearchboxTitle{
        width: 120px;
    }
    & .postsearchboxInput{
        width : 150px;
    }
    & .postsearchboxDatePicker{
        
    }
`;

export default postmain;