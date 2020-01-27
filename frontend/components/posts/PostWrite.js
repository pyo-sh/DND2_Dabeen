import React from 'react';
import styled from 'styled-components';
import { Select, Calendar, TimePicker, Input, Upload, message, Icon, Button } from 'antd';

const format = 'HH:mm';

const PostWriteForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const PostItem = styled.div`
    display: flex;
    justify-content: space-between;
    width: 25vw;
    margin-bottom: 2vh;

    & > .flexItem {
        flex: none;
        width: 6vw;
    }

    & > .flexItemInput {
        margin-right:auto;
    }
`;


const PostWrite = () => {

    return (
        <PostWriteForm>
            <PostItem>
                <div className = "flexItem">카테고리</div>
                <div className = "flexItemInput">
                <Select defaultValue="작업" style={{width: 150}}>
                    <Select.Option value="작업">작업</Select.Option>
                    <Select.Option value="심부름">심부름</Select.Option>
                    <Select.Option value="대여">대여</Select.Option>
                </Select>
                </div>
            </PostItem>
            <PostItem>
                <div className = "flexItem">시간</div>
                <div className = "flexItemInput"><TimePicker format={format} style={{width: 150}}/></div>
            </PostItem>
            <PostItem>
                <div className = "flexItem">마감일</div>
            </PostItem>
            <PostItem>
                <div className = "flexItem">금액</div>
                <div className = "flexItemInput"><Input style={{width: 150}} placeholder="금액을 입력하세요."/></div>
            </PostItem>
            <PostItem>
                <div className = "flexItem">희망 공급자 수</div>
                <div className = "flexItemInput"><Input style={{width: 150}} placeholder="최대 99명까지 입력 가능"/></div>
            </PostItem>
            <PostItem>
                <div className = "flexItem">위치</div>
                <div className = "flexItemInput">시/군/구</div>
            </PostItem>
            <PostItem>
                <div className = "flexItem">요구사항</div>
                <div className = "flexItemInput"><Input.TextArea rows={6} style={{width: 400}}/></div>
            </PostItem>
            <PostItem>
                <div className = "flexItem">사진첨부</div>
                <div className = "flexItemInput">
                    <Upload>
                        <Button><Icon type="upload"/>Upload</Button>
                    </Upload>
                </div>
            </PostItem>
            <Button style={{width: 250, marginTop: 30, background: "gray", border: "gray"}} type="primary">작성 완료</Button>
        </PostWriteForm>
    );
};

export default PostWrite;