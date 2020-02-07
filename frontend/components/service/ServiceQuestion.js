import React, {useState, useCallback} from 'react';
import { Modal, Button, Input } from 'antd';
import styled from 'styled-components';
// 문의하기 모달!
const CustomModal = styled(Modal)`
    & .ant-modal-header div {
        font-size: 25px;
    }
    & .submit {
        background : tomato;
        color : white;
    }
    & .cancel:hover{
        color : tomato;
        border : 1px solid tomato;
    }
    & input:focus {
        border : 1px solid tomato;
        box-shadow : none;
    }
    & textarea {
        margin-top: 15px;
        width : 100%;
        height: 20vh;
    }
    & textarea:focus {
        outline-color:tomato;
    }
`;

const ServiceQuestion = ({visible, setVisible}) => {
    const [question, setQuestion] = useState('');
    const [title, setTitle] = useState('');

    const onChangeTitle = useCallback((e) => {
        setTitle(e.target.value);
    }, []);

    const onChangeText = useCallback((e)=> {
        setQuestion(e.target.value);
    }, []);
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
            <textarea value={question} onChange={onChangeText}/>
            <div>문의사항에 대한 답변은 1~2일정도 소요됩니다.</div>
        </CustomModal>
    );
};

export default ServiceQuestion;