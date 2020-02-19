import React from 'react';
import Introduce from '../components/myPage/Introduce';
const myInfomation = {
    id : "ansrjsdn",
    nickname : "닉네임",
    introduce : "소개글이 표기되는 공간입니다. 최대 3줄의 글자를 표기할 수 있습니다. 소개글이 표기되는 공간입니다. 최대 3줄의 글자를 표기할 수 있습니다.ㅎㅎㅎㅎㅎ",
    totalHelp : 10,
    totalScore : 4.75,
    totalRevenu : 25000,
    location : "부산 광역시",
    isDabeener : false,
}
const evaluation = [
    {
        id : 1,
        profile : null,
        nickname : "아이언맨",
        score : 4.5,
        date : "2020-02-02",
        comment : "토르 망치인줄 알았습니다. 망치 좋네요."
    },
    {
        id : 2,
        profile : null,
        nickname : "캡틴 아메리카",
        score : 4.0,
        date : "2020-02-10",
        comment : "으어어어어!!"
    }
]
const MyPage = () => {
    // 다비인지 아닌지 체크..! useEffect 같은거 사용해서!
    return (
        <>
            <Introduce myInfomation={myInfomation} evaluation={evaluation}/>
        </>
    );
};

export default MyPage;