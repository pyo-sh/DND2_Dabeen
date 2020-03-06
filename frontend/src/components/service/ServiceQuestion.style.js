import styled from 'styled-components';
import {Modal} from 'antd';

export const CustomModal = styled(Modal)`
    & .ant-modal-header div {
        font-size: 25px;
    }
    & .submit {
        background : #FF4300;
        border : none;
        color : white;
        transition : 0.3s;
        &:hover, :focus {
            background : rgba(255,67,0,0.8);
        }
    }
    & .cancel:hover{
        color : #FF4300;
        border : 1px solid #FF4300;
    }
    & input:focus, input:hover {
        border : 1px solid #FF4300;
        box-shadow : none;
    }
    & textarea {
        margin-top: 15px;
        width : 100%;
        height: 20vh;
        border-radius: 5px;
        border: 1px solid #E1E1E1;
    }
    & textarea:focus, textarea:hover {
        border : 1px solid #FF4300;
        outline : none;
    }
`;
