import React, { useState, useCallback } from "react";
import { Input, DatePicker, TimePicker, Select, Button, Row, Col } from "antd";
import inputChangeHook from '../../hooks/inputChangeHook';
import {PostSearchUpperDiv, PostSearchBox} from './PostSearch.style';

const PostSearch = ({ categoryNum }) => {
  const [helpLocation, setHelpLocation] = useState(""); // 게시글의 위치 검색
  const [helpApplyDate, setHelpApplyDate] = useState(""); // 게시글 신청 마감 일시 날짜
  const [helpApplyTime, setHelpApplyTime] = useState(""); // 게시글 신청 마감 일시 시간
  const [helpExecDate, setHelpExecDate] = useState(""); // 도움 수행 일시 날짜
  const [helpExecTime, setHelpExecTime] = useState(""); // 도움 수행 일시 시간
  const [minPrice, setMinPrice] = useState(""); // 최소가격 값
  const [maxPrice, setMaxPrice] = useState(""); // 가격 값
  const [helpPriceRange, setHelpPriceRange] = useState(); // 게시글 가격 범위
  const [helpKeyword, setHelpKeyword] = inputChangeHook('');

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
  const onChangeHelpClock = setStateFunc =>
    useCallback((moment, string) => {
      setStateFunc(string);
    }, []);

  // // 가격대 검색 Input이 바뀔 때 마다 실행하는 함수
  // const onChangePrice = useCallback(e => {
  //   const targetString = e.target.value; // Input창의 value 값
  //   let deleteString = targetString.replace(/[0-9]/g, "");
  //   if (!deleteString) setHelpPrice(e.target.value);
  // }, []);
  // // 가격대 범위 Select이 바뀔 때 마다 실행하는 함수
  // const onChangeRange = value => {
  //   setHelpPriceRange(value);
  // };

  return (
    <PostSearchUpperDiv>
      <Row className="postsearchboxRow">
        <Col xd={24} sm={21}>
          <PostSearchBox>
            <div className="postsearchboxTitle">지역</div>
            <div className="postsearchboxInputWrapper">
              <Input
                className="postsearchboxLongInput"
                placeholder="시/구를 입력하세요. ex)서울 강남구, 부산 남구"
                value={helpLocation}
                onChange={onChangeLocation}
              />
            </div>
          </PostSearchBox>
          <PostSearchBox>
            <div className="postsearchboxTitle">신청 마감 일시</div>
            <div className="postsearchboxGetData">
              <DatePicker
                className="postsearchboxDatePicker"
                format="YYYY/MM/DD"
                onChange={onChangeHelpClock(setHelpApplyDate)}
              />
              <TimePicker
                className="postsearchboxTimePicker"
                use12Hours
                format="h:mm a"
                onChange={onChangeHelpClock(setHelpApplyTime)}
              />
            </div>
          </PostSearchBox>
          <PostSearchBox>
            <div className="postsearchboxTitle">도움 수행 일시</div>
            <div className="postsearchboxGetData">
              <DatePicker
                className="postsearchboxDatePicker"
                format="YYYY/MM/DD"
                onChange={onChangeHelpClock(setHelpExecDate)}
              />
              <TimePicker
                className="postsearchboxTimePicker"
                use12Hours
                format="h:mm a"
                onChange={onChangeHelpClock(setHelpExecTime)}
              />
            </div>
          </PostSearchBox>
          <PostSearchBox>
            <div className="postsearchboxTitle">가격대</div>
            <div className="postsearchboxInputWrapper">
              <span className="rangeInput">
                <input className="inputPrice"type="number"/>원
              </span>
              <span style={{marginLeft: 2, marginRight: 2}}>~</span>
              <span className="rangeInput">
                <input className="inputPrice"type="number"/>원
              </span>
            </div>
          </PostSearchBox>
          <PostSearchBox>
          <div className="postsearchboxTitle">키워드</div>
            <div className="postsearchboxInputWrapper">
              <Input
                className="postsearchboxLongInput"
                placeholder="키워드를 입력하세요"
                value={helpKeyword}
                onChange={setHelpKeyword}
              />
            </div>
          </PostSearchBox>
        </Col>
        <Col xs={24} sm={3} className="postsearchboxButtonWrapper">
          <Button className="postsearchboxButton">검색</Button>
        </Col>
      </Row>
    </PostSearchUpperDiv>
  );
};

export default PostSearch;
