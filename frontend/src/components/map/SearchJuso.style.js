import styled from 'styled-components';

export const Search = styled.div`
    width: 100%;

    & .inputAddress {
        margin-bottom: 1vh;
        & input{
            width: 72%;
            flex : 1;
            max-width: 300px;
            min-width: 250px;
            margin: 5px;
            padding: 4px 30px 4px 11px;

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
    }
`;