import React from 'react';
import styled from 'styled-components';
import { Divider, Avatar } from 'antd';

const LiveHelpRequestForm = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
`;

const LiveHelpRequestContent = styled.div`
    border: solid 1px gray;
    border-radius: 5px;
    min-width: 300px;
    min-height: 150px;
    
    & > .liveHelpRequestUserInfo {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: -37px;
        margin-left: -30px;
        margin-bottom: 5px;
    }

    & .liveHelpRequestID {
        color: black;
        margin-right: 8px;
    }

    & .liveHelpRequestNickname {
        color: darkgray;
        font-size: 11px;
    }
`;

const LiveHelpRequest = () => {
    return (
        <LiveHelpRequestForm>
            <LiveHelpRequestContent>
                이거 디자인한 사람 누군데 당장 나온나.
                <Divider orientation="left" style={{marginTop: '15vh'}}><Avatar size={55} icon="user"/></Divider>
                <div className="liveHelpRequestUserInfo">
                    <div className="liveHelpRequestID">아이디</div>
                    <div className="liveHelpRequestNickname">@닉네임</div>
                </div>
            </LiveHelpRequestContent>
            <LiveHelpRequestContent>
                이거 디자인한 사람 누군데 당장 나온나.
                <Divider orientation="left" style={{marginTop: '15vh'}}><Avatar size={55} icon="user"/></Divider>
                <div className="liveHelpRequestUserInfo">
                    <div className="liveHelpRequestID">아이디</div>
                    <div className="liveHelpRequestNickname">@닉네임</div>
                </div>
            </LiveHelpRequestContent>
            <LiveHelpRequestContent>
                이거 디자인한 사람 누군데 당장 나온나.
                <Divider orientation="left" style={{marginTop: '15vh'}}><Avatar size={55} icon="user"/></Divider>
                <div className="liveHelpRequestUserInfo">
                    <div className="liveHelpRequestID">아이디</div>
                    <div className="liveHelpRequestNickname">@닉네임</div>
                </div>
            </LiveHelpRequestContent>
        </LiveHelpRequestForm>
    );
};

export default LiveHelpRequest;