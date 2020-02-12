import React, { useState, useCallback } from 'react';
import PostDetail from './PostDetail';
import styled from 'styled-components';
import { Drawer, Button } from 'antd';

const MyPostClick = () => {
    const [myPost, setMyPost] = useState(true);
    const [visible, setVisible] = useState(true);

    const onClose = useCallback(() => {
        setVisible(false);
    }, []);

    return (
        // <PostDetail myPost={myPost}/>
        <Drawer1
            title="신청 다비너"
            width={600}
            onClose={onClose}
            visible={visible}
            headerStyle={{border: "none"}}
            bodyStyle={{ paddingBottom: 80 }}
        >
        <DrawerForm>
            <div className="contentTop">
                <div className="contentTopFlex">
                    <div className="contentTopMargin">신청인원</div>
                    <div className="contentTopMargin"><span style={{color: "#FF4300"}}>N</span>명</div>
                </div>
                <div className="contentTopMargin">|</div>
                <div className="contentTopFlex">
                    <div className="contentTopMargin">확정인원</div>
                    <div className="contentTopMargin"><span style={{color: "#FF4300"}}>1</span>/2</div>
                </div>
            </div>
        </DrawerForm>
        <div
            style={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e9e9e9',
                padding: '10px 16px',
                background: '#fff',
                textAlign: 'right',
            }}
        >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
            </Button>
            <Button onClick={onClose} type="primary">
                Submit
            </Button>
        </div>
        </Drawer1>
    );
};

const Drawer1 = styled(Drawer)`
    & .ant-drawer-title {
        color: #424242;
        font-size: 40px;
        margin-top: 1vh;
    }
    & .ant-drawer-close {
        font-size: 30px;
    }
`;

const DrawerForm = styled.div`
    display: flex;
    flex-direction: column;
    width: 35vw; 

    & > .contentTop {
        display: flex;
        width: 35vw;

        & > .contentTopFlex {
            display: flex;
        }

        & .contentTopMargin {
            margin-left: 5px;
        }
    }

`;

export default MyPostClick;