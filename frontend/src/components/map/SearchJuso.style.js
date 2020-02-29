import styled from 'styled-components';

export const Search = styled.div`
    width: 100%;
    & .inputAddress {
        margin-bottom: 1vh;
    }
    & .ant-input {
        width: 100%;
        max-width: 300px;
        min-width: 150px;
        margin-right: 0.5vw;

        & :hover, :focus{
          border: 1px solid #d9d9d9;
          box-shadow: none;
        }
    }

    & .ant-btn {
        width: 100px;
        background: #FF4300;
        border: 1px solid #FF4300;
        color: #FFFFFF;
        font-size: 15px;

        &:hover, :focus {
            opacity: 0.9;
            background: #FF4300;
            border: 1px solid #FF4300;
            color: #FFFFFF;
        }
    }

    & .content {
        width: 100%;
        max-width: 550px;
        min-width: 250px;
        height: 200px;
    }
`;