import styled from 'styled-components';

export const PostSearchUpperDiv = styled.div`
  padding: 10px;
  margin: 10px 0;
  border-radius: 8px;
  background: #f0f0f0;
  box-shadow: 0 5px 10px 3px #E9E9E9;
  font-size: 16px;
  & .postsearchboxRow{
      display: flex;
      align-items: flex-end;
      flex-wrap: wrap;
  }
  & .postsearchboxButtonWrapper{
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      height: 100%;
  }
  & .postsearchboxButton {
      width: 80px;
      margin-right: 10px;
      color: white;
      background-color: #ff4300;
      border: none;
      transition: 0.3s; 
      &:hover {
        background:rgb(255,67,0,0.8);
      }
  }
`;

export const PostSearchBox = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 90%;
  & input {
    height : 28px;
    &:hover, :focus {
      border : 1px solid #FF4300;
      outline : none;
      box-shadow : none;
    }
  }
  & .postsearchboxTitle {
    width: 50%;
    min-width: 130px;
    max-width: 170px;
    padding-left: 10px;
  }
  & .postsearchboxInputWrapper {
    display: flex;
    width: 100%;
    min-width: 270px;
    max-width: 290px;
    & .rangeInput{
      background: #FFFFFF;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      width: 100%;
      min-width: 110px;
      max-width: 140px;
      height: 28px;
      color: #BFC7CE;
      &:hover, :focus{
        border: 1px solid #FF4300;
      }
    }
    & .inputPrice{
      width: 100%;
      min-width: 80px;
      max-width: 110px;
      height: 22px;
      border: none;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      text-align: right;
      color: rgba(0, 0, 0, 0.65);
      
      :focus{
        outline: none;
      }
    }
  }
  /* input type="number"일 경우 생기는 화살표 제거 */
  & input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }
  
  & .postsearchboxGetData {
    display: flex;
  }
  & .postsearchboxLongInput {
    width: 100%;
    min-width: 270px;
    max-width: 290px;
  }
  & .postsearchboxInput {
    width: 100%;
    min-width: 140px;
    max-width: 170px;
  }
  & .postsearchboxDatePicker {
    width: 100%;
    min-width: 110px;
    max-width: 140px;
    & input:read-only:hover {
      border: 1px solid #FF4300;
    }
  }
  & .postsearchboxTimePicker {
    margin-left: 10px;
    width: 100%;
    min-width: 110px;
    max-width: 140px;
  }
  & .postsearchboxSelect {
    width: 85px;
    margin-left: 10px;
  }
  & .postsearchboxButton {
    justify-self: flex-end;
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
`;