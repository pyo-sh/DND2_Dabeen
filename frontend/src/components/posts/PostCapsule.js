import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Divider } from 'antd';

const PostCapsule = ({ index }) => {
    
    return (
        <PostCapsuleUpperDiv>
            <div className="Capsule-Main">
                <div className="Capsule-Main-Location">
                    ~~~~시 ~~~구
                </div>
                <div className="Capsule-Main-Profile">
                    <Divider orientation="left">
                        <div className="Capsule-Main-Picture">
                            사진
                        </div>
                    </Divider>
                    <div className="Capsule-Main-UserInfo">
                        <div className="Capsule-Main-Nickname">
                            닉네임
                        </div>
                        <div className="Capsule-Main-Id">
                            @아이디
                        </div>
                    </div>
                </div>
            </div>
            <div className="Capsule-Title">
                튼튼 오함마 망치가 필요해요
                <div className="Capsule-Title-Check">신청 중</div>
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

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        & .Capsule-Main-Location{
            align-self: flex-end;
            padding: 5px 10px;
        }
        & .Capsule-Main-Picture{
            width: 70px;
            height: 70px;
            border: solid 1px #d0d0d0;
            border-radius: 50%;
            text-align: center;
        }

        & .Capsule-Main-UserInfo{
            display: flex;
            justify-content: center;
            align-items: flex-end;
            width: 100%;
            margin-top: -45px;
            margin-left: -25px;
            & .Capsule-Main-Nickname{
                font-size: 18px;
            }
            & .Capsule-Main-Id{
                padding-left: 10px;
            }
        }
    }

    & .Capsule-Title{
        display: flex;
        font-size: 25px;
        & .Capsule-Title-Check{
            width: 50px;
            padding: 2px;
            color: white;
            background: #FF4300;
            border-radius: 10px;
            margin: 10px 10px;

            font-size: 14px;
            text-align: center;
        }
    }
`;

export default PostCapsule;