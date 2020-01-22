import React from 'react';
import styled from 'styled-components';
import { Select, Row, Col } from 'antd';

const PostWriteForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    /* top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */

    & > .postCategory {
        display: flex;
        align-items: center;
    }
`;

const PostWrite = () => {
    return (
        <PostWriteForm>
            <Row>
                <Col span={8}>카테고리</Col>
                <Col span={8} offset={8}>
                    <Select defaultValue="작업" style={{width: 150}}>
                        <Select.Option value="작업">작업</Select.Option>
                        <Select.Option value="심부름">심부름</Select.Option>
                        <Select.Option value="대여">대여</Select.Option>
                    </Select>
                </Col>
                <Col span={8}>시간</Col>
            </Row>
        </PostWriteForm>
    );
};

export default PostWrite;