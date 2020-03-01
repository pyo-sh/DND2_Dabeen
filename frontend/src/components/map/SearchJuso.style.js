import styled from 'styled-components';

export const Search = styled.div`
    width: 100%;
    /* & .inputAddress {
        margin-bottom: 1vh;
        & input{
            width: 72%;
            flex : 1;
            max-width: 300px;
            min-width: 250px;
            margin: 5px;
            padding: 4px 30px 4px 11px;
        border: 1px solid #BFC7CE;
        border-radius: 3px;
        }
    } */
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

            @media screen and (max-width:425px){
                width: 260px;
            }
            border: none;
            border-radius: 0px;
            border-bottom: 1px solid #BFC7CE;
            &::placeholder{
                color: #BFC7CE;
            }
            &:focus {
                outline: none;
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