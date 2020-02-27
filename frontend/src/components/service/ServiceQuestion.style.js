import styled from 'styled-components';
import {Modal} from 'antd';

export const CustomModal = styled(Modal)`
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
