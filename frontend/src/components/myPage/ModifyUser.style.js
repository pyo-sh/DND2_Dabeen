import styled from 'styled-components';

export const ModifyUserUpperDiv = styled.div`
    & .ModifyTitle{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding-bottom: 25px;
        border-bottom: 1px solid #BFC7CE;
        font-size: 40px;
        font-weight: bold;
    }
    & .ModifyContent{
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 50px 0;
        width: 100%;
        max-width: 600px;
        min-width: 280px;
        /* height: 1120px; */
        & .ModifyUserProfile{
            border: 1px solid #BFC7CE;
            border-radius: 50%;
            width: 150px;
            height: 150px;
        }
        & .ModifyUserProfileChange {
            & .ModifyUserProfileChangeIcon {
                width: 50px;
                cursor: pointer;
                margin-left: 50px;
                margin-right: -50px;
                margin-top: -50px;
            }
        }
        & hr{
            width: 100%;
            color: #d9d9d9;
            border: none;
            border-top: 1px solid #d9d9d9;
            margin: 35px 0;
        }
        & .ModifyTips{
            width: 100%;
            margin: 10px 0;
            max-width: 425px;
            min-width: 270px;
            font-size: 16px;
        }
    }
    & .ModifyBtn{
        display: flex;
        & .ModifyBtnBack{
            width: 100%;
            height: 100vh;
            max-width: 100px;
            max-height: 40px;
            min-width: 60px;
            min-height: 30px;
        }
        & .ModifyBtnAccess {
            width: 100%;
            height: 100vh;
            max-width: 100px;
            max-height: 40px;
            min-width: 60px;
            min-height: 30px;
            background: #FF9644;
        }
    }
`;

export const ModifyUserGetDataDiv = styled.div`
    display: flex;
    flex-direction: column;
   
    padding : 5px;
    max-width: 425px;
    min-width: 250px;
    width : 100%;
    
    & .ModifyUserTitle{
        font-weight: bold;
    }
    & .ModifyUserCheck{
        height: 30px;

        color: red;
        align-self: flex-end;
    }
    & .ModifyUserCheckAll{
        margin-top: 20px;
        height: 30px;
        color: red;
        align-self: flex-end;
    }
`;