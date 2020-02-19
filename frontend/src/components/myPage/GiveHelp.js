import React from "react";
import styled from "styled-components";

const giveHelp = [
  {
    helpNo: 1,
    title: "~~ 도와주세요",
    price: 20000,
    content: "아무거나",
    date: "2020-02-01",
    done : false,
    payment : false
  },
  {
    helpNo: 2,
    title: "~~ 도와주세요",
    price: 20000,
    content: "아무거나1234",
    date: "2020-02-01",
    done : false,
    payment : false
  },
  {
    helpNo: 5,
    title: "~~ 도와주세요",
    price: 20000,
    content: "킹무거나",
    date: "2020-02-01",
    done : true,
    payment : false
  }
];
const givenHelp = [
  {
    helpNo: 1,
    title: "~~ 도와주세요",
    price: 20000,
    content: "아무거나",
    date: "2020-02-01",
    done : true,
    payment : true
  },
  {
    helpNo: 2,
    title: "~~ 도와주세요",
    price: 20000,
    content: "아무거나1234",
    date: "2020-02-01",
    done : true,
    payment : true
  },
  {
    helpNo: 5,
    title: "~~ 도와주세요",
    price: 20000,
    content: "킹무거나",
    date: "2020-02-01",
    done : true,
    payment : true
  }
];
const GiveHelp = () => {
  return (
    <GivHelpWrapper>
      <div className="helps">
        <h2>줄 도움</h2>
        <div className="helpsBox">
          {giveHelp.map(t => (
            <HelpBox key={t.helpNo} done={t.done}>
              <div>
                <h2>{t.title}</h2>
                <div>{t.content}</div>
              </div>
              <div>
                <div>{t.price}원</div>
                <div>{t.date}</div>
                <div className={t.payment? "done" : "doing"}>{t.payment ? "결제완료" : "결제필요"}</div>
              </div>
            </HelpBox>
          ))}
        </div>
      </div>
      <div className="helps">
        <h2>준 도움</h2>
        <div className= "helpsBox">
          {givenHelp.map(t => (
            <HelpBox key={t.helpNo} done={t.done}>
              <div>
                <h2>{t.title}</h2>
                <div>{t.content}</div>
              </div>
              <div>
                <div>{t.price}원</div>
                <div>{t.date}</div>
                <div className={t.payment? "done" : "doing"}>{t.payment ? "결제완료" : "결제필요"}</div>
              </div>
            </HelpBox>
          ))}
        </div>
      </div>
    </GivHelpWrapper>
  );
};

const GivHelpWrapper = styled.div`
  width: 100%;
  & .helps {
    display: flex;
    flex-direction : column;
    & .helpsBox {
      display: flex;
      flex-wrap : wrap;
    }
  }
`;
const HelpBox = styled.div`
  display: flex;
  width: 35%;
  min-width: 210px;
  justify-content: space-around;
  border: 2px solid ${props => props.done ? "darkgrey" : "#ff4300"};
  padding: 15px;
  margin: 15px;
  border-radius: 5px;
  & div {
    display: flex;
    flex-direction: column;
    margin: auto;
  }
  & .doing, .done {
    width : 45px;
    height : 20px;
    text-align : center;
    border-radius : 5px;
  }
  & .doing {
    background : #ff4300;
    color :white;
  }
  & .done {
    background : darkgrey;
  }
`;
export default GiveHelp;
