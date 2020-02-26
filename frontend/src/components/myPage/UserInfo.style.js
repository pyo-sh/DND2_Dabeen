import styled from 'styled-components';

export const UserInfoWrapper = styled.div`
    & .userinfoTitle{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding-bottom: 25px;
        border-bottom: 1px solid #BFC7CE;
        font-size: 40px;
        font-weight: bold;
        & .userinfoEditBtn{
            width: 80px;
            height: 27.5px;
            color: white;
            background: #FF4300;
            border: none;
            border-radius: 10px;
            font-size: 14px;
        }
    }
    & .userinfoWrapper{
        padding: 20px;
    }
    & .userinfoContent{
        font-size: 20px;
        display: flex;
        & .userinfoContentName{
            min-width: 120px;
            margin: 20px 0;
            border-right: 1px solid #F0F0F0;
            & .icon {
                color : #FF4300;
            }
        }
        & .userinfoContentValue{
            word-wrap: break-word;
            white-space: normal;
            min-width: 120px;
            margin: 20px;
            margin-right: 0;
        }
        & .userRefundBtn{
            width: 80px;
            height: 30px;
            color: white;
            background: #FF4300;
            border: none;
            border-radius: 10px;
            font-size: 14px;
            margin: 20px;
        }
        & .userinfoContentValueWrapper{
            display: flex;
            flex-wrap: wrap-reverse;
            min-width: 120px;
        }
    }
`;