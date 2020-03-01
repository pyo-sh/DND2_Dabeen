import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Upload, message } from 'antd';
import DabeenInput, { check_num,
    check_eng,
    check_spc,
    check_kor,
    check_spa,
} from '../signUp/InputFunctions';
import { inputCheckChangeHook } from '../../hooks/inputChangeHook';
import { editUserInfoRequestAction } from '../../reducers/user';
import { ModifyUserGetDataDiv, ModifyUserUpperDiv } from './ModifyUser.style';
import { getCookie } from '../../utils/cookieFunction';
import customAxios from '../../utils/axiosBase';
import SearchJuso from '../map/SearchJuso';

const ModifyUser = ({ userInfo, onClickCancel }) => {
    const dispatch = useDispatch();
    // 현재 날짜가 필요할 거 같아서..
    const nowDate = new Date();
    // 로그인하는데 유저의 필요한 정보의 state
    const [profileImage, setProfileImage] = useState([]);
    const [nickname, changeNickname] = inputCheckChangeHook(userInfo.nickName, [check_eng, check_num, check_kor]);   // 닉네임 state
    const [introduce, changeIntroduce] = inputCheckChangeHook(userInfo.introduce, [/./g]); // 소개 state
    const [password, changePassword] = inputCheckChangeHook('', [check_eng, check_num, check_spc]);   // 비밀번호 state
    const [passwordCheck, changePasswordCheck] = inputCheckChangeHook('', [check_eng, check_num, check_spc]); // 비밀번호 확인 state
    const [email, changeEmail] = inputCheckChangeHook(userInfo.email, [check_eng, check_num, /[@\.]/g]); // 이메일 state
    const [telephone, changeTelephone] = inputCheckChangeHook(userInfo.phoneNumber, [check_num]);
    const [address, changeAddress] = inputCheckChangeHook(userInfo.address, [check_eng, check_num, check_kor, check_spa, /[,\.:;'"]/g]);
    // 입력한 정보가 맞는 정보인지 확인하는 state
    const [isPasswordChecked, setIsPasswordChecked] = useState(false);  // 비밀번호 확인을 확인
    const imageInput = useRef();

    // 비밀번호와 비밀번호 확인 state가 바뀔 때 마다 확인
    useEffect(() => {
        // 비밀번호가 같을 경우 true / 다를 경우 false
        (password === passwordCheck)    ?   setIsPasswordChecked(true)  :   setIsPasswordChecked(false);
    }, [password, passwordCheck]);
    
    // 가입하기 버튼 눌렀을 때 값을 전달하기 위한 함수
    const onClickModify = useCallback((e) => {
        if(passwordCheck){
            const userLog = {
                id: userInfo.userId,
                nickname,
                password,
                email,
                telephone,
                address,
            }
            dispatch(editUserInfoRequestAction({userLog, cookie : getCookie()}));
        }
        else{
            alert('회원가입 실패!');
        }
    }, [
        nickname,
        password,
        email,
        telephone,
        address,
    ]);

    const onChangeImages = useCallback(async (e) => {
        const imageFormData = new FormData();
        // console.log(e.target.files[0]);
        imageFormData.append('pic', e.target.files[0]);
        // console.log(imageFormData.get('pic'));
        try{
            const result = await customAxios.post('/pic/upload/user', imageFormData, {headers : {Authorization: `Bearer ${getCookie()}`}});
            console.log(result);
            setProfileImage(prev => [...prev, result.data.data]);
        }catch(e){
            console.log(e.response);
        }
    }, []);

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    return (
        <ModifyUserUpperDiv>
            <div className="ModifyTitle">회원정보 수정</div>
            <div className="ModifyContent">
                <img
                    className="ModifyUserProfile"
                    alt="UserProfileImage"
                    src={profileImage}
                />
                <input type="file" hidden ref={imageInput} onChange={onChangeImages}/>
                <img
                    className="ModifyUserProfileChangeIcon"
                    alt="writePost"
                    src={"/images/postIcon.PNG"}
                    onClick={onClickImageUpload}
                />
                {/* <Upload
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
                </Upload> */}
                <ModifyUserGetDataDiv>
                    <div className="ModifyUserTitle">닉네임 *</div>
                    <DabeenInput
                        type="text"
                        placeholder="닉네임 입력"
                        value={nickname}
                        onChangeFunc={changeNickname}
                        />
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
                    <SearchJuso location={address} setLocation={changeAddress}/>
                    {/* <DabeenInput
                        type="text"
                        placeholder="시 면/읍/리"
                        value={address}
                        onChangeFunc={changeAddress}
                    /> */}
                </ModifyUserGetDataDiv>
                <div className="ModifyTips">
                    - 아이디, 이름, 생년월일은 수정이 불가능 합니다.
                    <br/>- 닉네임은 변경 후 1개월간 재변경이 불가능합니다.
                    <br/>- 휴대전화 번호 변경 시 반드시 인증을 거쳐야 합니다.
                </div>
                <div className="ModifyBtn">
                    <Button
                        className="ModifyBtnBack"
                        onClick={onClickCancel}
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

export default ModifyUser;