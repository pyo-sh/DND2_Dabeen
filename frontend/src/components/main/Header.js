import React, { useState, useRef, useCallback, useEffect } from "react";
import { Input, Icon } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { logoutRequestAction } from "../../reducers/user";
import Login from "../signUp/Login";
import inputChangeHook from '../../hooks/inputChangeHook';
import Router from 'next/router';
import { Menubar } from './Header.style';

const isBrowser = typeof window !== "undefined";

const Header = ({asPath}) => {
  const dispatch = useDispatch();
  const divRef = useRef();
  
  const { me } = useSelector(state => state.user);
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
    Router.push('/');
  }, []);

  const clickLogin = useCallback(() => {
    setTryLogin(prev => !prev);
  }, []);

  const clickMy = useCallback(() => {
    setIsClickMy(prev => !prev);
  }, []);

  const onSearch = useCallback(() => {
    // Router.push(`/${searchSubject}?search=${search}`);
    Router.push(`/[postmain]?search=${search}`,`/${searchSubject}?search=${search}`);
  }, [search, searchSubject]);

  useEffect(() => { // asPath에 따라서 header 부분 색 바뀌게
    const path = asPath.split('/')[1];
    const check = asPath.split('/')[2] === me.userNum;
    if(path === 'userpage' && !check) {
      setSelected('');
    }
    else {
      setSelected(path);
    }
  }, [asPath, me && me.userNum]);

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
      <nav className="menuLeft">
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
          <Input.Group
            compact
            className="HeaderSearch"
            >
            <select onChange={onChangeSearchSubject}>
              <option value="errand">심부름</option>
              <option value="rental">대여</option>
              <option value="chores">잡일</option>
            </select>
            <div className="HeaderSearchInput">
              <input placeholder="어떤 도움을 찾으시나요?" value={search} onChange={onChangeSearch} />
              <Icon type="search" onClick={onSearch}/>
            </div>
            </Input.Group>
      </nav>
      <nav className="menuRight" ref={divRef}>
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
          {me && me.userNum ? (
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
                        <span>{me.ownMilege}</span>원
                      </li>
                      <li><Link href="/userpage/[usernum]/[pagename]" as={`/userpage/${me.userNum}/basket`}><a onClick={clickMy}>장바구니</a></Link></li>
                      <hr />
                      <li><Link href="/userpage/[usernum]/[pagename]"  as={`/userpage/${me.userNum}/userinfo`}><a onClick={clickMy}>마이페이지</a></Link></li>
                      <li><Link href="/chat"><a onClick={clickMy}>채팅하기</a></Link></li>
                      <hr />
                      <li><Link href="/userpage/[usernum]/[pagename]" as={`/userpage/${me.userNum}/service`}><a onClick={clickMy}>고객센터</a></Link></li>
                    </ul>
                  </div>
                ) : null}
              </div>
              <div className="loginBoxRight">
                <a onClick={clickLogout}>로그아웃</a>
              </div>
            </>
          ) : (
            <>
              <div>
                <a onClick={clickLogin}>로그인</a>
              </div>
              <div className="loginBoxRight">
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
      </nav>
      {tryLogin && <Login clickLogin={clickLogin} />}
    </Menubar>
  );
};



export default Header;
