import styled, {keyframes} from 'styled-components';

const fade = keyframes`
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
`;

export const Modal = styled.div`
    background: rgba(0, 0, 0, 0.25);
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
`;

export const DrawerForm = styled.div`
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    font-size: 20px;
    color: #424242;
    background: white;
    padding: 1rem;
    width: 40%;
    max-width: 500px;
    min-width: 400px;
    display: flex; 
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow: auto;
    box-shadow: -4px 0 10px 2px #7A7A7A;
    ::-webkit-scrollbar{display:none;}  
    animation: ${fade} 0.2s linear;
    transition: visible 0.2s linear;
    
    & > .drawerTitle{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 450px;
        min-width: 300px;
        font-size: 40px;
        font-weight: bold;

        & > .icon{
            font-size: 35px;
        }
    }
    & > .drawerTop {
        display: flex;
        width: 100%;
        max-width: 450px;
        min-width: 300px;
        font-size: 20px;
        margin-bottom: 5px;

        & > .drawerTopFlex {
            display: flex;
            flex-wrap: wrap;
        }
        & .drawerTopSubTitle{
            margin-right: 5px;
        }
        & .drawerTopSubTitleValue{

        }

        & > .drawerTopMargin {
            margin: 0 10px;
        }

        & .pay{
            border: 1px solid #FF4300;
            border-radius: 5px;
            background: #FF4300;
            color: #FFFFFF;
            width: 80px;
            height: 30px;
            margin-left: 10px;
            line-height: 1;

            :focus{
                outline: none;
            }
        }
    }

    & .drawerMiddle {
        margin: 10px 0;
        width: 100%;
        display: flex;
        flex-direction : column;
        justify-content: center;
        align-items: center;
        background: #F0F0F0;
        border-radius: 5px;
    }
`;

