import styled from 'styled-components';
import {Button} from 'antd';

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
    /* ::-webkit-scrollbar{display:none;}  스크롤바 안보이게 */
`;

export const Content = styled.div`
    width: 100%;
    max-width: 600px;
    min-width: 300px;
    padding: 30px;
    margin: 60px 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    font-size: 20px;
    color: #424242;
    background: white;
`;

export const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 550px;
    min-width: 250px;
    font-size: 40px;
    margin-bottom: 20px;
`;

export const PostSetting = styled.div`
    width: 100%;
    max-width: 550px;
    min-width: 230px;
    padding: 10px;
    margin-bottom: 20px;

    display: flex;
    flex-direction: column;

    border-radius: 8px;
    background: #F0F0F0;
    font-size: 20px;
`;

export const PostSettingBox = styled.div`
    padding: 5px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    max-width: 550px;
    min-width: 230px;

    & .postSettingTitle {
        min-width: 160px;
    }
    & .postSettingSelect{
        width: 130px;
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
    & .postSettingGetData{
        display: flex;
    }
    & .postSettingDatePicker{
        width: 100%;
        min-width: 100px;
        max-width: 130px;
    }
    & .postSettingTimePicker{
        width: 100%;
        min-width: 90px;
        max-width: 120px;
        margin-left: 10px;
    }
    & .postSettingInput{
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        width: 100%;
        min-width: 100px;
        max-width: 130px;
        height: 32px;
        padding-left: 2px;
        font-size: 15px;
        color: #7a7a7a;
        :hover{
            border-color: #40a9ff;
        }
        :focus{
            outline: none;
        }
        ::placeholder{
            color: #BFC7CE;
        }
    }
    /* input type="number"일 경우 생기는 화살표 제거 */
    & input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export const InputTitle = styled.input`
    border: none;
    color: #7a7a7a;
    font-size: 40px;
    width: 100%;
    max-width: 400px;
    min-width: 250px;
    ::placeholder{
        color: #BFC7CE;
    }

    :focus{
        outline: none;  
    }
`;

export const ContentItem = styled.div`
    width: 100%;
    max-width: 550px;
    min-width: 250px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 25px;

    & > textarea {
        width: 100%;
        max-width: 550px;
        min-width: 250px;
        height: 200px;
        resize: none;
        color: #7a7a7a;
        border-color: #d9d9d9;
        border-radius: 8px;
        font-size: 20px;
        ::-webkit-scrollbar{display:none;}  /*스크롤바 안보이게*/

        ::placeholder{
            color: #BFC7CE;
        }
    }
`;

export const UploadImage = styled.div`
    width: 100%;
    max-width: 550px;
    min-width: 250px;
    font-size: 25px;

    & .uploadImageFlex {
        display: flex;
    }

    & .uploadImageButton {
        border: 1px dashed #BFC7CE;
        border-radius: 5px;
        color: #BFC7CE;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 5px;
        margin-right: 10px;
        padding: 5px;
        width: 120px;
        height: 120px;
        cursor: pointer;
    }
    & input[type="file"] {
        position:absolute;
        width:1px;
        height:1px;
        padding:0;
        margin:-1px;
        overflow:hidden;
        clip:rect(0,0,0,0);
        border:0;
    }

    & .previewImage {
        display: flex;
        margin-top: 5px;

        & .imgBorder{
            width: 120px;
            height: 120px;
            border: 1px solid #BFC7CE;
            border-radius: 4px;
            margin-right: 10px;

            & .deleteIcon{
                font-size: 12px;
                text-align: right;
                margin-left: 5px;
            }
        }

        & img{
            margin-left: 15px;
            margin-bottom: 10px;
        }
    }
`;

export const UploadButton = styled(Button)`
    width: 200px;
    height: 45px;
    margin-top: 20px;
    margin-bottom: 20px;
    background: #FF4300;
    border: #FF4300;
    color: white;
    font-size: 20px;
    box-shadow: 2px 3px 5px #BFC7CE;

    :hover {
        opacity: 0.9;
        background: #FF4300;
        border: #FF4300;
        color: white;
    }

    :focus{
        background: #FF9644;
        border: #FF9644;
        color: white;
    }
`;