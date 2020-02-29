import styled from 'styled-components';

export const Modal = styled.div`
    width: 100%;
    height: 100%;
    z-index: 1;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    background: rgba(0, 0, 0, 0.25);
    overflow: auto;
`;

export const Icons = styled.div`
    text-align: right;
    font-size: 25px;
    color: #BFC7CE;
`;

export const Content = styled.div`
    width: 100%;
    max-width: 600px;
    min-width: 300px;
    padding: 30px;
    margin: 60px 0;
    border-radius : 12px;

    display: flex;
    flex-direction: column;
    align-items: center;

    font-size: 20px;
    color: #424242;
    background: white;
`;

export const Title = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 550px;
    min-width: 250px;
    font-size: 40px;
    margin-top: 15px;

    & .postTitle {
        display: flex;
        align-items:flex-end;
    }
    & .TitleWrapper{
        width: 100%;
        display: flex;
        justify-content: space-between;
        
    }
    & .titleDetail{
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 400px;
        font-size: 15px;
        margin-top: 5px;
    }
`;

export const ApplyCheck = styled.div`
    min-width: 60px;
    height: 25px;
    padding: 2px;
    border-radius: 10px;
    margin: 10px 10px 2px 10px;

    font-size: 14px;
    text-align: center;

    color: ${props => (props.apply ? "#7A7A7A" : "white")};
    background: ${props => (props.apply ? "#F0F0F0" : "#FF4300")};
`;

export const EditTitle = styled.input`
    border: none;
    color: #7a7a7a;
    font-size: 40px;
    width: 100%;
    max-width: 400px;
    
    :focus{
        outline: none;  
    }
`;

export const Edit = styled.button`
    background: #F0F0F0;  
    border: 1px solid #F0F0F0;
    border-radius: 7px;
    color: #7A7A7A;
    min-width: 60px;
    height: 25px;  
    font-size: 14px;
    cursor: pointer;

    :focus{
        outline: none;
    }

    :hover{
        opacity: 0.7;
    }
`;

export const Image = styled.div`
    width: 100%;
    max-width: 550px;
    min-width: 250px;
    height: 300px;
    background: #BFC7CE;
    margin-top: 10px;
`;

export const ApplicationInfoBox = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    @media screen and (max-width : 500px){
        width : 150px;
    }

    & .applyCheck{
        border: none;
        background: none;
        color: #7A7A7A;
        cursor: pointer;

        :focus{
            outline: none;
        }
    }
    & .applicationInfoBoxTitle {
        width: 200px;
        padding-left: 10px;
    }
    & .applicationInfoBoxDetail{
        width: 170px;
        font-size: 15px;
        padding-left: 10px;
    }  
`;

export const ApplicationInfo = styled.div`
    width: 100%;
    max-width: 550px;
    min-width: 300px;
    height: auto;
    margin-top: 20px;
    
    & .applicationMoney{
        display: flex;
        flex-direction: column;
        justify-content:flex-end;
        color: #FF4300;
        font-size: 20px;
        min-width: 80px;

        & div {
            text-align : center;
        }
        & input{
            border: none;
            width: 120px;
            font-size: 16px;
        }
        @media screen and (max-width:500px) {
            margin-right : 20px;
        }
    }

    & .needPersonnel {
        font-size: 16px;
        border: none;
        width: 50px;
    }

    & .ant-calendar-picker {
        width: 100px;

        & .ant-calendar-picker-icon {
            display: none;
        }
    }
`;

export const DeadlineButton = styled.button`
    background: ${props => (props.apply ? "#F0F0F0" : "#FF4300")};
    border: ${props => (props.apply ? "#F0F0F0":"#FF4300")};
    color: ${props => (props.apply ? "#7A7A7A" : "white")};
    font-size: 14px;
    border-radius: 5px;
    box-shadow: 2px 3px 5px #BFC7CE;
    width: 100%;
    max-width: 120px;
    min-width: 100px;
    height: 30px;

    :hover {
        opacity: 0.9;
        background: ${props => (props.apply ? "#F0F0F0" : "#FF4300")};
        border: ${props => (props.apply ? "#F0F0F0":"#FF4300")};
        color: ${props => (props.apply ? "#7A7A7A" : "white")};
        cursor: pointer;
    }
    
    :focus{
        outline: none;
    }
`;

export const ContentItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 25px;
    margin-top: 35px;
    width: 100%;
    max-width: 550px;
    min-width: 250px;

    & > p{
        margin-top: 10px;
        font-size: 18px;
        max-width: 550px;
        min-width: 300px;
        height: 200px;
    }

    & .map{
        width: 100%;
        max-width: 550px;
        min-width: 300px;
        height: 200px;
        font-size: 20px;
    }

    & > textarea {
        width: 100%;
        max-width: 550px;
        min-width: 250px;
        height: 200px;
        resize: none;
        color: #7a7a7a;
        border-color: #d9d9d9;
        ::-webkit-scrollbar{display:none;}  /*스크롤바 안보이게*/

        ::placeholder{
            color: #BFC7CE;
        }
    }
`;