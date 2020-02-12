import React, { useState, useCallback } from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import { Select, DatePicker, TimePicker, Upload, Icon, Button, Form } from 'antd';

const categoryValue = ["심부름", "대여", "잡일"];   //카테고리

const format = 'HH:mm';
const Option = {Select};

const PostWrite = () => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [postDeadline, setPostDeadline] = useState({});
    const [executionDate, setExecutionDate] = useState({})
    const {helpPosts} = useSelector(state => state.posts);
    
    // const getBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //       const reader = new FileReader();
    //       reader.readAsDataURL(file);
    //       reader.onload = () => resolve(reader.result);
    //       reader.onerror = error => reject(error);
    //     });
    // }

    // const handleCancel = useCallback(() => {
    //     setPreviewVisible(false);
    // }, []);

    // const handlePreview = useCallback(file => () => {
    //     if (!file.url && !file.preview) {
    //     file.preview = getBase64(file.originFileObj);
    //     }
        
    //     setPreviewImage(file.url || file.priview)
    //     setPreviewVisible(true);
    // },[file]);

    const handleChange = useCallback(({ fileList }) => () => {
        setFileList({fileList});
    },[fileList]);

    const uploadButton = (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">Upload</div>
        </div>
    );

    const addPost = useCallback(() => {

    }, []);

    return (
        <Modal>
            <Form onSubmit={addPost}>
            <ContentFlex>
                <Content>
                    <Title>
                        <InputTitle placeholder="제목을 입력하세요." value={} onChange={}/> {/*input 쓰삼 */}
                        <Icon type="close" style={{fontSize: 25, color:"#BFC7CE"}}/>
                    </Title>
                    <PostSetting>
                        <div className="category">
                            <div>카테고리</div>
                            <Select style={{width: 128}}>
                                {categoryValue.map(category => <Option value={category}>{category}</Option>)}
                            </Select>
                        </div>
                        <div className="deadline">
                            <div>신청 마감 일시</div>
                            <div>
                                <DatePicker style={{marginRight: 5}} value={}/>
                                <TimePicker format={format} value={}/>
                            </div>
                        </div>
                        <div className="executionDate">
                            <div>수행 일시</div>
                            <div>
                                <DatePicker style={{marginRight: 5}}/>
                                <TimePicker format={format}/>
                            </div>
                        </div>
                        <div className="needPersonnel">
                            <div>필요인원</div>
                            <input type="number" value={} onChange={}/>
                        </div>
                        <div className="money">
                            <div>금액</div>
                            <input type="number" placeholder="최소 금액 0000원" value={} onChange={}/>
                        </div>
                    </PostSetting>
                    <ContentItem>
                        <div>위치</div>
                        <div style={{border: "solid", width: 300, height: 300}}>카카오맵 API 쓰면 됨...............</div>
                    </ContentItem>
                    <ContentItem>
                        <div>요구사항</div>
                        <textarea id="requirement" placeholder="요구사항을 입력하세요." required />
                    </ContentItem>
                    <UploadImage>
                        <div style={{width: "5vw"}}>사진첨부</div>
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            // onPreview={handlePreview}
                            onChange={handleChange}
                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                    </UploadImage>    
                    <UploadButton>글 올리기</UploadButton>     
                </Content>                  
            </ContentFlex>
            </Form>
        </Modal>
    );
};

const Modal = styled.div`
    background: rgba(0, 0, 0, 0.25);
    position: fixed;
    left: 0;
    top: 30;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ContentFlex = styled.div`
    font-size: 20px;
    color: #424242;
    background: white;
    padding: 1rem;
    width: 33vw;
    height: 87vh;
    display: flex; 
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: scroll;
    ::-webkit-scrollbar{display:none;}  /*스크롤바 안보이게*/
`;

const Content = styled.div`
    width: 29vw;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
`;

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    width: 29vw;
`;

const PostSetting = styled.div`
    width: 29vw;
    height: 27vh;
    background: #F0F0F0;
    font-size: 20px;
    padding-top: 10px;
    padding-left: 20px;

    & .ant-select-arrow{
        color: #FF4300;
    }
    & .ant-calendar-picker-icon{
        color: #FF4300;
    }

    & .ant-time-picker-icon{
        color: #FF4300;
    }

    & > .category {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1vh;
        width: 250px;
    }

    & > .deadline {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1vh;
        width: 383px;
    }

    & > .executionDate {
        display: flex;
        justify-content: space-between; 
        margin-bottom: 1vh;
        width: 383px;
    }

    & > .needPersonnel {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1vh;
        width: 250px;
    }
    
    /* input type="number"일 경우 생기는 화살표 제거 */
    & input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    & input {
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        width: 128px;
        height: 32px;
        font-size: 14px;
        color: #7a7a7a;
        :focus{
            outline: none;
        }
        ::placeholder{
            color: #BFC7CE;
        }
    }

    & > .money{
        display: flex;
        justify-content: space-between;
        margin-bottom: 1vh;
        width: 250px;
    }
`;

const InputTitle = styled.input`
    border: none;
    color: #7a7a7a;
    font-size: 40px;
    width: 29vw;
    ::placeholder{
        color: #BFC7CE;
    }
`;

const ContentItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 20px;
    margin-top: 20px;
    width: 29vw;

    & > textarea {
        width: 29vw;
        height: 15vh;
        resize: none;
        color: #7a7a7a;
        ::placeholder{
            color: #BFC7CE;
        }
    }
`;

const UploadImage = styled.div`
    display: flex;
    margin-top: 20px;
    width: 29vw;
`;

const UploadButton = styled(Button)`
    width: 15vw;
    margin-top: 20px;
    margin-bottom: 20px;
    background: #FF4300;
    border: #FF4300;
    color: white;
    font-weight: bold;
    font-size: 20px;
    box-shadow: 2px 3px 5px #BFC7CE;

    :hover {
        opacity: 0.9;
        background: #FF4300;
        border: #FF4300;
        color: white;
    }
`;

export default PostWrite;