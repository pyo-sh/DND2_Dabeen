import styled from 'styled-components';

export const Search = styled.div`
    width: 100%;
    border: 1px solid #BFC7CE;
    border-radius: 3px;
    & .SearchJusoInputAddress {
        display: flex;
        align-items: center;
        padding: 20px 15px;
        border-top: 1px solid #BFC7CE;
        @media screen and (max-width:385px) {
            padding: 20px 5px;
        }
    }
    & .ant-input {
        width: 100%;
        max-width: 300px;
        min-width: 140px;
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

    & .SearchJusoContent {
        width: 100%;
        padding: 0 1px;
        height: 200px;
    }
`;