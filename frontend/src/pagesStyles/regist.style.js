import styled from 'styled-components';
import { Icon, Button } from 'antd';

export const RegistSupplierUpperDiv = styled.div`
    margin: 20px auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    max-width: 680px;
    min-width: 300px;


    & .RegistSupplierTitle{
        width: 100%;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        font-weight: bold;

        & .RegistSupplierTitleMain{
            font-size: 45px;
        }
        & .RegistSupplierTitleSub{
            font-size: 25px;
        }
    }
    & .RegistSupplierContent{
        width: 100%;
        padding: 25px;
        margin-top: 10px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        border: 1px solid #d9d9d9;
        border-radius : 5px;
        box-shadow: 0 0 10px 3.2px #E9E9E9;
    }
`

export const RegistSupplierLowerDiv = styled.div`
    width: 100%;
    margin: 10px 0;
    & .RegistSupplierLowerTitle{
        padding-bottom: 8px;
        font-size: 28px;
        font-weight: bold;
    }
    & .RegistSupplierLowerScript{
        padding: 0 0 20px 8px;
        border-bottom: 1px solid #d9d9d9;
        margin-bottom: 20px;
        font-size: 20px;
        border-radius : 8px;
    }
    & .RegistSupplierLowerScriptFirst{
        font-size: 20px;
        padding-left: 8px;
    }
    & .RegistSupplierLowerDetailDescription{
        border-radius: 8px;
        padding: 13px 18px;
        margin-bottom: 10px;
        font-size: 18px;
        background: #F0F0F0;

        & .RegistSupplierLowerDetailWarning{
            color: #FF4400;
            font-size: 14px;
            padding: 10px 0 3px 0;
        }
        & .RegistSupplierLowerDetailIcon{
            display: flex;
            align-items: center;
            padding: 12px;
        }
        & .RegistSupplierLowerDetailExample{
            color: #FF4400;
            font-size: 18px;
            padding: 10px 0 3px 0;
        }
        & .RegistSupplierLowerDetailExampleImage{
            width: 100%;
            max-width: 350px;
            min-width: 230px;
            height: 100%;
            max-height: 225px;
        }
    }
    & .RegistSupplierLowerImageUpload{
        width: 100%;
        padding: 10px;
        & .RegistNowUserProfileImage{
            font-size: 20px;
            padding-bottom: 10px;
            font-weight: bold;
        }
        & .RegistSupplierLowerImage{
            border-radius: 50%;
            width: 150px;
            height: 150px;
            margin-left: -2px;
            margin-top: -2px;
        }
        & .RegistSupplierLowerImageChange{
            width: 148px;
            height: 148px;
            border-radius: 50%;
            & span{
                padding: 0;
            }
        }
        & .RegistSupplierLowerImageIcon{
            width: 50px;
            cursor: pointer;
            margin-left: 50px;
            margin-right: -50px;
            margin-top: -50px;
        }
    }
    & .RegistSupplierLowerJuminUpload {
        & .RegistSupplierLowerImage{
            border-radius: 10px;
            width: 400px;
            height: 180px;
            margin-left: -2px;
            margin-top: -2px;
            text-align : center;
            line-height : 180px;
            & .uploadIcon {
                font-size: 20px;
                margin-right : 10px;
            }
        }
        & .RegistSupplierLowerImageChange{
            width: 400px;
            height: 180px;
            border-radius: 10px;
            & span{
                padding: 0;
            }
        }
        }
`;

export const UploadProfile = styled.div`
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        /* max-width: 600px;
        min-width: 280px; */

    & .ModifyUserProfile{
            border: 1px solid #BFC7CE;
            border-radius: 50%;
            width: 150px;
            height: 150px;
        }
      
     & .ModifyUserProfileChangeIcon {
            width: 50px;
            cursor: pointer;
            margin-left: 50px;
            margin-right: -50px;
            margin-top: -50px;
        }
`;
export const Icons = styled(Icon)`
    z-index: 0;
    font-size: 50px;
    padding-right: 5px;
    margin-left: -50px;
    color: #FF4300;
`;
export const Images = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;
export const RegistButton = styled(Button)`
    width : 200px;
    height: 40px;
    border-radius : 5px;
    margin-top: 30px;
    color: white;
    background: #ff4300;
    transition : 0.3s;
    &:hover, :focus {
        background : rgba(255,67,0,0.9);
        outline : none;
        color : white;
        border: none;
        box-shadow : none;
    }
`;

export const UploadImage = styled.div`
    width: 100%;
    font-size: 25px;

    & .uploadImageFlex {
        display: flex;
        align-items: center;
        justify-content: center;
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
        width: 350px;
        height: 200px;
        cursor: pointer;
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
    & .UploadRegistTitle{
        width: 100%;
        text-align: center;
        font-size: 20px;
        padding-top: 10px;
        font-weight: bold;
    }
`;