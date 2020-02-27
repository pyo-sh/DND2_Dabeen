import styled from 'styled-components';
import { Icon, Button } from 'antd';

export const RegistSupplierUpperDiv = styled.div`
    margin: 20px auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    max-width: 600px;
    min-width: 320px;

    & .RegistSupplierTitle{
        width: 100%;

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
        padding: 40px 25px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        border: 1px solid #d9d9d9;
    }
`

export const RegistSupplierLowerDiv = styled.div`
    width: 100%;
    margin: 10px 0;
    & .RegistSupplierLowerTitle{
        padding-bottom: 10px;
        font-size: 28px;
        font-weight: bold;
    }
    & .RegistSupplierLowerScript{
        padding-top: 5px;
        padding-bottom: 20px;
        border-bottom: 1px solid #d9d9d9;
        margin-bottom: 20px;
        font-size: 20px;
    }
    & .RegistSupplierLowerDetailDescription{
        border-radius: 4px;
        padding: 10px;
        margin-bottom: 10px;
        font-size: 18px;
        background: #F0F0F0;

        & .RegistSupplierLowerDetailWarning{
            color: #FF4400;
            font-size: 14px;
            padding: 3px 0;
            & .RegistSupplierLowerDetailIcon{
                
            }
        }
    }
    & .RegistSupplierLowerImageUpload{
        width: 170px;
        height: 170px;
        padding: 10px;
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
`;
export const Icons = styled(Icon)`
    font-size: 50px;
    padding-right: 5px;
`;
export const RegistButton = styled(Button)`
    width: 280px;
    height: 50px;
    margin-top: 20px;
    color: white;
    background: #ff4300;
`;