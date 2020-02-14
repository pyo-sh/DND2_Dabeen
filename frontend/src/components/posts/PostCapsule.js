import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Divider } from 'antd';

const PostCapsule = ({ index }) => {
    
    return (
        <PostCapsuleUpperDiv>
            <div className="Capsule-Main">
                <div className="Capsule-Location">
                    ~~~~시 ~~~구
                </div>
                <Divider orientation="left">
                    <div className="Capsule-Main-Picture">
                        사진
                    </div>
                </Divider>
                <div className="Capsule-Main-Profile">
                    <div className="Capsule-Main-Nickname">
                        닉네임
                    </div>
                    <div className="Capsule-Main-Id">
                        @아이디
                    </div>
                </div>
            </div>
            <div className="Capsule-Title">
                튼튼 오함마 망치가 필요해요
                <div>마감</div>
            </div>
            <div className="Capsule-FinishTime">
                신청 마감일 : 20~~년 ~월 ~일
            </div>
            <div className="Capsule-DoingTime">
                수행일 : 20~~년 ~월 ~일
            </div>
        </PostCapsuleUpperDiv>
    );
};

const PostCapsuleUpperDiv = styled.div` 
    width: 350px;
    & .Capsule-Main{
        width: 100%;
        height: 240px;
        border: solid 1px #d0d0d0;
        border-radius: 5px;

        & .Capsule-Main-Picture{
            width: 60px;
            height: 60px;
            border: solid 1px #d0d0d0;
            border-radius: 50%;
            text-align: center;
        }

        & .Capsule-Main-Profile{
            display: flex;
            justify-content: center;
            width: 100%;
            margin-top: -37px;
        }
    }

    & .Capsule-Title{
        display: flex;
    }
`;

export default PostCapsule;