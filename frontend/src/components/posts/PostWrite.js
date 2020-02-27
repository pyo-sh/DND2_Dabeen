import React, { useState, useCallback, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Select,  DatePicker, TimePicker, Icon, Button, Form, message } from 'antd';
import SearchJuso from '../map/SearchJuso';
import inputChangeHook from '../../hooks/inputChangeHook';
import { addHelpPostRequestAction } from '../../reducers/posts';
import {Modal, Content, Title, PostSetting, PostSettingBox, InputTitle, ContentItem, UploadImage, UploadButton} from './PostWrite.style';
import axios from 'axios';
import moment from 'moment';

const categorys = {
    "심부름": "1000",
    "대여": "2000",
    "잡일": "3000"
} //카테고리

const PostWrite = ({setInvisible, userNum}) => {
    const [postTitle, onChangePostTitle] = inputChangeHook(''); //게시글 제목
    const [category, setCategory] = useState('');
    const [helpDeadlineDate, setHelpDeadlineDate] = useState(''); //신청 마감 날짜
    const [helpDeadlineTime, setHelpDeadlineTime] = useState(''); //신청 마감 시간
    const [helpExecDate, setHelpExecDate] = useState('');   //수행 날짜
    const [helpExecTime, setHelpExecTime] = useState('');   //수행 시간
    const [needPersonnel, onChangeNeedPersonnel] = inputChangeHook(0);  //필요 인원
    const [money, onChangeMoney] = inputChangeHook(0);  //금액
    const [location, setLocation] = useState('');   //이행위치
    const [sigungu, setSigungu] = useState('');     //이행시군구명
    const [content, onChangeContent] = inputChangeHook('');   //요구사항
    const [images, setImages] = useState([]);       //도움 이미지
    // const {imagePaths} = useSelector(state => state.posts);
    const dispatch = useDispatch();
    const imageInput = useRef();
    const time = moment();

    const getCategory = useCallback(category => {
        // console.log(result);
        setCategory(categorys[category]);
    }, []);

    const onChangeHelpPicker = setStateFunc =>
    useCallback((moment, string) => {
      setStateFunc(string);
    }, []);

    const getLocation = useCallback((fullAddress, sigunguName) => {
        setLocation(fullAddress);
        setSigungu(sigunguName);
    }, []);
    
    //게시글 업로드
    const addPost = useCallback((e) => {
        e.preventDefault();
        if(!postTitle || !postTitle.trim()){
            message.error('제목을 입력해주세요!');
        } 
        dispatch(addHelpPostRequestAction({
            todayDate: time.format('YYYY-MM-DDTHH:mm:ss'),
            userNum: userNum,
            postName: postTitle,
            category: category,
            helpDeadline: helpDeadlineDate.concat('T' + helpDeadlineTime),
            helpExec: helpExecDate.concat('T' + helpExecTime),
            postNum: parseInt(needPersonnel),
            price: parseInt(money),
            execLoc: location,
            sigungu: sigungu,
            content: content
        }));
        setInvisible();
    }, [time, userNum, postTitle, category, helpDeadlineDate, helpDeadlineTime, helpExecDate, helpExecTime, needPersonnel, money, location, sigungu, content]);

    //이미지 삭제
    // const deleteImage = useCallback(key => e =>{
    //     setUrls(urls.filter(url => url.key !== key));
    //     setImages(images.filter(image => image.key !== key));
    // }, [urls, images]);

    const onChangeImages = useCallback(async (e) => {
        const imageFormData = new FormData();
        // console.log(e.target.files[0]);
        imageFormData.append('pic', e.target.files[0]);
        // console.log(imageFormData.get('pic'));
        try{
            const result = await axios.post('/pic/upload/help', imageFormData);
            console.log(result);
            setImages(prev => [...prev, result.data.data]);
        }catch(e){
            console.log(e.response);
        }
    }, []);
    console.log(images);
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    return (
        <Modal>
            <Form onSubmit={addPost} style={{width: "50%", maxWidth: 600, minWidth: 300}} encType="multipart/form-data">
                <Content>
                    <Title>
                        <InputTitle placeholder="제목을 입력하세요." value={postTitle} onChange={onChangePostTitle}/> {/*input 쓰삼 */}
                        <Icon onClick={setInvisible} type="close" style={{fontSize: 35, color:"#BFC7CE", marginRight: 10}}/>
                    </Title>
                    <PostSetting>
                        <PostSettingBox>
                            <div className="postSettingTitle">카테고리</div>
                            <Select className="postSettingSelect" placeholder="Category" onChange={getCategory}>
                                {Object.keys(categorys).map((_category) => <Select.Option value={_category} key={_category}>{_category}</Select.Option>)}
                            </Select>
                        </PostSettingBox>
                        <PostSettingBox>
                            <div className="postSettingTitle">신청 마감 일시</div>
                            <div className="postSettingGetData">
                                <DatePicker className="postSettingDatePicker" format="YYYY-MM-DD"style={{marginRight: 5}}  onChange={onChangeHelpPicker(setHelpDeadlineDate)}/>
                                <TimePicker className="postSettingTimePicker" format="HH:mm:ss" onChange={onChangeHelpPicker(setHelpDeadlineTime)}/>
                            </div>
                        </PostSettingBox>
                        <PostSettingBox>
                            <div className="postSettingTitle">수행 일시</div>
                            <div className="postSettingGetData">
                                <DatePicker className="postSettingDatePicker" format="YYYY-MM-DD" style={{marginRight: 5}} onChange={onChangeHelpPicker(setHelpExecDate)}/>
                                <TimePicker className="postSettingTimePicker" format="HH:mm:ss" onChange={onChangeHelpPicker(setHelpExecTime)}/>
                            </div>
                        </PostSettingBox>
                        <PostSettingBox>
                            <div className="postSettingTitle">필요인원</div>
                            <input className="postSettingInput" type="number" value={needPersonnel} onChange={onChangeNeedPersonnel}/>
                        </PostSettingBox>
                        <PostSettingBox>
                            <div className="postSettingTitle">금액</div>
                            <input className="postSettingInput" type="number" placeholder="최소 금액 0000원" value={money} onChange={onChangeMoney}/>
                        </PostSettingBox>
                    </PostSetting>
                    <ContentItem>
                        <div>위치</div>  
                        <SearchJuso location={location} getLocation={getLocation}/>
                    </ContentItem>
                    <ContentItem>
                        <div>요구사항</div>
                        <textarea placeholder="요구사항을 입력하세요." required  value={content} onChange={onChangeContent}/>
                    </ContentItem>
                    <UploadImage>
                        <div>사진첨부</div>
                            <input type="file"  hidden ref={imageInput} onChange={onChangeImages}/>
                            {/* 업로드버튼 새로 만드세영^_^ */}
                            <Button onClick={onClickImageUpload}><Icon type="upload" />Upload</Button>
                            <div className="previewImage">
                                {images.map((v, i) => {
                                    return (
                                    <div key={v} className="imgBorder"> 
                                    <div className="deleteIcon">
                                        <Icon type="close" />
                                    </div>
                                    <img src={v} alt={v} width="90" height="90"/> 
                                    </div>
                                    )
                                })}
                            </div>
                    </UploadImage>
                    <div style={{height:"auto"}}>    
                    <UploadButton htmlType="submit">글 올리기</UploadButton>     
                    </div>
                </Content>                  
            </Form>
        </Modal>
    );
};

export default PostWrite;