import React from "react";
import styled from "styled-components";
import MyHelpCapsule from './MyHelpCapsule';

const takeHelp = [
  {
    help_num: 1,
    title: "~~ 도와주세요",
    price: 20000,
    cont: "아무거나",
    help_pstn_dttm: "2020-02-01",
    done: false,
    payment: false
  },
  {
    help_num: 2,
    title: "~~ 도와주세요",
    price: 20000,
    cont: "아무거나1234",
    help_pstn_dttm: "2020-02-01",
    done: false,
    payment: false
  },
  {
    help_num: 5,
    title: "~~ 도와주세요",
    price: 20000,
    cont: "킹무거나",
    help_pstn_dttm: "2020-02-01",
    done: true,
    payment: false
  }
];
const takenHelp = [
  {
    help_num: 1,
    title: "~~ 도와주세요",
    price: 20000,
    cont: "아무거나",
    help_pstn_dttm: "2020-02-01",
    done: true,
    payment: true
  },
  {
    help_num: 2,
    title: "~~ 도와주세요",
    price: 20000,
    cont: "아무거나1234",
    help_pstn_dttm: "2020-02-01",
    done: true,
    payment: true
  },
  {
    help_num: 5,
    title: "~~ 도와주세요",
    price: 20000,
    cont: "킹무거나",
    help_pstn_dttm: "2020-02-01",
    done: true,
    payment: true
  }
];

const MyHelp = ({ helpType }) => {
  return (
    <MyHelpUpperDiv>
      <div className="Myhelp">
        <div className="MyhelpTitle">{helpType === "take" ? "받을 도움" : "줄 도움"}</div>
        <div className="MyhelpsBox">
          {takeHelp.map(t => (
            <MyHelpCapsule key={t.help_num} helpData={t}/>
          ))}
        </div>
      </div>
      <div className="Myhelp">
        <div className="MyhelpTitle">{helpType === "take" ? "받은 도움" : "준 도움"}</div>
        <div className="MyhelpsBox">
          {takenHelp.map(t => (
            <MyHelpCapsule key={t.help_num} helpData={t}/>
          ))}
        </div>
      </div>
    </MyHelpUpperDiv>
  );
};

const MyHelpUpperDiv = styled.div`
  width: 100%;
  & .Myhelp {
    display: flex;
    flex-direction: column;
    & .MyhelpTitle {
      font-size: 40px;
      font-weight: bold;
      padding-bottom: 25px;
      border-bottom: 1px solid #BFC7CE;
    }
    & .MyhelpsBox {
      margin: 15px 0 30px 0;
      display: flex;
      flex-wrap: wrap;
      
    }
  }
`;
export default MyHelp;
