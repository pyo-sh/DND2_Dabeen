import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import { Avatar, Button, Icon, Upload, message, Modal } from 'antd';

// 공급자 등록 창
const RegistSupplier = () => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [userPicture, setUserPicture] = useState(null);
    
    const onChangeDragger = useCallback((info) => {
        const { status } = info.file;
        setUserPicture([info.file]);        // 항상 설정해야 한다.
        if (status !== 'uploading') {
            setPreviewImage(info.file);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        }
        else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }, [])

    const onPreviewDragger = useCallback(file => {
        // if (!file.url && !file.preview) {
        //     file.preview = await getBase64(file.originFileObj);
        // }
        console.dir(file)
        setPreviewVisible(true);
        setPreviewImage(file.thumbUrl);
    }, []);

    const handleCancel = useCallback(() => {
        setPreviewVisible(false);
    }, []);

    return (
        <RegistSupplierUpperDiv>
            <div className="Title">
                <div className="Title-Main">다비너 등록</div>
                <div className="Title-Sub">* 필수</div>
            </div>
            <div className="Content">
                <RegistSupplierLowerDiv>
                    <div className="Table-Title">다비너란?</div>
                    <div className="Table-Script">
                        이웃들의 여러 어려움을 도와주고 소소한 금전적인 보상을 받는 사람들을 말합니다.  
                        아래의 간단한 인증과정 후 심사를 거쳐 다비너가 되어보세요.
                    </div>
                </RegistSupplierLowerDiv>
                <RegistSupplierLowerDiv>
                    <div className="Table-Title">프로필 사진*</div>
                    <div className="Table-Detail">
                        <div className="Table-Detail-Description">
                            다비너에 대한 사용자의 신뢰도를 위해 더 자세한 프로필 사진이 필요합니다.
                            <br/>
                            당신의 얼굴이 나온 사진으로 프로필 사진을 변경해 주세요!
                            <br/>
                            <div className="Table-Detail-Description-Warning">* 얼굴이 나오지 않은 증명사진 / 캐릭터 / 단순배경 / 동물은 승인되지 않습니다.<div/></div>
                            <div className="Table-Detail-Description-Icon">
                                <Icons type="stop"/>
                                <Icons type="stop"/>
                                <Icons type="stop"/>
                                <Icons type="stop"/>
                            </div>
                        </div>
                        <div className="Table-Detail-ImageDragger">
                            <Upload.Dragger
                                name={'file'}
                                action={'https://www.mocky.io/v2/5cc8019d300000980a055e76'}
                                fileList={userPicture}          // 업로드한 파일 자체를 저장(중복 허용X를 위함)
                                onChange={onChangeDragger}      
                                onPreview={onPreviewDragger}
                                listType={"picture-card"}
                                multiple={false}
                                >
                                <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                                <Avatar className="Table-Profile" size={150} icon="user"/>
                            </Upload.Dragger>
                        </div>
                    </div>
                </RegistSupplierLowerDiv>
                <RegistSupplierLowerDiv>
                    <div className="Table-Title">인증</div>
                    <div className="Table-Detail">
                        <div className="Table-Detail-Description">
                            안전한 서비스를 위해 다비너의 신원을 파악할 필요가 있습니다.
                            <br/>
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
    margin: 90px auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    max-width: 600px;
    min-width: 320px;

    & .Title{
        width: 100%;

        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        font-weight: bold;

        & .Title-Main{
            font-size: 50px;
        }
        & .Title-Sub{
            font-size: 25px;
        }
    }
    & .Content{
        width: 100%;
        padding: 50px;

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
    & .Table-Title{
        padding-bottom: 10px;
        font-size: 28px;
        font-weight: bold;
    }
    & .Table-Script{
        padding-top: 5px;
        padding-bottom: 20px;
        border-bottom: 1px solid #d9d9d9;
        margin-bottom: 20px;
        font-size: 20px;
    }
    & .Table-Detail-Description{
        border-radius: 4px;
        padding: 10px;
        margin-bottom: 10px;
        font-size: 18px;
        background: #F0F0F0;

        & .Table-Detail-Description-Warning{
            color: #FF4400;
            font-size: 14px;
            padding: 3px 0;
            & .Table-Detail-Description-Icon{
                
            }
        }
        & .Table-Detail-ImageDragger{
            width: 200px;
            height: 200px;
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
    background: #FF9644;
`;

export default RegistSupplier;