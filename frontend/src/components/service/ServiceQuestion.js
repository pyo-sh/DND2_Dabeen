import React, {useState, useCallback, memo} from 'react';
import { Modal, Button, Input } from 'antd';
import {CustomModal} from './ServiceQuestion.style';
import inputChangeHook from '../../hooks/inputChangeHook';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestionRequestAction } from '../../reducers/questions';
import { getCookie } from '../../utils/cookieFunction';
// 문의하기 모달!

const ServiceQuestion = memo(({visible, setVisible}) => {
    const dispatch = useDispatch();
    const { me : {userNum}} = useSelector(state => state.user);
    const [question, onChangeQuestion, setQuestion] = inputChangeHook('');
    const [title, onChangeTitle, setTitle] = inputChangeHook('');

    const handleOk = useCallback((e) => {
        e.preventDefault();
        setQuestion('');
        setTitle('');
        dispatch(addQuestionRequestAction({userNum, title, question, cookie : getCookie()}))
        setVisible(prev => !prev); // 이 때 문의사항을 보내야함!!
    }, [title, question, userNum]);
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
});

export default ServiceQuestion;