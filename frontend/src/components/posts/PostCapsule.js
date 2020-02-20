import React, { useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Icon, Divider } from 'antd';
import PostDetail from './PostDetail';

const PostCapsule = ({ data }) => {
    const [postDetailVisible, setPostDetailVisible] = useState(false);      // 카테고리 클릭에 대한 상세 정보
    
    const setVisible = useCallback((e) => {
        setPostDetailVisible(prev => !prev);
    }, []);

    return (
        <>
            <PostCapsuleUpperDiv onClick={useCallback((e)=>{setPostDetailVisible(true)}, [])}>
                <div className="CapsuleMain">
                    <div className="CapsuleMainLocation">
                        <LocationIcon
                            type="environment"/>
                        {data.address}
                    </div>
                    <div className="CapsuleMainProfile">
                        <Divider orientation="left">
                            <div className="CapsuleMainPicture">
                                사진{data.helpPickList}
                            </div>
                        </Divider>
                        <div className="CapsuleMainUserInfo">
                            <div className="CapsuleMainNickname">
                                {data.nickname}
                            </div>
                            <div className="CapsuleMainId">
                                @{data.id}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="CapsuleTitle">
                    {data.helpTitle}
                    {data.isHelpApprove ?
                        <div className="CapsuleTitleCheckTrue">마감</div> : 
                        <div className="CapsuleTitleCheckFalse">신청 중</div>
                    }
                </div>
                <div className="CapsuleFinishTime">
                    신청 마감일 : {data.helpDeadLine}
                </div>
                <div className="CapsuleDoingTime">
                    수행일 : {data.helpExecDate}
                </div>
            </PostCapsuleUpperDiv>
            {postDetailVisible
            ?   <PostDetail setVisible={setVisible} data={data}/>
            :   null}
        </>
    );
};

const PostCapsuleUpperDiv = styled.div` 
    width: 100%;
    max-width: 500px;
    min-width: 300px;
    cursor: pointer;
    & .CapsuleMain{
        width: 100%;
        height: 240px;
        border: solid 1px #d0d0d0;
        border-radius: 5px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        & :hover{
            border: solid 1px #FF4300;
        }
        & .CapsuleMainLocation{
            align-self: flex-end;
            padding: 5px 10px;
        }
        & .CapsuleMainProfile{
            & .CapsuleMainPicture{
                width: 70px;
                height: 70px;
                border: solid 1px #d0d0d0;
                border-radius: 50%;
                text-align: center;
            }
            & .CapsuleMainUserInfo{
                display: flex;
                align-items: flex-end;
                text-align: start;
                margin-top: -40px;
                padding-left: 110px;
                & .CapsuleMainNickname{
                    font-size: 18px;
                }
                & .CapsuleMainId{
                    padding-left: 10px;
                }
            }
        }
    }

    & .CapsuleTitle{
        display: flex;
        font-size: 25px;
        & div{
            width: 50px;
            padding: 2px;
            border-radius: 10px;
            margin: 10px 10px;

            font-size: 14px;
            text-align: center;
        }
        & .CapsuleTitleCheckTrue{
            color: #7A7A7A;
            background: #F0F0F0;
        }
        & .CapsuleTitleCheckFalse{
            color: white;
            background: #FF4300;
        }
    }
`;

const LocationIcon = styled(Icon)`
    color: #FF4300;
`;

export default PostCapsule;