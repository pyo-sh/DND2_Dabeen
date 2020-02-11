import React, { useState, useRef, useCallback, useEffect } from "react";
import { Button, Input, Icon } from "antd";
import styled from "styled-components";
import Link from "next/link";
const Menubar = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  text-align: center;
  border-bottom: 1px solid black;
  color: black;
  z-index: 1;
  & .menuToggle {
    position: absolute;
    top: 13px;
    right: 20px;
    cursor: pointer;
    color: black;
    font-size: 24px;
  }
  & .menuLeft {
    display: flex;
    width: 60vw;
    & span .ant-input {
      & :hover,
      :focus {
        border: 1px solid #ff4300;
        box-shadow: none;
      }
    }
  }
  & .menuRight {
    display: none;
  }
  & .active {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    font-size: 20px;
    top: 62px;
    right: 5px;
    background: rgba(255, 99, 71, 0.9);
    border-radius: 5px;
    & a {
      color: white;
    }
    & ul {
      display: flex;
      margin: 0;
      padding: 0;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      list-style: none;
    }
    & ::before {
      content: "";
      width: 10px;
      height: 10px;
      position: absolute;
      background: rgba(255, 99, 71, 0.9);
      top: -5px;
      left: 50%;
      transform: translate(-50%) rotate(45deg);
    }
  }

  @media screen and (min-width: 768px) {
    & .menuToggle {
      display: none;
    }
    & .menuLeft {
      display: flex;
      width: 40vw;
    }
    & .menuRight {
      display: flex;
      width: 60vw;
      justify-content: space-around;
      & a {
        color: black;
      }
    }
    & .menuRight ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 40vw;
      list-style: none;
      font-size: 22px;
      margin: 0;
    }
    & .loginBox {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 18vw;
    }
  }
`;
const isBrowser = typeof window !== "undefined";
const isLogin = true; // 로그인 됐는지 나중에 리덕스에서 가져올 예정
const Header = () => {
  const divRef = useRef();
  const [width, setWidth] = useState(isBrowser ? window.innerWidth : 0);
  const clickMenuIcon = useCallback(() => {
    divRef.current.classList.toggle("active");
  }, []);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    if (width > 768) {
      divRef.current.classList.remove("active");
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);
  return (
    <Menubar>
      <sapn className="menuToggle">
        <Icon
          type="menu"
          onClick={clickMenuIcon}
          style={{ color: "#FF4300" }}
        />
      </sapn>
      <div className="menuLeft">
        <div>로고</div>
        <Input.Search
          placeholder="도움을 검색하세요!"
          style={{ marginLeft: 10 }}
        />
      </div>
      <div className="menuRight" ref={divRef}>
        <ul>
          <li>
            <Link href="/errand">
              <a>심부름</a>
            </Link>
          </li>
          <li>
            <Link href="rental">
              <a>대여</a>
            </Link>
          </li>
          <li>
            <Link href="/etc">
              <a>잡일</a>
            </Link>
          </li>
        </ul>
        <div className="loginBox">
          {isLogin ? (
            <>
              <div>
                <Link href="/charge">
                  <a>충전</a>
                </Link>
              </div>
              <div>
                <Link href="/logout">
                  <a>로그아웃</a>
                </Link>
              </div>
              <div>
                <Link href="/mypage">
                  <a>마이페이지</a>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div>
                <Link href="/login">
                  <a>로그인</a>
                </Link>
              </div>
              <div>
                <Link href="/signup">
                  <a>회원가입</a>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </Menubar>
  );
};

export default Header;
