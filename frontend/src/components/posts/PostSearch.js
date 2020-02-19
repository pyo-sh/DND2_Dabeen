import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Input, DatePicker, TimePicker, Select, Button, Row, Col } from "antd";

const { Option } = Select;

const PostSearch = ({ categoryNum }) => {
  const [helpLocation, setHelpLocation] = useState(""); // 게시글의 위치 검색
  const [helpApplyDate, setHelpApplyDate] = useState(""); // 게시글 신청 마감 일시 날짜
  const [helpApplyTime, setHelpApplyTime] = useState(""); // 게시글 신청 마감 일시 시간
  const [helpExecDate, setHelpExecDate] = useState(""); // 도움 수행 일시 날짜
  const [helpExecTime, setHelpExecTime] = useState(""); // 도움 수행 일시 시간
  const [helpPrice, setHelpPrice] = useState(""); // 게시글 가격 값
  const [helpPriceRange, setHelpPriceRange] = useState(); // 게시글 가격 범위

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

  // 가격대 검색 Input이 바뀔 때 마다 실행하는 함수
  const onChangePrice = useCallback(e => {
    const targetString = e.target.value; // Input창의 value 값
    let deleteString = targetString.replace(/[0-9]/g, "");
    if (!deleteString) setHelpPrice(e.target.value);
  }, []);
  // 가격대 범위 Select이 바뀔 때 마다 실행하는 함수
  const onChangeRange = value => {
    setHelpPriceRange(value);
  };
  return (
    <PostSearchUpperDiv>
      <Row className="postsearchboxRow">
        <Col xd={24} sm={21}>
          <PostSearchBox>
            <div className="postsearchboxTitle">지역</div>
            <div className="postsearchboxInputWrapper">
              <Input
                className="postsearchboxInput"
                placeholder="Write location"
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
              <Input
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
              </Select>
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
  font-size: 18px;
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
      width: 100px;
      margin-right: 10px;
      color: white;
      background-color: #FF9644;
      border: none;
  }
`;

const PostSearchBox = styled.div`
  padding: 5px;
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  width: 90%;
  & .postsearchboxTitle {
    width: 50%;
    min-width: 130px;
    max-width: 170px;
    padding-left: 10px;
  }
  & .postsearchboxInputWrapper {
    width: 100%;
    min-width: 270px;
    max-width: 316px;
  }
  & .postsearchboxGetData {
    display: flex;
  }

  & .postsearchboxInput {
    width: 100%;
    min-width: 140px;
    max-width: 170px;
  }
  & .postsearchboxDatePicker {
    width: 100%;
    min-width: 140px;
    max-width: 170px;
  }
  & .postsearchboxTimePicker {
    margin-left: 10px;
    width: 100%;
    min-width: 120px;
    max-width: 150px;
  }
  & .postsearchboxSelect {
    width: 85px;
    margin-left: 10px;
  }
  & .postsearchboxButton {
    justify-self: flex-end;
  }
`;

export default PostSearch;
