import { useState, memo, useCallback } from 'react';
import {CustomInput} from './InputFunctions.style';
import { Icon } from 'antd';

// 문자열내용을 전달하기 위함
export const check_num = /[0-9]/g; // 숫자
export const check_eng = /[a-z|A-Z]/g; // 문자
export const check_spc = /[~!@#$%^&*()_+|<>?:{}]/g; // 특수문자
export const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g; // 한글
export const check_spa = /(\s)/g;             // 공백

// 아이디 = 허용 : [영어 / 숫자], 불가 : [공백, 한글, 특수문자]
// 비밀번호 = 허용 : [영어 / 숫자 / 특수문자], 불가 : [공백, 한글]
// 닉네임 = 허용 : [영어 / 한글 / 숫자], 불가 : [특수문자, 공백]
// 이름 = 허용 : [영어 / 한글 / 공백], 불가 : [특수문자, 숫자]
// 이메일 = 허용 : [영어 / 숫자 / @], 불가 : [특수문자, 한글, 공백]
// 전화번호 = 허용 : [숫자], 불가 : [나머지]
// 주소 = 허용 : [한글 / 숫자 / 영어 / 공백 / ,.:], 불가 : [특수문자]

const DabeenInput = memo(({type, placeholder, value, onChangeFunc, maxLength}) => {
    const [lookType, setLookType] = useState(type);
    const onClickIcon = useCallback((e) => {
        if(lookType==="password")
            setLookType("text");
        else
            setLookType("password");
    }, [lookType]);
    return (
        <CustomInput>
            <input
                type={lookType}
                placeholder={placeholder}
                value={value}
                onChange={onChangeFunc}
                maxLength={maxLength ? maxLength : 524288}
                required
            />
            {type==="password"
            ?   <Icon
                    type={lookType === "password" ? "eye-invisible" : "eye"}
                    onClick={onClickIcon}
                    />
            :   null
            }
        </CustomInput>
    );
})

export default DabeenInput;