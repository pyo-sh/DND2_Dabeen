import styled from 'styled-components';

export const FooterBox = styled.div`
    margin-top: auto;
    border-top : 1px solid #BFC7CE;
    height : 2.5rem;
    width : 100%;
    margin-top : 30px;
    padding : 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & a {
        color : darkgray;
        & :hover {
            color : #ff4300;
        }
    }
    & > .mainBottomContent {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 15vw;
        font-size: 15px;
    }
`;