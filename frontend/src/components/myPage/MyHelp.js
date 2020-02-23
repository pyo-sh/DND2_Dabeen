import React, { useCallback } from "react";
import styled from "styled-components";
import { Row, Col, Pagination } from 'antd';
import MyHelpCapsule from "./MyHelpCapsule";

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
    title: "이거는 테스트야 이름이 너무 길면 사라지는지 안사라지는지",
    price: 2000000000000,
    cont: "이거는 테스트야 이름이 너무 길면 사라지는지 안사라지는지",
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
  const onChangePagination = useCallback((page, pageSize) => {
    console.log(page, pageSize);
  }, []);
  return (
    <MyHelpUpperDiv>
      <div className="Myhelp">
        <div className="MyhelpTitle">
          {helpType === "take" ? "받을 도움" : "줄 도움"}
        </div>
        <div className="MyhelpContent">
          <Row gutter={[12, 12]}>
            {takeHelp.map((element, index) => (
              <MyHelpCol md={24} lg={12} xl={8} key={index}>
                <MyHelpCapsule key={element.help_num} helpData={element} />
              </MyHelpCol>
            ))}
          </Row>
          <Pagination
            className="MyhelpContentPage"
            onChange={onChangePagination}
            simple
            defaultCurrent={1}
            pageSize={4}
            total={12}
          />
        </div>
      </div>
      <div className="Myhelp">
        <div className="MyhelpTitle">
          {helpType === "take" ? "받은 도움" : "준 도움"}
        </div>
        <div className="MyhelpContent">
          <Row gutter={[12, 12]}>
            {takenHelp.map((element, index) => (
              <MyHelpCol md={24} lg={12} xl={8} key={index}>
                <MyHelpCapsule key={element.help_num} helpData={element} />
              </MyHelpCol>
            ))}
          </Row>
          <Pagination
            className="MyhelpContentPage"
            onChange={onChangePagination}
            simple
            defaultCurrent={1}
            pageSize={4}
            total={12}
          />
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
      border-bottom: 1px solid #bfc7ce;
    }
    & .MyhelpContent{
      padding: 20px 0;
    }
    & .MyhelpContentPage{
      width: 180px;
      & input {
        width: 50px;
        margin: 0;
      }
      margin: 20px auto;
    }
  }
`;
const MyHelpCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default MyHelp;
