import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Button, Icon } from 'antd';

//내가 작성한 도움글 클릭시 myPost = true를 받아옴
const PostDetail = ({myPost}) => {
    
    return (
        <Modal>
            <ContentForm>
                <Content>     
                    <DeleteIcon>
                        <Icon type="close" />
                    </DeleteIcon>
                    <Title>
                        <div style={{fontSize: 40}}>제목</div>
                        <div className="titleDetail">
                            <div>작성일 : 2020.02.10</div>
                            <div>작성자 : ysje</div>
                        </div>
                    </Title>
                    <Image>사진사진사진사진사진사진사진</Image>
                    <ApplicationInfo>
                        <div className="applicationInfoText">
                            <div className="applicationInfoTextTitle">
                                <div>신청인원</div>
                                <div>신청 마감 일시</div>
                                <div>수행 일시</div>
                            </div>
                            <div className="applicationInfoTextDetail">
                                {
                                    myPost ? 
                                    <div style={{display: "flex"}}><div>0/1</div><Button type="link" style={{color: "#7A7A7A"}} size="small">신청 확인</Button></div> 
                                    :
                                    <div>0/1</div>  /**여기서 0은 강조색으로하기 */  
                                }
                                <div>2020-03-08</div>
                                <div>2020-03-08, PM 06:19</div>
                            </div>
                        </div>
                        <div className="applicationMoney">
                            <div>3000원</div>
                            {
                                myPost ? 
                                <ClickButton>수정</ClickButton> :
                                <ClickButton apply>신청</ClickButton>
                            }
                        </div>
                    </ApplicationInfo>
                    <ContentItem>
                        <div style={{fontSize: 22}}>위치</div>
                        <div style={{border: "solid", width: 550, height: 300}}>지도지도지도지도지도지도지도지도지도</div>
                    </ContentItem>
                    <ContentItem>
                        <div style={{fontSize: 22}}>도움정보</div>
                        <p>
                            못 잘 박을 수 있는 망치가 필요합니다.<br/>
                            거기에다가 빌려주시는 분이 망치질을 잘 하셨으면 좋겠습니다.
                        </p>
                    </ContentItem>
                </Content>
            </ContentForm>
        </Modal>
    );
};

const Modal = styled.div`
    background: rgba(0, 0, 0, 0.25);
    position: fixed;
    left: 0;
    top: 30px;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ContentForm = styled.div`
    font-size: 20px;
    color: #424242;
    background: white;
    padding: 1rem;
    width: 33vw;
    height: 87vh;
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: auto;
    ::-webkit-scrollbar{display:none;}  /*스크롤바 안보이게*/
`;

const DeleteIcon = styled.div`
    text-align: right;
    margin-top: 20px;
    font-size: 25px;
    color: #BFC7CE;
`;

const Content = styled.div`
    width: 29vw;
    height: 87vh;
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 29vw;

    & > .titleDetail{
        display: flex;
        justify-content: space-between;
        width: 265px;
    }
`;

const Image = styled.div`
    width: 29vw;
    height: 30vh;
    background: #BFC7CE;
`;

const ApplicationInfo = styled.div`
    display: flex;
    justify-content: space-between;
    width: 29vw;
    margin-top: 20px;

    & .applicationInfoText {
        display: flex;
        justify-content: space-between;
        border-right: 1px solid #BFC7CE;
    }

    & .applicationInfoTextTitle {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 8vw;
        font-size: 22px;
    }

    & .applicationInfoTextDetail {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 8vw;
        font-size: 16px;
    }

    & .applicationMoney{
        display: flex;
        flex-direction: column;
        width: 12vw;
        justify-content:flex-end;
        color: #FF4300;
        font-size: 35px;
    }
`;

const ClickButton = styled(Button)`
    background: ${props => (props.apply ? "#FF4300" : "#F0F0F0")};
    border: ${props => (props.apply ? "#FF4300" : "#F0F0F0")};
    color: ${props => (props.apply ? "#FFFFFF" : "#7A7A7A")};
    font-size: 20px;
    box-shadow: 2px 3px 5px #BFC7CE;
    width: 10vw;

    :hover {
    opacity: 0.9;
    background: ${props => (props.apply) ? "#FF4300" : "#F0F0F0"};
    border: ${props => (props.apply) ? "#FF4300" : "#F0F0F0"};
    color: ${props => (props.apply ? "#FFFFFF" : "#7A7A7A")};
    }
`;

const ContentItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 20px;
    margin-top: 30px;

    & > p{
        margin-top: 10px;
        font-size: 18px;
    }
`;

export default PostDetail;