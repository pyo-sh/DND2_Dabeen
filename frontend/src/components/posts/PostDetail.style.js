import styled from 'styled-components';
import Slick from "react-slick";

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

export const Content = styled.div`
    width: 100vw;
    max-width: 680px;
    min-width: 300px;
    padding: 30px;
    margin: 60px 0;
    border-radius : 5px;

    display: flex;
    flex-direction: column;
    align-items: center;

    font-size: 20px;
    color: #424242;
    background: white;
    box-shadow: 0 0 10px 4px #7A7A7A;

    & .PostTitleDetailAuthor, .ContentMapLocation, .ApplicationMoneyTitleValue{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const Icons = styled.div`
    display: flex;
    text-align: right;
    font-size: 25px;
    color: #BFC7CE;
`;

export const Title = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 40px;

    & .PostTitle {
        display: flex;
        flex-direction: column;
        font-weight: bold;
    }
    & .TitleWrapper{
        width: 100%;
        display: flex;
        justify-content: space-between;
        
    }
    & .PostTitleDetail{
        width: 100%;

        display: flex;
        justify-content: space-between;

        font-size: 15px;
        & .PostTitleDetailContent{
            min-width: 140px;
            display: flex;
            flex-wrap: wrap;
            & .PostTitleDetailDate{
                margin-top: 5px;
                min-width: 140px;
                margin-right: 10px;
            }
            & .PostTitleDetailAuthor{
                margin-top: 5px;
                min-width: 140px;
            }
        }
        & .PostTitleDetailBtn{
            display: flex;
            justify-content: flex-end;
            flex-wrap: wrap-reverse;
        }
    }
`;

export const DetailSlick = styled(Slick)`
    width: 100%;
    margin-top: 20px;
    display: flex;
    align-items: center;
    border-radius: 3px;
    box-shadow: 0 0 10px 3px #E9E9E9;
    
    /* width : -webkit-calc(100% - 40px); */
    & .PostDetailImage{
        width: 100%;
        height: 45vw;
        max-height: 300px;
    }
    & .slick-next, .slick-prev {
        display : block;
        background : white;
        &::before {
            color : #424242;
            /* line-height : 10px; */
            font-size : 30px;
        }
    }
    & .slick-prev {
        &::before {
            content : "<";
        }
    }
    & .slick-next{
        &::before{
            content : ">";
        }
    }
    & .slick-dots li button::before {
        content : ""
    }
`;

export const ApplyCheck = styled.div`
    width: 60px;
    height: 25px;
    padding: 2px;
    margin: 5px 0 0 5px;

    font-size: 14px;
    text-align: center;
    color: ${props => (props.apply ? "#7A7A7A" : "white")};
    background: ${props => (props.apply ? "#F0F0F0" : "#FF4300")};
    border-radius: 10px;
`;

export const EditTitle = styled.input`
    border: none;
    color: #7a7a7a;
    font-size: 40px;
    width: 100%;
    max-width: 500px;
    
    :focus{
        outline: none;  
    }
`;

export const Edit = styled.button`
    min-width: 60px;
    height: 25px;  
    margin: 5px 0 0 5px;

    font-size: 14px;
    color: #7A7A7A;
    background: #F0F0F0;  
    border: 1px solid #F0F0F0;
    border-radius: 7px;
    cursor: pointer;

    :focus{
        outline: none;
    }

    :hover{
        opacity: 0.7;
    }
`;

export const ApplicationInfo = styled.div`
    width: 100%;
    margin-top: 20px;

    display: flex;
    justify-content: space-between;

    & .ApplicationInfoBoxWrapper{
        display: flex;
        flex-direction: column;
    }
    
    & .ApplicationMoney{
        width: 100%;
        max-width: 250px;
        min-width: 120px;
        padding-left: 20px;
        margin-left: 20px;

        display: flex;
        flex-direction: column;
        justify-content:flex-end;

        color: #FF4300;
        font-size: 20px;
        border-left: 1px solid #BFC7CE;
        

        & .ApplicationMoneyTitle{
            display: flex;
            padding: 5px;
            font-size: 20px;
        }
        & input{
            border: none;
            width: 120px;
            font-size: 25px;

            &:hover, :focus{
                border: none;
                outline: none;
            }
        }
        @media screen and (max-width: 350px) {
             padding-left: 10px;
             margin-left: 10px;
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
    & .ant-time-picker {
        width: 100px;
        & .ant-time-picker-icon {
            display: none;
        }
    }
`;
export const ApplicationInfoBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    & .ApplyCheck{
        width: 83px;
        border: none;
        background: none;
        color: #7A7A7A;
        cursor: pointer;

        :focus{
            outline: none;
        }
    }
    & .ApplicationInfoBoxTitle {
        height: 38px;
        min-width: 120px;
        display: flex;
        align-items: center;
    }
    & .ApplicationInfoBoxDetail{
        min-height: 38px;
        margin-left: 20px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        font-size: 18px;
        & .ApplicationInfoBoxDetailDate{
            margin-right: 5px;
        }
    }
    & .ApplicationInfoBoxDatePicker{
        width: 100px;
        margin-right: 5px;
        & input:read-only:hover {
            border: 1px solid #FF4300;
        }
    }
    & .ApplicationInfoBoxTimePicker{
        width: 100px;
        & input:hover {
            border: 1px solid #FF4300;
        }
    }
    & .ant-select-arrow{
      color: #FF4300;
    }
    & .ant-calendar-picker-icon{
        color: #FF4300;
    }
    & .ant-time-picker-clock-icon{
        color: #FF4300; 
    }
`;

export const DeadlineButton = styled.button`
    background: ${props => (props.apply ? "#F0F0F0" : "#FF9644")};
    border: ${props => (props.apply ? "#F0F0F0":"#FF4300")};
    color: ${props => (props.apply ? "#7A7A7A" : "white")};
    font-size: 14px;
    border-radius: 5px;
    box-shadow: 2px 3px 5px #BFC7CE;
    width: 100%;
    height: 35px;

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
    width: 100%;
    margin-top: 20px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    font-size: 25px;

    & .ContentTitle{
        margin-bottom: 10px;
    }

    & .ContentMapWrapper{
        width: 100%;
        border: 1px solid #BFC7CE;
        border-radius: 3px;
        box-shadow: 0 0 10px 3px #E9E9E9;
        & .ContentMap{
            height: 200px;
            padding: 0 1px;
        }
        & .ContentMapInfo{
            padding: 10px 15px;
            border-top: 1px solid #BFC7CE;
            & .ContentMapLocation{
                font-size: 18px;
                padding-left: 5px;
            }
        }
    }

    & > p {
        width: 100%;
        padding: 10px;
        border: 1px solid #BFC7CE;
        border-radius: 5px;
        box-shadow: 0 0 10px 3px #E9E9E9;
        font-size: 18px;
    }
    & > textarea {
        width: 100%;
        resize: none;
        color: #7a7a7a;
        border-color: #d9d9d9;
        ::-webkit-scrollbar{display:none;}  /*스크롤바 안보이게*/
        ::placeholder{
            color: #BFC7CE;
        }
    }
`;

function SampleNextArrow(props) { // 우 화살표
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style}}
            onClick={onClick}
        />
    );
  };

function SamplePrevArrow(props) { // 좌 화살표
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style}}
            onClick={onClick}
        />
    );
  }

export const slickSetting = {
    initialSlide : 0,
    dots : false,
    autoplay : false,
    infinite : true,
    nextArrow : <SampleNextArrow/>,
    prevArrow : <SamplePrevArrow/>,
}