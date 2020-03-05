import styled from 'styled-components';

export const PostBasketUpperDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    & .BasketTitle{
        width: 100%;
        padding-bottom: 18px;
        border-bottom: 1px solid #E9E9E9;
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
            font-size: 33px;
            font-weight: bold;
        }
        & .BasketTitleMoney{
            font-size: 23px;
            padding-left: 20px;
        }
        & .BasketTitlePeople{
            font-size: 23px;
            padding-right: 15px;
        }
        & .BasketTitleBtn{
            width: 80px;
            height: 30x;
            color: white;
            background: #FF4300;
            border-radius: 10px;
            justify-self: flex-end;
        }
    }
    & .BasketContent{
        width: 100%;
    }
`;