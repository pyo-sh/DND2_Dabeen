import React, { useState, useCallback, useEffect, useRef } from 'react';
import { RegistSupplierUpperDiv, RegistSupplierLowerDiv, Icons, RegistButton, UploadProfile,  UploadImage } from '../pagesStyles/regist.style';
import { Icon } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import { applyDabeenerRequestAction } from '../reducers/user';
import { getCookie } from '../utils/cookieFunction';
import customAxios from '../utils/axiosBase';

// 공급자 등록 창
const Regist = () => {
    const { me, applyDabeenerSuccess } = useSelector(state => state.user);
    const imageInput = useRef();
    const juminInput = useRef();

    useEffect(() => {
        if (!me) {
            alert('로그인을 하셔야합니다.');
            Router.push('/');
        }
        else if(me.userRole === 'y'){
            alert('이미 다비너입니다.');
            Router.push('/');
        }
    }, []);

    useEffect(() => {
        if(applyDabeenerSuccess){
            alert('다비너 신청 되었습니다.')
            Router.push('/');
        }
    }, [applyDabeenerSuccess]);
    
    const dispatch = useDispatch();
    // const [previewImage, setPreviewImage] = useState(me.pic); // 유저 프로필
    const [userImage, setUserImage] = useState(me.picPath);
    const [juminImage, setJuminImage] = useState('');

    const onClickProfileUpload = useCallback((inputRef) => () => {
        inputRef.current.click();
    }, []);

    const onChangeProfile = useCallback(async (e) => {
        const profileFormData = new FormData();
        profileFormData.append('pic', e.target.files[0]);
        try {
            const result = await customAxios.post('/pic/upload/user', profileFormData, {headers : {Authorization: `Bearer ${getCookie()}`}});
            setUserImage(result.data.data);
        } catch(e) {
            console.error(e);
        }
    }, []);
    
    const onChangeJumin = useCallback(async (e) => {
        const juminFormData = new FormData();
        juminFormData.append('pic', e.target.files[0]);
        try {
            const result = await customAxios.post('/pic/upload/rrn', juminFormData,  {headers : {Authorization: `Bearer ${getCookie()}`}})
            setJuminImage(result.data.data);
        } catch(e){
            console.log(e.response);
        }
    }, []);

    const deleteImage = useCallback(async () => {
        try{
            await axios.post('/pic/delete', juminImage, {headers : {Authorization: `Bearer ${getCookie()}`}});
            setJuminImage('');
        }
        catch(e){
            console.error(e);
        }
    }, [juminImage]);

    const onClickApply = useCallback(() => {
        dispatch(applyDabeenerRequestAction({userNum : me.userNum, userImage, juminImage, cookie : getCookie()}));
    }, [userImage, juminImage]);

    return (
        <RegistSupplierUpperDiv>
            <div className="RegistSupplierTitle">
                <div className="RegistSupplierTitleMain">다비너 등록</div>
                <div className="RegistSupplierTitleSub">* 필수</div>
            </div>
            <div className="RegistSupplierContent">
                <RegistSupplierLowerDiv>
                    <div className="RegistSupplierLowerTitle">다비너란?</div>
                    <div className="RegistSupplierLowerScript">
                        이웃들의 여러 어려움을 도와주고 소소한 금전적인 보상을 받는 사람들을 말합니다.
                        아래의 간단한 인증과정 후 심사를 거쳐 다비너가 되어보세요.
                    </div>
                </RegistSupplierLowerDiv>
                <RegistSupplierLowerDiv>
                    <div className="RegistSupplierLowerTitle">프로필 사진*</div>
                    <div className="RegistSupplierLowerDetail">
                        <div className="RegistSupplierLowerDetailDescription">
                            다비너에 대한 사용자의 신뢰도를 위해 더 자세한 프로필 사진이 필요합니다.
                            <br />
                            당신의 얼굴이 나온 사진으로 프로필 사진을 변경해 주세요!
                            <br />
                            <div className="RegistSupplierLowerDetailWarning">* 얼굴이 나오지 않은 증명사진 / 캐릭터 / 단순배경 / 동물은 승인되지 않습니다.<div /></div>
                            <div className="RegistSupplierLowerDetailIcon">
                                <Icons type="stop" />
                                <Icons type="stop" />
                                <Icons type="stop" />
                                <Icons type="stop" />
                            </div>
                        </div>
                        <div className="RegistSupplierLowerImageUpload">
                        <UploadProfile>
                        <div>프로필사진 첨부</div>
                            <img
                            className="ModifyUserProfile"
                            alt="유저 프로필"
                            src={userImage || '/images/defaultProfile.png'}
                            />
                            <input type="file" hidden ref={imageInput} onChange={onChangeProfile}/>
                            <img
                            className="ModifyUserProfileChangeIcon"
                            alt="writePost"
                            src={"/images/postIcon.PNG"}
                            onClick={onClickProfileUpload(imageInput)}
                           />
                    </UploadProfile>
                        </div>
                    </div>
                </RegistSupplierLowerDiv>
                
                <RegistSupplierLowerDiv>
                    <div className="RegistSupplierLowerTitle">인증</div>
                    <div className="RegistSupplierLowerDetail">
                        <div className="RegistSupplierLowerDetailDescription">
                            안전한 서비스를 위해 다비너의 신원을 파악할 필요가 있습니다.
                            <br />
                            주민등록번호 뒷자리와 주소를 가린 주민등록증을 보내주세요!
                            <br/>
                            <b>예시</b>
                            <br/>
                            <img src='/images/jumin.png' alt='주민등록증 예시' />
                        </div>
                    </div>
                    <div className="RegistSupplierLowerJuminUpload">
                    <UploadImage>
                        <div>주민등록증 첨부</div>
                            <div className="uploadImageFlex">
                            {!juminImage ?
                            <>
                             <input type="file" hidden ref={juminInput} onChange={onChangeJumin}/> {/* 사진 있으면 안나오게 만들거임 */}
                             <div className="uploadImageButton" onClick={onClickProfileUpload(juminInput)}>
                                 <Icon type="plus-circle" style={{fontSize: 25}}/>
                                 <div style={{fontSize: 23}}>UPLOAD</div>
                             </div></> :  
                             <div className="previewImage">
                                <div className="imgBorder"> 
                                    <div className="deleteIcon" onClick={deleteImage(juminImage)}>
                                        <Icon type="close" />
                                    </div>
                                    <img src={juminImage} alt="주민번호 미리보기" width="90" height="90"/> 
                                </div> 
                            </div>}      
                            </div>
                    </UploadImage>
                        </div>
                </RegistSupplierLowerDiv>
                <RegistButton onClick={onClickApply}>등록하기</RegistButton>
            </div>
        </RegistSupplierUpperDiv>
    );
};

export default Regist;