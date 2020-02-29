import styled from 'styled-components';

export const MainForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width : 100%;
    margin-top: -2vh;
    overflow-x: hidden;
    & .ant-carousel {
        width : 100%;
        height : 35vw;
        min-height: 250px;
        & img {
            width : 100%;
            height : 35vw;
            min-height: 250px;
        }
        & .slick-dots li button::before {
            content : ""
        }
    }
    & > .mainImage {
        border: solid 1px gray;
        width: 90%;
        margin-top: 30px;
        text-align: center;
        padding : 24px;
    }
    & .LiveHelpRequestTitle, .MainDaBeenerProfileTitle{
        color: #424242;
        font-size : 48px;
        margin: 0;
        text-align: center;
        @media only screen and (max-width: 425px){
            font-size : 32px;
        }
    }
    padding-bottom: 3vw;

    & .LiveHelpRequestWrapper{
        width: 100%;
        margin-top: 5vw;
        padding: 20px;
        box-shadow: 0 0px 5px 3px #BFC7CE;

        display: flex;
        flex-direction: column;
        align-items: center;
    }
    & .MainDaBeenerProfileWrapper{
        width: 100%;
        margin-top: 5vw;
        padding: 30px;
        /* box-shadow: 0 0px 5px 0.5px #BFC7CE; */

        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export const LiveHelpRequestMenuBar = styled.div`
    width: 100vw;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    & .LiveHelpRequestForm {
        width: 20vw;
        min-width : 150px;
        height: 45px;
        margin-right: 50px;
        margin-top: -45px;

        align-self: flex-end;
        display: flex;
        justify-content: space-around;
        align-items: flex-end;

        @media only screen and (max-width: 767px){
            align-self: center;
            margin: 0;
        }
    }
    & div[name=${props=> props.selectLiveMenu}] {
        color : #FF4300;
    }

    & .LiveHelpRequest {
        /*선택시 색상 변경되게*/
        font-size: 30px;
        cursor: pointer;
        transition : color 0.3s;
        :hover{
            color: #FF4300;
        }

        @media only screen and (max-width: 1024px){
            font-size: 20px;
        }
    }
`;