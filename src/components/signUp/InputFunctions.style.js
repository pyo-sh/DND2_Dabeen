import styled from 'styled-components';

export const CustomInput = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    & input{
        flex : 1;
        max-width: 420px;
        min-width: 250px;
        margin: 5px;
        padding: 4px 30px 4px 11px;

        border: none;
        border-radius: 0px;
        border-bottom: 1px solid #BFC7CE;
        &::placeholder{
            color: #BFC7CE;
            font-style: italic;
        }
        &:hover, :focus{
            outline: none;
            border: none;
            border-bottom: 1.5px solid #FF9644;
            box-shadow: none;
        }
    }
`;
