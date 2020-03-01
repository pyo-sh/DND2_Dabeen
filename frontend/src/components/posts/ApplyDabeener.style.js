import styled from 'styled-components';

export const ApplyDabeenerDiv = styled.div`
    border: 1px solid #BFC7CE;
    border-radius: 10px;
    width: 100%;
    max-width: 450px;
    min-width: 300px;
    height: auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 2vh;

    & .ant-avatar {
        width: 100%;
        max-width: 80px;
        height: 80px;
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

        & div{
            margin-right: 5px;
            font-size: 20px;
        }
    }

    & .userIntro {
        font-size: 13px;
        width: 100%;
        max-width: 280px;
        min-width: 130px;
    }

    & .userDetailInfo {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        /* align-items: flex-end; */
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
    height: 30px;
    border-radius: 5px;
    background: ${props => (props.choice) ? "#F0F0F0" : "#FF4300"};
    border: ${props => (props.choice) ? "#F0F0F0" : "#FF4300"};
    color: ${props => (props.choice) ? "#7A7A7A" : "#FFFFFF"};
    font-size: 18px;
    box-shadow: 2px 3px 5px #BFC7CE;
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