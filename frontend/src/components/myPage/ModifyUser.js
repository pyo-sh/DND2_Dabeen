import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
// import { useDispatch, useSelector } from 'react-redux';
import { Button, Upload, message } from 'antd';
import DabeenInput, { check_num,
    check_eng,
    check_spc,
    check_kor,
    check_spa,
} from '../signUp/InputFunctions';
import { inputCheckChangeHook } from '../../hooks/inputChangeHook';

const ModifyUser = () => {
    // 현재 날짜가 필요할 거 같아서..
    const nowDate = new Date();
    // 로그인하는데 유저의 필요한 정보의 state
    const [profileImage, setProfileImage] = useState({});
    const [porfileImageUrl, setPorfileImageUrl] = useState();
    const [nickname, changeNickname] = inputCheckChangeHook('', [check_eng, check_num, check_kor]);   // 닉네임 state
    const [introduce, changeIntroduce] = inputCheckChangeHook("", [/./g]); // 소개 state
    const [password, changePassword] = inputCheckChangeHook('', [check_eng, check_num, check_spc]);   // 비밀번호 state
    const [passwordCheck, changePasswordCheck] = inputCheckChangeHook('', [check_eng, check_num, check_spc]); // 비밀번호 확인 state
    const [email, changeEmail] = inputCheckChangeHook('', [check_eng, check_num, /[@\.]/g]); // 이메일 state
    const [telephone, changeTelephone] = inputCheckChangeHook('', [check_num]);
    const [mainAddress, changeMainAddress] = inputCheckChangeHook('', [check_eng, check_num, check_kor, check_spa, /[,\.:;'"]/g]);
    const [subAddress, changeSubAddress] = inputCheckChangeHook('', [check_eng, check_num, check_kor, check_spa, /[,\.:;'"]/g]);

    // 입력한 정보가 맞는 정보인지 확인하는 state
    const [isNicknameCorrect, setIsNicknameCorrect] = useState(false);  // 닉네임 확인
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);  // 비밀번호 확인
    const [isPasswordChecked, setIsPasswordChecked] = useState(false);  // 비밀번호 확인을 확인
    const [isEmailCorrect, setIsEmailCorrect] = useState(false);  // 이메일 확인

    // 비밀번호와 비밀번호 확인 state가 바뀔 때 마다 확인
    useEffect(() => {
        // 비밀번호가 같을 경우 true / 다를 경우 false
        (password === passwordCheck)    ?   setIsPasswordChecked(true)  :   setIsPasswordChecked(false);
    }, [password, passwordCheck]);
    
    // 가입하기 버튼 눌렀을 때 값을 전달하기 위한 함수
    const onClickModify = useCallback((e) => {
        if(isNicknameCorrect && isPasswordCorrect && isPasswordChecked && isEmailCorrect){
            const userLog = {
                nickname,
                password,
                email,
                telephone,
                mainAddress,
                subAddress,
            }
            
        }
        else{
            alert('회원가입 실패!');
        }
    }, [
        nickname,
        password,
        email,
        telephone,
        mainAddress,
        subAddress,

        isNicknameCorrect,
        isPasswordCorrect,
        isPasswordChecked,
    ]);

    return (
        <ModifyUserUpperDiv>
            <div className="ModifyTitle">회원정보 수정</div>
            <div className="ModifyContent">
                <img
                    className="ModifyUserProfile"
                    alt="UserProfileImage"
                    src={profileImage}
                    />
                <Upload
                    className="ModifyUserProfileChange"
                    name='file'
                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                    showUploadList={false}
                    onChange={useCallback(info => {
                        if (info.file.status !== 'uploading') {
                            console.log(info.file, info.fileList, info);
                        }
                        if (info.file.status === 'done') {
                            message.success(`${info.file.name} file uploaded successfully`);
                            setProfileImage({file: info.file.originFileObj});
                            setPorfileImageUrl(URL.createObjectURL(info.file.originFileObj));
                        } else if (info.file.status === 'error') {
                            message.error(`${info.file.name} file upload failed.`);
                        }
                    }, [])}
                >
                    <img
                    className="ModifyUserProfileChangeIcon"
                    alt="writePost"
                    src={"/images/postIcon.PNG"}
                    />
                </Upload>
                <ModifyUserGetDataDiv>
                    <div className="ModifyUserTitle">닉네임 *</div>
                    <DabeenInput
                        type="text"
                        placeholder="닉네임 입력"
                        value={nickname}
                        onChangeFunc={changeNickname}
                        />
                    {isNicknameCorrect || (nickname === '')
                    ?   <div className="ModifyUserCheck"></div>
                    :   <div className="ModifyUserCheck">닉네임을 알맞게 입력해주세요</div>
                    }
                </ModifyUserGetDataDiv>
                <ModifyUserGetDataDiv>
                    <div className="ModifyUserTitle">소개</div>
                    <DabeenInput
                        type="text"
                        placeholder="나를 다른사람에게 알려보아요"
                        value={introduce}
                        onChangeFunc={changeIntroduce}
                    />
                </ModifyUserGetDataDiv>
                <hr className="Hr"></hr>
                <ModifyUserGetDataDiv>
                    <div className="ModifyUserTitle">비밀번호 *</div>
                    <DabeenInput
                        type="password"
                        placeholder="비밀번호(8~20자리)"
                        value={password}
                        onChangeFunc={changePassword}
                        maxLength={20}
                    />
                    {isPasswordCorrect || (password === '')
                    ?   <div className="ModifyUserCheck"></div>
                    :   <div className="ModifyUserCheck">비밀번호를 알맞게 입력해주세요</div>
                    }
                </ModifyUserGetDataDiv>
                <ModifyUserGetDataDiv>
                    <div className="ModifyUserTitle">비밀번호 확인 *</div>
                    <DabeenInput
                        type="password"
                        placeholder="비밀번호 재입력"
                        value={passwordCheck}
                        onChangeFunc={changePasswordCheck}
                        maxLength={20}
                    />
                    {isPasswordChecked
                    ?   <div className="ModifyUserCheck"></div>
                    :   <div className="ModifyUserCheck">비밀번호를 확인해주세요</div>
                    }
                </ModifyUserGetDataDiv>
                <hr></hr>
                <ModifyUserGetDataDiv>
                    <div className="ModifyUserTitle">이메일 *</div>
                    <DabeenInput
                        type="text"
                        placeholder="이메일 입력"
                        value={email}
                        onChangeFunc={changeEmail}
                    />
                    {isEmailCorrect
                        ?   <div className="ModifyUserCheck"></div>
                        :   <div className="ModifyUserCheck">이메일을 확인해주세요</div>
                    }
                </ModifyUserGetDataDiv>
                <ModifyUserGetDataDiv>
                    <div className="ModifyUserTitle">전화번호 *</div>
                    <DabeenInput
                        type="text"
                        placeholder="'-'를 제외한 숫자"
                        value={telephone}
                        onChangeFunc={changeTelephone}
                    />
                </ModifyUserGetDataDiv>
                <ModifyUserGetDataDiv>
                    <div className="ModifyUserTitle">주소 *</div>
                    <DabeenInput
                        type="text"
                        placeholder="시"
                        value={mainAddress}
                        onChangeFunc={changeMainAddress}
                    />
                    <DabeenInput
                        type="text"
                        placeholder="면/읍/리?"
                        value={subAddress}
                        onChangeFunc={changeSubAddress}
                    />
                    {isEmailCorrect
                        ?   <div className="ModifyUserCheckAll"></div>
                        :   <div className="ModifyUserCheckAll">전부 필수 작성란입니다.</div>
                    }
                </ModifyUserGetDataDiv>
                <div className="ModifyTips">
                    - 아이디, 이름, 생년월일은 수정이 불가능 합니다.
                    <br/>- 닉네임은 변경 후 1개월간 재변경이 불가능합니다.
                    <br/>- 휴대전화 번호 변경 시 반드시 인증을 거쳐야 합니다.
                </div>
                <div className="ModifyBtn">
                    <Button
                        className="ModifyBtnBack"
                        onClick={useCallback(() => Router.push('/mypage'),[])}
                        // loading = {}
                        >취소</Button>
                    <Button
                        className="ModifyBtnAccess"
                        onClick={onClickModify}
                        // loading ={null}
                        >수정</Button>
                </div>
            </div>
        </ModifyUserUpperDiv>
    );
};

const ModifyUserUpperDiv = styled.div`
    & .ModifyTitle{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding-bottom: 25px;
        border-bottom: 1px solid #BFC7CE;
        font-size: 40px;
        font-weight: bold;
    }
    & .ModifyContent{
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 50px 0;
        width: 100%;
        max-width: 600px;
        min-width: 280px;
        /* height: 1120px; */
        & .ModifyUserProfile{
            border: 1px solid #BFC7CE;
            border-radius: 50%;
            width: 150px;
            height: 150px;
        }
        & .ModifyUserProfileChange {
            & .ModifyUserProfileChangeIcon {
                width: 50px;
                cursor: pointer;
                margin-left: 50px;
                margin-right: -50px;
                margin-top: -50px;
            }
        }
        & hr{
            width: 100%;
            color: #d9d9d9;
            border: none;
            border-top: 1px solid #d9d9d9;
            margin: 35px 0;
        }
        & .ModifyTips{
            width: 100%;
            margin: 10px 0;
            max-width: 425px;
            min-width: 270px;
            font-size: 16px;
        }
    }
    & .ModifyBtn{
        display: flex;
        & .ModifyBtnBack{
            width: 100%;
            height: 100vh;
            max-width: 100px;
            max-height: 40px;
            min-width: 60px;
            min-height: 30px;
        }
        & .ModifyBtnAccess {
            width: 100%;
            height: 100vh;
            max-width: 100px;
            max-height: 40px;
            min-width: 60px;
            min-height: 30px;
            background: #FF9644;
        }
    }
`;
const ModifyUserGetDataDiv = styled.div`
    display: flex;
    flex-direction: column;
   
    padding : 5px;
    max-width: 425px;
    min-width: 250px;
    width : 100%;
    
    & .ModifyUserTitle{
        font-weight: bold;
    }
    & .ModifyUserCheck{
        height: 30px;

        color: red;
        align-self: flex-end;
    }
    & .ModifyUserCheckAll{
        margin-top: 20px;
        height: 30px;
        color: red;
        align-self: flex-end;
    }
`;

export default ModifyUser;