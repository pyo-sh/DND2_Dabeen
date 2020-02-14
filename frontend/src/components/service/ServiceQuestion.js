import React, {useState, useCallback} from 'react';
import { Modal, Button, Input } from 'antd';
import styled from 'styled-components';
import inputChangeHook from '../../hooks/inputChangeHook';
// 문의하기 모달!

const ServiceQuestion = ({visible, setVisible}) => {
    const [question, onChangeQuestion] = inputChangeHook('');
    const [title, onChangeTitle] = inputChangeHook('');

    const handleOk = useCallback((e) => {
        e.preventDefault();
        setVisible(prev => !prev); // 이 때 문의사항을 보내야함!!
    }, []);
    const handleCancel = useCallback(() => {
        setVisible(prev => !prev);
    }, []);
    return (
        <CustomModal 
            visible={visible}
            title="문의하기"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button className="submit" key="submit" type="primary" onClick={handleOk}>문의하기</Button>,
                <Button className ="cancel" key="back" onClick={handleCancel}>취소</Button>
            ]}
        >
            <Input placeholder= "제목을 입력하세요." onChange={onChangeTitle} value={title}/>
            <textarea value={question} onChange={onChangeQuestion}/>
            <div>문의사항에 대한 답변은 1~2일정도 소요됩니다.</div>
        </CustomModal>
    );
};

const CustomModal = styled(Modal)`
    & .ant-modal-header div {
        font-size: 25px;
    }
    & .submit {
        background : #FF4300;
        color : white;
    }
    & .cancel:hover{
        color : #FF4300;
        border : 1px solid #FF4300;
    }
    & input:focus {
        border : 1px solid #FF4300;
        box-shadow : none;
    }
    & textarea {
        margin-top: 15px;
        width : 100%;
        height: 20vh;
    }
    & textarea:focus {
        outline-color:#FF4300;
    }
`;

export default ServiceQuestion;