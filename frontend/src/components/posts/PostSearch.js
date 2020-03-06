import React, { useCallback } from "react";
import { Input, DatePicker, TimePicker, Button, Row, Col } from "antd";
import {PostSearchUpperDiv, PostSearchBox} from './PostSearch.style';

const PostSearch = ({ helpLocation, onChangeLocation, setHelpApplyDate, 
  setHelpApplyTime, setHelpExecDate, setHelpExecTime, 
  minPrice,  onChangeMinPrice, maxPrice, onChangeMaxPrice, helpKeyword, onChangeHelpKeyword,
  onChangeHelpClock, onChangePage }) => {
  
    const clickSearch = useCallback(() => {
      onChangePage();
    }, []);

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
                format="YYYY-MM-DD"
                onChange={onChangeHelpClock(setHelpApplyDate)}
              />
              <TimePicker
                className="postsearchboxTimePicker"
                use12Hours
                format="HH:mm:ss"
                onChange={onChangeHelpClock(setHelpApplyTime)}
              />
            </div>
          </PostSearchBox>
          <PostSearchBox>
            <div className="postsearchboxTitle">도움 수행 일시</div>
            <div className="postsearchboxGetData">
              <DatePicker
                className="postsearchboxDatePicker"
                format="YYYY-MM-DD"
                onChange={onChangeHelpClock(setHelpExecDate)}
              />
              <TimePicker
                className="postsearchboxTimePicker"
                use12Hours
                format="HH:mm:ss"
                onChange={onChangeHelpClock(setHelpExecTime)}
              />
            </div>
          </PostSearchBox>
          <PostSearchBox>
            <div className="postsearchboxTitle">가격대</div>
            <div className="postsearchboxInputWrapper">
              <span className="rangeInput">
                <input className="inputPrice"type="number" value={minPrice} onChange={onChangeMinPrice}/>원
              </span>
              <span style={{marginLeft: 2, marginRight: 2}}>~</span>
              <span className="rangeInput">
                <input className="inputPrice" type="number" value={maxPrice} onChange={onChangeMaxPrice}/>원
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
                onChange={onChangeHelpKeyword}
              />
            </div>
          </PostSearchBox>
        </Col>
        <Col xs={24} sm={3} className="postsearchboxButtonWrapper">
          <Button className="postsearchboxButton" onClick={clickSearch}>검색</Button>
        </Col>
      </Row>
    </PostSearchUpperDiv>
  );
};

export default PostSearch;
