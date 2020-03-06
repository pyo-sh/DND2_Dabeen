import styled from 'styled-components';

export const ServiceItemBox = styled.div`
  cursor: pointer;
  & .question, .answer {
    border-bottom: 1px solid #E9E9E9;
    width: 100%;
  }
  & .serviceItemQuestion, .serviceItemAnswer{
    width: 100%;
    padding : 10px;
    border-bottom: 1px solid #E9E9E9;
    &:hover {
      color: #FF4300;
    }
  }
  & .serviceItemAnswer{
    color: black;
    background : rgb(240,240,240);
    padding-left : 27.5px;
    display : ${props=> props.isClick ? "block" : "none"}
  }
  & .questionTitle, .replyTitle {
    display : flex;
    width : 100%;
    justify-content : space-between;
  }
  & b {
    margin-right: 10px;
      color: #FF4300;
      font-size: 20px;
    }
  & pre {
    white-space : pre-wrap;
    font-family : "Noto Sans KR", sans-serif;
  }
`;
