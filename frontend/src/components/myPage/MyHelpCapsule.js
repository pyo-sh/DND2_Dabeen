import React from 'react';
import styled from "styled-components";

const MyHelpCapsule = ({ helpData }) => {
    return (
        <MyHelpCapsuleUpperDiv done={helpData.done}>
            <div className="MyhelpCapsuleTitle">
                <div className="MyhelpCapsuleTitleMain">{helpData.title}</div>
                <div  className="MyhelpCapsuleContent">{helpData.cont}</div>
                </div>
            <div className="MyhelpCapsuleInfo">
                <div>{helpData.price}원</div>
                <div>{helpData.help_pstn_dttm}</div>
                <div className={helpData.payment ? "done" : "doing"}>
                    {helpData.payment ? "결제완료" : "결제필요"}
                </div>
            </div>
        </MyHelpCapsuleUpperDiv>
    );
};

const MyHelpCapsuleUpperDiv = styled.div`
    display: flex;
    justify-content: space-between;
    flex: 1;
  width: 100%;
  max-width: 360px;
  min-width: 270px;
  padding: 15px;
  margin: 15px;
  border: 2px solid ${props => (props.done ? "#BFC7CE" : "#ff4300")};
  border-radius: 5px;
  & .MyhelpCapsuleTitle{
    display: flex;
    flex-direction: column;
    & .MyhelpCapsuleTitleMain{
        font-size: 22px;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    & .MyhelpCapsuleContent{
        font-size: 15px;
    }
  }
  & .MyhelpCapsuleInfo{
    width: 80px;
    padding-left: 7px;
    border-left: 1px solid #F0F0F0;
  }

  & .doing,
  .done {
    width: 60px;
    height: 23px;
    text-align: center;
    border-radius: 5px;
  }
  & .doing {
    background: #ff4300;
    color: white;
  }
  & .done {
    background: darkgrey;
  }
`;

export default MyHelpCapsule;