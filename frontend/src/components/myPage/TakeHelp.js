import React from "react";
import styled from 'styled-components';

const takenHelp = [
  {
    helpNo: 1,
    title: "~~ 도와주세요",
    price: 20000,
    content: "아무거나",
    date: "2020-02-01"
  },
  {
    helpNo: 2,
    title: "~~ 도와주세요",
    price: 20000,
    content: "아무거나1234",
    date: "2020-02-01"
  },
  {
    helpNo: 5,
    title: "~~ 도와주세요",
    price: 20000,
    content: "킹무거나",
    date: "2020-02-01"
  }
];
const TakeHelp = () => {
  return (
    <TakeHelpWrapper>
      {takenHelp.map(t => (
        <HelpBox key={t.helpNo}>
          <div>
            <h2>{t.title}</h2>
            <div>{t.content}</div>
          </div>
          <div>
            <div>{t.price}원</div>
            <div>{t.date}</div>
          </div>
        </HelpBox>
      ))}
    </TakeHelpWrapper>
  );
};

const TakeHelpWrapper = styled.div`
    display : flex;
    flex-wrap : wrap;
    width : 100%;
`;
const HelpBox = styled.div`
    display : flex;
    width : 40%;
    min-width : 250px;
    justify-content : space-around;
    border : 2px solid #FF4300;
    padding : 15px;
    margin: 15px;
    border-radius : 5px;
    & div {
        display : flex;
        flex-direction : column;
        margin : auto;
    }
`;
export default TakeHelp;
