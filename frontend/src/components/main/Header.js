import React, { useState, useRef, useCallback, useEffect } from "react";
import { Input, Icon } from "antd";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Link from "next/link";
import { logoutRequestAction } from "../../reducers/user";
import Login from "../signUp/Login";
import inputChangeHook from '../../hooks/inputChangeHook';
import Router from 'next/router';

const isBrowser = typeof window !== "undefined";

const Header = ({asPath}) => {
  const dispatch = useDispatch();
  const divRef = useRef();
  
  const { userInfo } = useSelector(state => state.user);
  const [width, setWidth] = useState(isBrowser ? window.innerWidth : 0);
  const [search, onChangeSearch] = inputChangeHook(''); // 검색어
  const [searchSubject, onChangeSearchSubject] = inputChangeHook('errand'); // 검색 주제
  const [tryLogin, setTryLogin] = useState(false);
  const [selected, setSelected] = useState("/"); // 선택 된 메뉴가 무엇인지.
  const [isClickMy, setIsClickMy] = useState(false);

  const clickMenuIcon = useCallback(() => {
    divRef.current.classList.toggle("active");
  }, []);
  const clickLogout = useCallback(() => {
    dispatch(logoutRequestAction());
    alert("로그아웃 되었습니다.");
  }, []);

  const clickLogin = useCallback(() => {
    setTryLogin(prev => !prev);
  }, []);

  const clickMy = useCallback(() => {
    setIsClickMy(prev => !prev);
  }, []);

  const onSearch = useCallback(() => {
    Router.push(`/${searchSubject}?search=${search}`);
  }, [search, searchSubject]);

  useEffect(() => { // asPath에 따라서 header 부분 색 바뀌게
    setSelected(asPath.split('/')[1]);
  }, [asPath]);

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
    <Menubar selected={selected}>
      <span className="menuToggle">
        <Icon
          type="menu"
          onClick={clickMenuIcon}
          style={{ color: "#FF4300" }}
        />
      </span>
      <div className="menuLeft">
        <Link href="/">
          <a onClick={useCallback(() => setSelected("/"), [])}>
            <img width="150px" src="/images/logo.svg" alt="다빈로고" />
          </a>
        </Link>
        {/* <select onChange={onChangeSearchSubject}>
          <option value="errand">심부름</option>
          <option value="rental">대여</option>
          <option value="chores">잡일</option>
        </select>
          <Input.Search
            placeholder="어떤 도움을 찾으시나요?"
            onSearch={onSearch}
            value={search}
            onChange={onChangeSearch}
            style={{ marginLeft: 10 }}
          /> */}
          <Input.Group compact>
            <select onChange={onChangeSearchSubject}>
              <option value="errand">심부름</option>
              <option value="rental">대여</option>
              <option value="chores">잡일</option>
            </select>
            <Input.Search  placeholder="어떤 도움을 찾으시나요?"
              onSearch={onSearch}
              value={search}
              onChange={onChangeSearch}
              style={{ marginLeft: 10 }} />
            </Input.Group>
      </div>
      <div className="menuRight" ref={divRef}>
        <ul>
          <li>
            <Link href="/[postmain]" as="/errand">
              <a
                name="errand"
              >
                심부름
              </a>
            </Link>
          </li>
          <li>
            <Link href="/[postmain]" as="/rental">
              <a
                name="rental"
              >
                대여
              </a>
            </Link>
          </li>
          <li>
            <Link href="/[postmain]" as="/chores">
              <a
                name="chores"
              >
                잡일
              </a>
            </Link>
          </li>
        </ul>
        <div className="loginBox">
          {userInfo && userInfo.userNum ? (
            <>
              <div className="userPageBox">
                {/* <Link href="/mypage"> */}
                <a
                  name="userpage"
                  onClick={clickMy}
                >
                  <b>MY</b>
                </a>
                {isClickMy ? (
                  <div className="userPageList">
                    <ul>
                      <li>
                        <Icon type="dollar-circle" theme="filled" />
                        &nbsp;
                        <span>25000</span>원
                      </li>
                      <li><Link href="/basketmain"><a onClick={clickMy}>장바구니</a></Link></li>
                      <hr />
                      <li><Link href="/userpage/[userid]/[pagename]"  as={`/userpage/${userInfo.userId}/userinfo`}><a onClick={clickMy}>마이페이지</a></Link></li>
                      <li><Link href="/chat"><a onClick={clickMy}>채팅하기</a></Link></li>
                      <hr />
                      <li><Link href="/userpage/[userid]/[pagename]" as={`/userpage/${userInfo.userId}/service`}><a onClick={clickMy}>고객센터</a></Link></li>
                    </ul>
                  </div>
                ) : null}
              </div>
              <div>
                <a onClick={clickLogout}>로그아웃</a>
              </div>
            </>
          ) : (
            <>
              <div>
                <a onClick={clickLogin}>로그인</a>
              </div>
              <div>
                <Link href="/terms">
                  <a
                    name="terms signup"
                  >
                    회원가입
                  </a>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      {tryLogin && <Login clickLogin={clickLogin} />}
    </Menubar>
  );
};

const Menubar = styled.nav`
  position: fixed;
  height : 10vh;
  min-height : 50px;
  top: 0;
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  text-align: center;
  border-bottom: 1px solid #BFC7CE;
  color: black;
  z-index: 1;
  opacity : 0.9;
  & .menuToggle {
    position: absolute;
    top: 13px;
    right: 24px;
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
  & .ant-input-group {
    display : flex;
    flex-direction : column;
    align-items : center;
    & select {
      border : 1px solid #DDDDDD;
      height : 32px;
    }
  }
  & .ant-input-search {
    & span i {
      color : black;
      font-size: 18px;
    }
  }
  & .active {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    font-size: 17px;
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
    & ::before {
      content: "";
      width: 10px;
      height: 10px;
      position: absolute;
      background: rgba(255, 99, 71);
      top: -5px;
      left: 50%;
      transform: translate(-50%) rotate(45deg);
    }
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
    & .ant-input-group {
      flex-direction : row;
    }
    & .menuRight {
      display: flex;
      width: 60vw;
      justify-content: space-around;
      & a {
        color: black;
      }
      & a.click{
          color : #ff4300;
        }
      & a:hover{
          color : #ff4300;
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
      & a[name~=${props => props.selected}]{
      color : #ff4300;
      }
    & .loginBox {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 18vw;
     & .userPageBox {
       position: relative;
       & .userPageList {
        position : absolute;
        width : 100px;
        top : 35px;
        left : -42px;
        z-index : 1;
        background : white;
        border-radius : 5px;
        border : 1px solid darkgrey;
        & ul {
          width : 100%;
          font-size: 14px;
          margin :0;
          padding : 0;
          display: flex;
          color : #ff4300;
          flex-direction : column;
          & i, span {
          color : #ff4300;
          }
          & li {
            color : black;
          }
          & hr {
          width : 80%;
          }
        }
        
        &::before {
          content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        background: white;
        border-top: 1px solid darkgrey;
        border-left: 1px solid darkgrey;
        top: -5px;
        left: 50%;
        transform: translate(-50%) rotate(45deg);
        }
    }
     }
      
    }
  }
`;

export default Header;
