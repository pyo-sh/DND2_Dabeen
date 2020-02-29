import styled from 'styled-components';

export const PostBasketUpperDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    & .BasketTitle{
        width: 100%;
        padding-bottom: 25px;
        border-bottom: 1px solid #BFC7CE;
        display: flex;
        align-items: flex-end;
        flex-wrap: wrap;
        & .BasketTitleMain{
            display: flex;
            align-items: flex-end;
        }
        & .BasketTitleSort{
            margin: 10px 0 0 auto;
            display: flex;
            align-items: flex-end;
        }
        & .BasketTitleName{
            width: 150px;
            font-size: 40px;
            font-weight: bold;
        }
        & .BasketTitleMoney{
            font-size: 25px;
            padding-left: 20px;
        }
        & .BasketTitlePeople{
            font-size: 20px;
            padding-right: 15px;
        }
        & .BasketTitleBtn{
            width: 80px;
            height: 27.5px;
            color: white;
            background: #FF4300;
            border-radius: 10px;
            justify-self: flex-end;
        }
    }
    & .BasketContent{
        
    }
`;