import React, { useState, useCallback, useEffect } from "react";
import { PostUpperDiv } from "../../pagesStyles/postmain.style";
import {message} from 'antd';
import Login from '../../components/signUp/Login';
import PostList from "../../components/posts/PostList";
import PostWrite from "../../components/posts/PostWrite";
import PostSearch from "../../components/posts/PostSearch";
import { loadHelpPostRequestAction } from "../../reducers/posts";
import inputChangeHook from '../../hooks/inputChangeHook';
import { Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

const Postmain = ({categoryNum, search}) => {
  const dispatch = useDispatch();

  const [postWriteVisible, setPostWriteVisible] = useState(false); // 게시글 쓰기 버튼을 클릭했을 때 Modal창 띄우기 위함
  const [tryLogin, setTryLogin] = useState(false);
  const { totalPages, totalHelps } = useSelector(state => state.posts);
  const { me } = useSelector(state => state.user);

  const [helpLocation, setHelpLocation] = useState(""); // 게시글의 위치 검색
  const [helpApplyDate, setHelpApplyDate] = useState(""); // 게시글 신청 마감 일시 날짜
  const [helpApplyTime, setHelpApplyTime] = useState(""); // 게시글 신청 마감 일시 시간
  const [helpExecDate, setHelpExecDate] = useState(""); // 도움 수행 일시 날짜
  const [helpExecTime, setHelpExecTime] = useState(""); // 도움 수행 일시 시간
  const [minPrice, onChangeMinPrice] = inputChangeHook(""); // 최소가격 값
  const [maxPrice, onChangeMaxPrice] = inputChangeHook(""); // 가격 값
  // const [helpPriceRange, setHelpPriceRange] = useState(); // 게시글 가격 범위
  const [helpKeyword, onChangeHelpKeyword] = inputChangeHook('');

    // 지역 검색 Input 이 바뀔 때 마다 실행하는 함수
  const onChangeLocation = useCallback(e => {
    const targetString = e.target.value; // Input창의 value 값
    let deleteString = targetString.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ""); // 한글
    deleteString = deleteString.replace(/[a-z|A-Z]/g, ""); // 영어
    deleteString = deleteString.replace(/(\s)/g, ""); // 공백
    // deleteString = deleteString.replace(/[0-9]/g, "");   // 숫자
    if (!deleteString) setHelpLocation(e.target.value);
  }, []);
  
    // [신청 마감 일시 / 도움 수행 일시] [DatePicker / TimePicker] 가 바뀔 때 마다 실행하는 함수
  const onChangeHelpClock = useCallback(setStateFunc => (moment, string) => {
    setStateFunc(string);
  }, []);
  
  // 카테고리 정한것을 바꿨을 때, postWrite이 보이는 상태이면 다시 Modal창을 닫아야함
  useEffect(() => {
    setPostWriteVisible(false);
  }, [categoryNum]);
  // postWrite Modal창을 닫을 수 있는 함수

  const setPostWriteInvisible = useCallback(e => {
    setPostWriteVisible(prev => !prev);
  }, []);
  
  //로그아웃 상태에서 글쓰기 버튼 누르면 로그인 화면으로 가게 해준다.
  const clickLogin = useCallback(() => {
    setTryLogin(prev => !prev);
  }, []);

  const onChangePage = useCallback((page=1) => {
    dispatch(loadHelpPostRequestAction({page, search : search || "", categoryNum, helpLocation,
       helpApplyDate : helpApplyDate && helpApplyDate.concat('T' + helpApplyTime), helpExecDate : helpExecDate && helpExecDate.concat('T' +helpExecTime),
       minPrice, maxPrice, helpKeyword }));
  }, [search, categoryNum, helpLocation, helpApplyDate, helpApplyTime,helpExecDate, helpExecTime, minPrice, maxPrice, helpKeyword]);

  //글쓰기 버튼 눌렀을 경우
  const onClickPostWrite = useCallback(()=>{
    if(!me.userNum){
      message.error('로그인 후 글을 작성하실 수 있습니다.');
      setTryLogin(true);
    } else{
      setPostWriteVisible(true);
    }
  }, [me]);

  // 보고자 하는 카테고리가 바뀔 때 보여주는 Title을 결정해주는 함수
  const getTitle = useCallback(() => {
    switch (categoryNum) {
      case 1000:
        return {
          mainTitle: "심부름",
          subTitle: "간단한 심부름을 도와주세요!"
        };
      case 2000:
        return {
          mainTitle: "대여",
          subTitle: "물건을 빌려주세요!"
        };
      case 3000:
        return {
          mainTitle: "잡일",
          subTitle: "부족한 일손을 채워보아요!"
        };
      default:
        return {
          mainTitle: "",
          subTitle: ""
        };
    }
  }, [categoryNum]);

  return (
    <PostUpperDiv>
      <div className="postmainWrapper">
        <div className="postmainTitle">
          <div className="postmainTitleMain">{getTitle().mainTitle}</div>
          <div className="postmainTitleSub">{getTitle().subTitle}</div>
        </div>
        <PostSearch categoryNum={categoryNum} setHelpApplyDate={setHelpApplyDate}
          setHelpApplyTime={setHelpApplyTime}
          setHelpExecDate={setHelpExecDate} 
          setHelpExecTime={setHelpExecTime}
          minPrice={minPrice} onChangeMinPrice={onChangeMinPrice}
          maxPrice={maxPrice} onChangeMaxPrice={onChangeMaxPrice}
          helpKeyword={helpKeyword} onChangeHelpKeyword={onChangeHelpKeyword}
          onChangeHelpClock={onChangeHelpClock}
          helpLocation={helpLocation}
          onChangeLocation={onChangeLocation}
          onChangePage={onChangePage}
        />
        <div className="postmainContent">
          <div className='helpCount'>검색 된 도움 수 : {totalHelps || 0}</div>
          {totalHelps ?  <PostList categoryNum={categoryNum} /> : <h2>검색 결과가 없어요 ㅠㅠ</h2> }
        </div>
        <div
          className="postmainWrite"
          onClick={onClickPostWrite}
        >
          <img
            className="postmainWriteIcon"
            alt="writePost"
            src={"/images/postIcon.png"}
          />
        </div>
        {postWriteVisible ? (
          <PostWrite setInvisible={setPostWriteInvisible} userNum={me.userNum}/>
        ) : null}
        {tryLogin&&<Login clickLogin={clickLogin} />}
      </div>
      <Pagination defaultCurrent={2} onChange={onChangePage} total={totalHelps} defaultPageSize={9}/>
    </PostUpperDiv>
  );
};

Postmain.getInitialProps = async context => {
  const {postmain, search} = context.query; // 서치를 검색할 때 쓴다.
  let categoryNum = postmain ==="errand" ? 1000 : postmain === "rental" ? 2000 : 3000;
  context.store.dispatch(loadHelpPostRequestAction({categoryNum, search, page:1}));

  // 처음 들어가자마자 있어야 하는 정보들을 가지고 온다.
  // 여기에는 위에 주소마다 다르게 dispatch를 해야할 듯.
  // 처음 들어가자마자 있어야 하는 정보들은 여기서 아니면 useEffect 같은 곳에서
  // 리덕스 말고 다른 정보를 props로 주려면
  return {categoryNum, search}
};

export default Postmain;
