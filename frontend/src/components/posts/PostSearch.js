import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Input, DatePicker, TimePicker, Select, Button, Row, Col } from "antd";
import inputChangeHook from '../../hooks/inputChangeHook';

const { Option } = Select;

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
              {/* <Input 
                className="postsearchboxInput"
                placeholder="Write price"
                value={helpPrice}
                onChange={onChangePrice}
              />
              <Select
                className="postsearchboxSelect"
                placeholder="Range"
                onChange={onChangeRange}
              >
                <Option value="up">이상</Option>
                <Option value="down">이하</Option>
              </Select> */}
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

const PostSearchUpperDiv = styled.div`
  padding: 10px;
  margin: 10px 0;
  border-radius: 8px;
  background: #f0f0f0;
  font-size: 16px;
  & .postsearchboxRow{
      display: flex;
      align-items: flex-end;
      flex-wrap: wrap;
  }
  & .postsearchboxButtonWrapper{
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      height: 100%;
  }
  & .postsearchboxButton {
      width: 80px;
      margin-right: 10px;
      color: white;
      background-color: #ff4300;
      border: none;
      transition: background 0.3s; 
      &:hover {
        background:rgb(255,67,0,0.8);
      }
  }
`;

const PostSearchBox = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 90%;
  & input {
    height : 28px;
    &:hover, :focus {
      border : 1px solid #FF4300;
      outline : none;
      box-shadow : none;
    }
  }
  & .postsearchboxTitle {
    width: 50%;
    min-width: 130px;
    max-width: 170px;
    padding-left: 10px;
  }
  & .postsearchboxInputWrapper {
    display: flex;
    width: 100%;
    min-width: 270px;
    max-width: 290px;
    & .rangeInput{
      background: #FFFFFF;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      width: 100%;
      min-width: 110px;
      max-width: 140px;
      height: 25px;
      color: #BFC7CE;

      &:hover, :focus{
        border: 1px solid #FF4300;
      }
    }
    & .inputPrice{
      width: 100%;
      min-width: 80px;
      max-width: 110px;
      height: 22px;
      border: none;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      text-align: right;
      color: rgba(0, 0, 0, 0.65);
      
      :focus{
        outline: none;
      }
    }
  }

  /* input type="number"일 경우 생기는 화살표 제거 */
  & input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }
  
  & .postsearchboxGetData {
    display: flex;
  }
  & .postsearchboxLongInput {
    width: 100%;
    min-width: 270px;
    max-width: 290px;
  }
  & .postsearchboxInput {
    width: 100%;
    min-width: 140px;
    max-width: 170px;
  }
  & .postsearchboxDatePicker {
    width: 100%;
    min-width: 110px;
    max-width: 140px;
    & input:read-only:hover {
      border: 1px solid #FF4300;
    }
  }
  & .postsearchboxTimePicker {
    margin-left: 10px;
    width: 100%;
    min-width: 110px;
    max-width: 140px;
  }
  & .postsearchboxSelect {
    width: 85px;
    margin-left: 10px;
  }
  & .postsearchboxButton {
    justify-self: flex-end;
  }
  & .ant-select-arrow{
      color: #FF4300;
  }
  & .ant-calendar-picker-icon{
      color: #FF4300;
  }
  & .ant-time-picker-clock-icon{
      color: #FF4300; 
  }
`;

export default PostSearch;
