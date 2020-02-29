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
    // const {imagePaths} = useSelector(state => state.posts);
    const dispatch = useDispatch();
    const imageInput = useRef();
    const time = moment();

    // const onClose = useCallback(async() => {
    //     try{
    //         const url = images[0];
    //         await axios.post('/pic/delete', "help/20200228/55a61596-17ff-4f59-bacd-d3de3022a661_1516799552217.jpg");
    //         // console.log(result);
    //         setImages([]);
    //     }catch(e){
    //         console.log(e.response);
    //     }
    //     setInvisible();
    // }, []);

    const getCategory = useCallback(category => {
        setCategory(categorys[category]);
    }, []);

    const onChangeHelpPicker = setStateFunc =>
    useCallback((moment, string) => {
      setStateFunc(string);
    }, []);

    const getLocation = useCallback((fullAddress) => {
        setLocation(fullAddress);
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
            content: content,
            cookie : getCookie()
        }));
        setInvisible();
        // dispatch(addImageRequestAction({
        //     path: `/home/help/${time.format('YYYYMMDD')}/${images[0].split('/')[6]}`
        // }));
    }, [time, userNum, postTitle, category, helpDeadlineDate, helpDeadlineTime, helpExecDate, helpExecTime, needPersonnel, money, location, content]);

    // console.log(time.format('YYYYMMDD'))
    // console.log(images[0].split('/')[6])
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
            const result = await customAxios.post('/pic/upload/help', imageFormData, {headers : {Authorization: `Bearer ${getCookie()}`}});
            console.log(result);
            setImages(prev => [...prev, result.data.data]);
        }catch(e){
            console.log(e.response);
        }
    }, []);

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    return (
        <Modal>
            <Form onSubmit={addPost} encType="multipart/form-data">
                <Content>
                    <Title>
                        <InputTitle placeholder="제목을 입력하세요." value={postTitle} onChange={onChangePostTitle}/> {/*input 쓰삼 */}
                        <Icon onClick={setInvisible} type="close" style={{fontSize: 30, color:"#BFC7CE", marginRight: 10}}/>
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
                                <TimePicker className="postSettingTimePicker" minuteStep={10} format="HH:mm:ss" onChange={onChangeHelpPicker(setHelpDeadlineTime)}/>
                            </div>
                        </PostSettingBox>
                        <PostSettingBox>
                            <div className="postSettingTitle">수행 일시</div>
                            <div className="postSettingGetData">
                                <DatePicker className="postSettingDatePicker" format="YYYY-MM-DD" style={{marginRight: 5}} onChange={onChangeHelpPicker(setHelpExecDate)}/>
                                <TimePicker className="postSettingTimePicker" minuteStep={10} format="HH:mm:ss" onChange={onChangeHelpPicker(setHelpExecTime)}/>
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
                            <div className="uploadImageFlex">
                                <input type="file"  hidden ref={imageInput} onChange={onChangeImages}/>
                                {/* 업로드버튼 새로 만드세영^_^ */}
                                <div className="uploadImageButton" onClick={onClickImageUpload}>
                                    <Icon type="plus-circle" style={{fontSize: 25}}/>
                                    <div style={{fontSize: 23}}>UPLOAD</div>
                                </div>
                                {/* <Button onClick={onClickImageUpload}><Icon type="upload" />Upload</Button> */}
                                <div className="previewImage">
                                    {/* <img src={`https://s3.ap-northeast-2.amazonaws.com/dabeen/help/20200227/5ad03fab-7983-4a8f-a988-f75dd1397efa_1516799552217.jpg`} alt="에러" width="90" height="90"/> */}
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