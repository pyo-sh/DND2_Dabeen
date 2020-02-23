import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import { Avatar, Button, Icon, Upload, message } from 'antd';

// 공급자 등록 창
const Regist = () => {
    const [previewImage, setPreviewImage] = useState('');
    const [userImage, setUserImage] = useState(null);

    const onChangeDragger = useCallback((info) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList, info);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            setUserImage({ file: info.file.originFileObj });
            setPreviewImage(URL.createObjectURL(info.file.originFileObj));
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }, [])

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
                            <Upload.Dragger
                                className="RegistSupplierLowerImageChange"
                                name={'file'}
                                action={'https://www.mocky.io/v2/5cc8019d300000980a055e76'}
                                onChange={onChangeDragger}
                                multiple={false}
                                showUploadList={false}
                            >
                                {previewImage
                                    ? <img src={previewImage} className="RegistSupplierLowerImage" />
                                    : <div className="RegistSupplierLowerImage"></div>
                                    // :   <Avatar className="RegistSupplierLowerImage" size={150} icon="user"/>
                                }
                                <img
                                    className="RegistSupplierLowerImageIcon"
                                    alt="writePost"
                                    src={"/images/postIcon.PNG"}
                                />
                            </Upload.Dragger>
                        </div>
                    </div>
                </RegistSupplierLowerDiv>
                <RegistSupplierLowerDiv>
                    <div className="RegistSupplierLowerTitle">인증</div>
                    <div className="RegistSupplierLowerDetail">
                        <div className="RegistSupplierLowerDetailDescription">
                            안전한 서비스를 위해 다비너의 신원을 파악할 필요가 있습니다.
                            <br />
                            입력된 주민등록번호는 신원을 파악하는 용도 외에는 사용되지 않습니다.
                        </div>
                    </div>
                </RegistSupplierLowerDiv>
                <RegistButton>등록하기</RegistButton>
            </div>
        </RegistSupplierUpperDiv>
    );
};

const RegistSupplierUpperDiv = styled.div`
    margin: 20px auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    max-width: 600px;
    min-width: 320px;

    & .RegistSupplierTitle{
        width: 100%;

        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        font-weight: bold;

        & .RegistSupplierTitleMain{
            font-size: 45px;
        }
        & .RegistSupplierTitleSub{
            font-size: 25px;
        }
    }
    & .RegistSupplierContent{
        width: 100%;
        padding: 40px 25px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        border: 1px solid #d9d9d9;
    }
`

const RegistSupplierLowerDiv = styled.div`
    width: 100%;
    margin: 10px 0;
    & .RegistSupplierLowerTitle{
        padding-bottom: 10px;
        font-size: 28px;
        font-weight: bold;
    }
    & .RegistSupplierLowerScript{
        padding-top: 5px;
        padding-bottom: 20px;
        border-bottom: 1px solid #d9d9d9;
        margin-bottom: 20px;
        font-size: 20px;
    }
    & .RegistSupplierLowerDetailDescription{
        border-radius: 4px;
        padding: 10px;
        margin-bottom: 10px;
        font-size: 18px;
        background: #F0F0F0;

        & .RegistSupplierLowerDetailWarning{
            color: #FF4400;
            font-size: 14px;
            padding: 3px 0;
            & .RegistSupplierLowerDetailIcon{
                
            }
        }
    }
    & .RegistSupplierLowerImageUpload{
        width: 170px;
        height: 170px;
        padding: 10px;
        & .RegistSupplierLowerImage{
            border-radius: 50%;
            width: 150px;
            height: 150px;
            margin-left: -2px;
            margin-top: -2px;
        }
        & .RegistSupplierLowerImageChange{
            width: 148px;
            height: 148px;
            border-radius: 50%;
            & span{
                padding: 0;
            }
        }
        & .RegistSupplierLowerImageIcon{
            width: 50px;
            cursor: pointer;
            margin-left: 50px;
            margin-right: -50px;
            margin-top: -50px;
        }
    }
`;
const Icons = styled(Icon)`
    font-size: 50px;
    padding-right: 5px;
`;
const RegistButton = styled(Button)`
    width: 280px;
    height: 50px;
    margin-top: 20px;
    color: white;
    background: #ff4300;
`;

export default Regist;