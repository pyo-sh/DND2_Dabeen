import React, { useState, useCallback, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Select,  DatePicker, TimePicker, Icon, Button, Form, message } from 'antd';
import SearchJuso from '../map/SearchJuso';
import inputChangeHook from '../../hooks/inputChangeHook';
import { addHelpPostRequestAction, addImageRequestAction } from '../../reducers/posts';
import {Modal, Content, Title, PostSetting, PostSettingBox, InputTitle, ContentItem, UploadImage, UploadButton} from './PostWrite.style';
import customAxios from '../../utils/axiosBase';
import moment from 'moment';
import { getCookie } from '../../utils/cookieFunction';
import MyLocation from '../map/MyLocation';
import axios from 'axios';

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
    const [content, onChangeContent] = inputChangeHook('');   //요구사항
    const [images, setImages] = useState([]);       //도움 이미지
    const [imgPaths, setImgPaths] = useState([]);   //Request에 보낼 이미지
    const dispatch = useDispatch();
    const imageInput = useRef();
    const time = moment();

    //만약 사진 업로드 한 채로 글쓰기 창 닫으면 사진도 같이 삭제되게 한다. 
    const onClose = useCallback((images) => () =>{
        if(images.length !== 0) {
            const imageFormData = new FormData();
            images.map(image => imageFormData.append('url', image));
            try{
                axios.post('/pic/delete', imageFormData, {headers : {Authorization: `Bearer ${getCookie()}`}});
                setImages([]);
                setImgPaths([]);
            }catch(e){
                console.log(e.response);
            }
        }
        setInvisible();
    }, [images]);

    const getCategory = useCallback(category => {
        setCategory(categorys[category]);
    }, []);

    const onChangeHelpPicker = setStateFunc =>
    useCallback((moment, string) => {
      setStateFunc(string);
    }, []);
    
    //도움 업로드
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
            content: content,
            helpPics: imgPaths,
            cookie : getCookie()
        }));
        setInvisible();
    }, [time, userNum, postTitle, category, helpDeadlineDate, helpDeadlineTime, helpExecDate, helpExecTime, needPersonnel, money, location, content]);

//    console.log(images.map(image => image));
    //이미지 삭제
    const deleteImage = useCallback((url) => () => {
        const imageFormData = new FormData();
        imageFormData.append('url', url);
        try{
            axios.post('/pic/delete', imageFormData, {headers : {Authorization: `Bearer ${getCookie()}`}});
            setImages(images.filter(image => image !== url));
            setImgPaths(imgPaths.filter(path => Object.values(path) !== url));
        }catch(e){
            console.log(e.response);
        }
    }, [images]);

    const onChangeImages = useCallback(async (e) => {
        const imageFormData = new FormData();
        // console.log(e.target.files[0]);
        imageFormData.append('pic', e.target.files[0]);
        console.log(imageFormData.get('pic'));
        try{
            const result = await customAxios.post('/pic/upload/help', imageFormData, {headers : {Authorization: `Bearer ${getCookie()}`}});
            console.log(result);
            // setImages(prev => [...prev, {"path" : result.data.data}]);
            setImages(prev => [...prev, result.data.data]);
            setImgPaths(prev => [...prev, {"path": result.data.data}]);
        }catch(e){
            console.log(e.response);
        }
    }, [imgPaths]);

    console.log(imgPaths)
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    return (
        <Modal>
            <Form onSubmit={addPost} encType="multipart/form-data">
                <Content>
                    <Title>
                        <InputTitle placeholder="제목을 입력하세요." value={postTitle} onChange={onChangePostTitle}/> {/*input 쓰삼 */}
                        <Icon onClick={onClose(images)} type="close" style={{fontSize: 30, color:"#BFC7CE", marginRight: 10}}/>
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
                                <TimePicker className="postSettingTimePicker" minuteStep={10} format="HH:mm" onChange={onChangeHelpPicker(setHelpDeadlineTime)}/>
                            </div>
                        </PostSettingBox>
                        <PostSettingBox>
                            <div className="postSettingTitle">수행 일시</div>
                            <div className="postSettingGetData">
                                <DatePicker className="postSettingDatePicker" format="YYYY-MM-DD" style={{marginRight: 5}} onChange={onChangeHelpPicker(setHelpExecDate)}/>
                                <TimePicker className="postSettingTimePicker" minuteStep={10} format="HH:mm" onChange={onChangeHelpPicker(setHelpExecTime)}/>
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
                        <SearchJuso location={location} setLocation={setLocation}/>
                        <MyLocation myLocation={location} />
                    </ContentItem>
                    <ContentItem>
                        <div>요구사항</div>
                        <textarea placeholder="요구사항을 입력하세요." required  value={content} onChange={onChangeContent}/>
                    </ContentItem>
                    <UploadImage>
                        <div>사진첨부</div>
                            <div className="uploadImageFlex">
                                <input type="file" hidden ref={imageInput} onChange={onChangeImages}/>
                                <div className="uploadImageButton" onClick={onClickImageUpload}>
                                    <Icon type="plus-circle" style={{fontSize: 25}}/>
                                    <div style={{fontSize: 23}}>UPLOAD</div>
                                </div>
                                <div className="previewImage">
                                    {images.map((url, i) => {
                                        return (
                                        <div key={url} className="imgBorder"> 
                                        <div className="deleteIcon" onClick={deleteImage(url)}>
                                            <Icon type="close" />
                                        </div>
                                        <img src={url} alt={url} width="90" height="90"/> 
                                        </div>
                                        )
                                    })}
                                </div>
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