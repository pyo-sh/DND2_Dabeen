import styled from 'styled-components';

export const ApplyDabeenerDiv = styled.div`
    border: 1px solid #BFC7CE;
    border-radius: 10px;
    width: 100%;
    max-width: 450px;
    min-width: 300px;
    margin: 10px;
    padding: 15px 10px;
    height: auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    box-shadow: 0 0 10px 2px #E9E9E9;
    background: white;

    & .userProfile {
        width: 100%;
        max-width: 80px;
        height: 80px;
        border: 1px solid #BFC7CE;
        border-radius : 50%;
        cursor: pointer;
    }
`;

export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    max-width: 300px;
    min-width: 150px;

    & .user{
        display: flex;
        flex-direction: column;
    }

    & .userInfo {
        display: flex;
        align-items: flex-end;
        width: 100%;
        max-width: 280px;
        min-width: 150px;
        padding-bottom: 3px;

        & .UserNickname{
            margin-right: 5px;
            font-size: 20px;
        }
        & .UserId{
            font-size: 14px;
        }
    }

    & .userIntro {
        font-size: 13px;
        width: 100%;
        max-width: 280px;
        min-width: 130px;
        padding-bottom: 3px;

    }

    & .userDetailInfo {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    
        align-items: center;
        width: 100%;
        

        & .rateFlex {
            display: flex;
            align-items: center;

            & > div{    
                margin-left: 4px;
                margin-top: 4px;
                font-size: 15px;
            }
        }

        & .ant-rate-star{
            color: #FF4300;
        }
    }

`;

//선택됐으면 버튼색 회색으로 
export const ChoiceButton = styled.button`
    width: 80px;
    height: 28px;
    border-radius: 5px;
    background: ${props => (props.choice) ? "#F0F0F0" : "#FF4300"};
    border: ${props => (props.choice) ? "#F0F0F0" : "#FF4300"};
    color: ${props => (props.choice) ? "#7A7A7A" : "#FFFFFF"};
    font-size: 16px;
    /* box-shadow: 2px 3px 5px #BFC7CE; */
    cursor: pointer;

    :hover {
        opacity: 0.9;
        background: ${props => (props.choice) ? "#F0F0F0" : "#FF4300"};
        border: ${props => (props.choice) ? "#F0F0F0" : "#FF4300"};
        color: ${props => (props.choice) ? "#7A7A7A" : "#FFFFFF"};
    }

    :focus{
        outline: none;
    }
`;

export const CancelButton = styled.button`
    width: 80px;
    height: 30px;
    border-radius: 5px;
    border: 0;
    background : grey;
    color :white;
    &:hover {
        opacity : 0.8;
    }
`;