import React, { useState, useCallback } from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import { Select, DatePicker, TimePicker, Icon, Button, Form } from 'antd';
import SearchJuso from '../map/SearchJuso';
import inputChangeHook from '../../hooks/inputChangeHook';
import Upload from '../uploadImages/Upload';

const categorys = ["심부름", "대여", "잡일"];   //카테고리

const PostWrite = () => {
    const [postTitle, onChangePostTitle] = inputChangeHook(''); //게시글 제목
    const [category, setCategory] = useState('');
    const [postDeadline, setPostDeadline] = useState({date: '', time: ''}); //신청 마감 일시 
    const [dateofExecution, setDateofExecution] = useState({date: '', time: ''});   //수행 일시 
    const [needPersonnel, onChangeNeedPersonnel] = inputChangeHook(0);  //필요 인원
    const [money, onChangeMoney] = inputChangeHook(0);  //금액
    const [location, setLocation] = useState('');   //이행위치
    const [sigungu, setSigungu] = useState('');     //이행시군구명
    const [requirements, onChangeRequirements] = inputChangeHook('');   //요구사항
    const [images, setImages] = useState([]);       //도움 이미지
    const [urls, setUrls] = useState([]);           //도움 이미지 미리보기 위한 url

    // const {helpPosts} = useSelector(state => state.posts);

    const getCategory = useCallback(category => {
        setCategory(category);
    }, []);
    //신청 마감 일시 입력
    const onPostDeadlineDate = useCallback((deadlineDate, dateString) => {
        setPostDeadline({...postDeadline, date: dateString});
    }, [postDeadline]);

    const onPostDeadlineTime = useCallback((deadlineTime, timeString) => {
        setPostDeadline({...postDeadline, time: timeString});
    }, [postDeadline]);

    //수행 일시 입력
    const onExecutionDate = useCallback((executionDate, dateString) => {
        setDateofExecution({...dateofExecution, date: dateString});
    }, [dateofExecution]);

    const onExecutionTime = useCallback((executionTime, timeString) => {
        setDateofExecution({...dateofExecution, time: timeString});
    }, [dateofExecution]);

    const getLocation = useCallback((fullAddress, sigunguName) => {
        setLocation(fullAddress);
        setSigungu(sigunguName);
    }, []);
            
    console.log(sigungu);
    const addPost = useCallback(() => {
        e.preventDefault();
        // if(!postTitle || !postTitle.trim()){
        //     // antd로 경고창 만드셈
        // } 
        
    }, []);

    //일단 이렇게 해놨는데 더 좋게 할 수 있남
    const getUrls = useCallback(data => {
        setUrls(data);
    }, []);

    const getImages = useCallback(data => {
        setImages(data);
    }, []);

    return (
        <Modal>
            <Form onSubmit={addPost}>
            <ContentFlex>
                <Content>
                    <Title>
                        <InputTitle placeholder="제목을 입력하세요." value={postTitle} onChange={onChangePostTitle}/> {/*input 쓰삼 */}
                        <Icon type="close" style={{fontSize: "2vw", color:"#BFC7CE"}}/>
                    </Title>
                    <PostSetting>
                        <div className="postSettingTitle">
                            <div>카테고리</div>
                            <div>신청 마감 일시</div>
                            <div>수행 일시</div>
                            <div>필요인원</div>
                            <div>금액</div>
                        </div>
                        <div className="postSettingDetail">
                            <div className="category">
                                <Select style={{width: 128}} onChange={getCategory}>
                                    {categorys.map((_category, i) => <Select.Option value={_category} key={i}>{_category}</Select.Option>)}
                                </Select>
                            </div>
                            <div className="deadline">
                                <DatePicker style={{marginRight: 5}} onChange={onPostDeadlineDate}/>
                                <TimePicker use12Hours format="h:mm a" onChange={onPostDeadlineTime}/>
                            </div>
                            <div className="executionDate">
                                <DatePicker style={{marginRight: 5}} onChange={onExecutionDate}/>
                                <TimePicker use12Hours format="h:mm a" onChange={onExecutionTime}/>
                            </div>
                            <input type="number" value={needPersonnel} onChange={onChangeNeedPersonnel}/>
                            <input type="number" placeholder="최소 금액 0000원" value={money} onChange={onChangeMoney}/>
                        </div>
                    </PostSetting>
                    <ContentItem>
                        <div>위치</div>  
                        <SearchJuso location={location} getLocation={getLocation}/>
                    </ContentItem>
                    <ContentItem>
                        <div>요구사항</div>
                        <textarea placeholder="요구사항을 입력하세요." required  value={requirements} onChange={onChangeRequirements}/>
                    </ContentItem>
                    <UploadImage>
                        <div>사진첨부</div>
                        <Upload urls={urls} images={images} getUrls={getUrls} getImages={getImages}/>
                        <div className="previewImage">
                            {images.length !== 0 ? urls.map((url, i) => <div className="imgBorder"><Icon type="close" /><img src={url} key={i} alt="미리보기" /></div>) : <></>}
                        </div>
                    </UploadImage>    
                    <UploadButton htmlType="submit">글 올리기</UploadButton>     
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
    top: 0;
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
    width: 31vw;
    height: 80vh;
    display: flex; 
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: scroll;
    ::-webkit-scrollbar{display:none;}  /*스크롤바 안보이게*/
`;

const Content = styled.div`
    width: 29vw;
    height: 78vh;
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
    display: flex;
    justify-content: space-between;

    & .ant-select-arrow{
        color: #FF4300;
    }
    & .ant-calendar-picker-icon{
        margin-top: -1.2vh;
        color: #FF4300;
    }

    & .ant-time-picker-icon{
        color: #FF4300;
        margin-top: -1.2vh;
        margin-left: -4vw;  
    }
    & .ant-select-selection{
        width: 6vw;
        height: 3vh;
    }
    & > .postSettingTitle{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 10vw;    
        font-size: 1.2vw;
    }

    & > .postSettingDetail{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 19vw;

        & > .category {
        margin-bottom: 1vh;
        width: 10vw;
        }

        & > .deadline {
            display: flex;
            justify-content: space-between;
            width: 14vw;
        }

        & > .executionDate {
            display: flex;
            justify-content: space-between;
            width: 14vw;
        }
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
        width: 6vw;
        height: 3vh;
        font-size: 0.7vw;
        margin-bottom: 1vh;
        color: #7a7a7a;
        :focus{
            outline: none;
        }
        ::placeholder{
            color: #BFC7CE;
        }
    }
`;

const InputTitle = styled.input`
    border: none;
    color: #7a7a7a;
    font-size: 2vw;
    width: 29vw;
    ::placeholder{
        color: #BFC7CE;
    }

    :focus{
        outline: none;  
    }
`;

const ContentItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 1vw;
    margin-top: 20px;
    width: 29vw;

    & > textarea {
        width: 29vw;
        height: 15vh;
        resize: none;
        color: #7a7a7a;
        border-color: #d9d9d9;

        ::placeholder{
            color: #BFC7CE;
        }
    }
`;

const UploadImage = styled.div`
    margin-top: 20px;
    width: 29vw;
    font-size: 1vw;

    & .uploadImage {
        font-size: 16px;
        border: 1px solid #BFC7CE;
        border-radius: 5px;
        padding: 5px;
        width: 10vw;
        height: 10vh;
        cursor: pointer;
    }
    & input[type="file"] {
        position:absolute;
        width:1px;
        height:1px;
        padding:0;
        margin:-1px;
        overflow:hidden;
        clip:rect(0,0,0,0);
        border:0;
    }

    & .previewImage {
        display: flex;
        margin-top: 1vh;

        & .imgBorder{
            width: 6vw;
            height: 12vh;
            border: 1px solid #BFC7CE;
            border-radius: 4px;
            margin-right: 1vw;
        }

        & img{
            margin: 0.7vh 0.5vw;
            width: 5vw;
            height: 10.5vh;

            :hover {
                background: #F0F0F0;
                opacity: 0.3;
            }
        }
    }
`;

const UploadButton = styled(Button)`
    width: 13vw;
    height: 4vh;
    margin-top: 20px;
    margin-bottom: 20px;
    background: #FF4300;
    border: #FF4300;
    color: white;
    font-size: 20px;
    box-shadow: 2px 3px 5px #BFC7CE;

    :hover {
        opacity: 0.9;
        background: #FF4300;
        border: #FF4300;
        color: white;
    }

    :focus{
        background: #FF9644;
        border: #FF9644;
        color: white;
    }
`;

export default PostWrite;