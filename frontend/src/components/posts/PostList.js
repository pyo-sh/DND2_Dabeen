import React, { useState } from "react";
import styled from "styled-components";
import { Row, Col } from "antd";
import PostCapsule from "./PostCapsule";
import { useSelector } from "react-redux";

const dummyLiveHelp = [
  {
    help_title: "아그야, 오함마 가져와라",
    help_num: "1", // 도움번호
    help_post_dttm: "2020-02-18", // 도움게시일시
    cat_num: "1", // 카테고리번호
    price: "3000", // 금액
    cont: "오함마 내놔", // 내용
    cnsr_num: "1", // 수요자번호
    user_name: "표석훈", // 사용자명
    address: "부산광역시 남구 대연1동", // 주소
    phone_num: "01011010100", // 휴대폰번호
    id: "ironman", // 아이디
    email: "@naver.com", // 이메일
    nickname: "아이언맨", // 닉네임
    pic_path: "", // 사진경로명
    help_aply_cls_dttm: "2020-02-29", // 도움신청마감일시
    help_aprv_whet: "false", // 도움승인여부
    post_num: "1", // 선호공급자수
    post_type: "2020-03-23", // 선호도움이행일시
    exec_loc: "부산광역시 남구 대연1동", // 이행장소
    help_pic_list: "" // 도움사진목록
  },
  {
    help_title: "치킨 배달하실 분 9함",
    help_num: "2",
    help_post_dttm: "2020-02-18",
    cat_num: "4,5,6",
    price: "2000",
    cont: "네네치킨이다",
    cnsr_num: "2",
    user_name: "문건우",
    address: "부산광역시 남구 남천동",
    phone_num: "01011010100",
    id: "mun",
    email: "@naver.com",
    nickname: "순살치킨",
    pic_path: "",
    help_aply_cls_dttm: "2020-02-20",
    help_aprv_whet: "false",
    post_num: "1",
    post_type: "2020-02-21",
    exec_loc: "부산광역시 남구 남천동",
    help_pic_list: ""
  },
  {
    help_title: "보드게임방 같이 가주실 분",
    help_num: "3",
    help_post_dttm: "2020-02-18",
    cat_num: "1",
    price: "5000",
    cont: "보드게임 너무좋아",
    cnsr_num: "3,4,5",
    user_name: "최정은",
    address: "부산광역시 남구 대연1동",
    phone_num: "01011010100",
    id: "choi",
    email: "@naver.com",
    nickname: "주크박스",
    pic_path: "",
    help_aply_cls_dttm: "2020-02-22",
    help_aprv_whet: "false",
    post_num: "3",
    post_type: "2020-02-23",
    exec_loc: "부산광역시 남구 대연1동",
    help_pic_list: ""
  },
  {
    help_title: "홈페이지 만들어주실분",
    help_num: "4",
    help_post_dttm: "2020-01-20",
    cat_num: "1",
    price: "2000000",
    cont: "힘들어요 제발 ",
    cnsr_num: "6,7,8,9,10",
    user_name: "프론트엔드",
    address: "부산광역시 남구 대연3동",
    phone_num: "01011010100",
    id: "frontend",
    email: "@naver.com",
    nickname: "프론트엔드",
    pic_path: "",
    help_aply_cls_dttm: "2020-02-20",
    help_aprv_whet: "false",
    post_num: "5",
    post_type: "2020-02-29",
    exec_loc: "부산광역시 남구 대연3동",
    help_pic_list: ""
  },
  {
    help_title: "서버 만들어주실분",
    help_num: "5",
    help_post_dttm: "2020-01-20",
    cat_num: "1",
    price: "2000000",
    cont: "배우기가 벅차요",
    cnsr_num: "6,7,8,9,10",
    user_name: "프론트엔드",
    address: "부산광역시 남구 대연3동",
    phone_num: "01011010100",
    id: "backend",
    email: "@naver.com",
    nickname: "백엔드",
    pic_path: "",
    help_aply_cls_dttm: "2020-02-20",
    help_aprv_whet: "false",
    post_num: "5",
    post_type: "2020-02-29",
    exec_loc: "부산광역시 남구 대연3동",
    help_pic_list: ""
  },
  {
    help_title: "제발 커밋해주세요",
    help_num: "6",
    help_post_dttm: "2020-02-20",
    cat_num: "1",
    price: "2000",
    cont: "1일 1커밋 너무 좋아!",
    cnsr_num: "6",
    user_name: "프론트엔드",
    address: "부산광역시 남구 대연3동",
    phone_num: "01011010100",
    id: "master",
    email: "@naver.com",
    nickname: "오리진매스터",
    pic_path: "",
    help_aply_cls_dttm: "2020-02-20",
    help_aprv_whet: "true",
    post_num: "1",
    post_type: "2020-02-20",
    exec_loc: "부산광역시 남구 대연3동",
    help_pic_list: ""
  }
];
// 카테고리 번호에 따라 다른 헬프 포스트들을 불러오게 하거나 걸러내게 해야할듯.
const PostList = ({ categoryNum }) => {
  const { helpPosts } = useSelector(state => state.posts);
  return (
    <PostListUpperDiv>
      <Row gutter={[24, 24]}> 
        {helpPosts.map((help, index) => (
          <ColCapsule xs={24} md={12} xl={8} key={index}>
            <PostCapsule data={help} />
          </ColCapsule>
        ))}
      </Row>
    </PostListUpperDiv>
  );
};

const PostListUpperDiv = styled.div`
  padding: 20px 0;
`;
const ColCapsule = styled(Col)`
  display: flex;
  justify-content: center;
`;

export default PostList;
