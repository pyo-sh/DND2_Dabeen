import React from "react";
import { Button, Input, Row, Col } from "antd";
import styled from "styled-components";
import Link from 'next/link';
const Menubar = styled.div`
  position: fixed;
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  text-align: center;
  border-bottom: 1px solid black;
  color : black;

  & .menuLeft {
    display: flex;
    justify-content: center;
    align-items: center;
    width : 60vw;
    & input {
        width : 30vw;
    }
    & ul {
      display: flex;
      justify-content : space-between;
      align-items : center;
      width : 100%;
      list-style: none;
      font-size: 18px;
      margin : 0;
    }
  }
  & .buttonForm {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
`;

const MenuBar = () => {
  return (
    <Menubar>
      <div className="menuLeft">
        <div>로고</div>
        <Input.Search
          placeholder="도움을 검색하세요!"
          style={{ marginLeft: 10 }}
        />
        <ul>
          <li>
            <Link><a>심부름</a></Link>
          </li>
          <li>
            <a>대여</a>
          </li>
          <li>
            <a>잡일</a>
          </li>
        </ul>
      </div>
      <div className="menuRight">
        <Button type="link" size="small" style={{ color: "gray" }}>
          로그인
        </Button>
        <Button type="link" size="small">
          회원가입
        </Button>
      </div>

      {/* <div className="logoInput">
                <div>로고</div>
                <Input.Search 
                placeholder="도움을 검색하세요!"
                style={{marginLeft: 20}}
                />
            </div>
            <div className = "buttonForm">
                <Button type="link" style={{color: 'gray'}}>로그인</Button>
                <Button type="link">회원가입</Button>
            </div> */}
    </Menubar>
  );
};

export default MenuBar;
