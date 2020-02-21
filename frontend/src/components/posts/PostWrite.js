import React, { useState, useCallback } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import { Select,  DatePicker, TimePicker, Icon, Button, Form, message, Row, Col } from 'antd';
// import DatePicker from 'react-datepicker';
import SearchJuso from '../map/SearchJuso';
import inputChangeHook from '../../hooks/inputChangeHook';
import Upload from '../uploadImages/Upload';
import { addHelpPostSuccessAction } from '../../reducers/posts';

const categorys = ["심부름", "대여", "잡일"];   //카테고리

const PostWrite = ({setInvisible}) => {
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

    const {helpPosts} = useSelector(state => state.posts);
    const dispatch = useDispatch();

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
    
    //게시글 업로드
    const addPost = useCallback(() => {
        e.preventDefault();
        if(!postTitle || !postTitle.trim()){
            message.error('제목을 입력해주세요!');
        } 
        dispatch(addHelpPostSuccessAction({
            help_title: postTitle,
            cat_num: category,
            help_aply_cls_dttm: postDeadline,
            post_type: dateofExecution,
            post_num: needPersonnel,
            price: money,
            exec_loc: location,
            sigungu: sigungu
        }));
    }, [postTitle]);

    //이미지 삭제
    const deleteImage = useCallback(key => e =>{
        setUrls(urls.filter(url => url.key !== key));
        setImages(images.filter(image => image.key !== key));
    }, [urls, images]);

    return (
        <Modal>
            <Form onSubmit={addPost}>
            <ContentFlex>
                <Content>
                    <Title>
                        <InputTitle placeholder="제목을 입력하세요." value={postTitle} onChange={onChangePostTitle}/> {/*input 쓰삼 */}
                        <Icon onClick={setInvisible} type="close" style={{fontSize: "2vw", color:"#BFC7CE"}}/>
                    </Title>
                    <PostSetting>
                        <Row className="postSettingBowRow">
                            <Col xd={24} sm={21}>
                                <PostSettingBox>
                                    <div className="postSettingTitle">카테고리</div>
                                    <Select className="postSettingSelect" placeholder="Category" onChange={getCategory}>
                                        {categorys.map((_category, i) => <Select.Option value={_category} key={i}>{_category}</Select.Option>)}
                                    </Select>
                                </PostSettingBox>
                                <PostSettingBox>
                                    <div className="postSettingTitle">신청 마감 일시</div>
                                    <div className="postSettingGetData">
                                        <DatePicker className="postSettingDatePicker" style={{marginRight: 5}}  onChange={onPostDeadlineDate}/>
                                        <TimePicker className="postSettingTimePicker" use12Hours format="h:mm a" onChange={onPostDeadlineTime}/>
                                    </div>
                                </PostSettingBox>
                                <PostSettingBox>
                                    <div className="postSettingTitle">수행 일시</div>
                                    <div className="postSettingGetData">
                                        <DatePicker className="postSettingDatePicker" style={{marginRight: 5}} onChange={onExecutionDate}/>
                                        <TimePicker className="postSettingTimePicker" use12Hours format="h:mm a" onChange={onExecutionTime}/>
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
                            </Col>
                        </Row>
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
                        <Upload urls={urls} images={images} getUrls={setUrls} getImages={setImages}/>
                        <div className="previewImage">
                            {images.length !== 0 ? 
                                urls.map((url, i) => {
                                    return(
                                    <div className="imgBorder"><div className="deleteIcon"><Icon type="close" onClick={deleteImage(url.key)}/></div><img src={url.url} key={i} alt="미리보기"/></div>
                                    )
                                }) : <></>}
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
    z-index: 1;
`;

const ContentFlex = styled.div`
    font-size: 20px;
    color: #424242;
    background: white;
    padding: 1rem;
    width: 590px;
    height: 870px;
    display: flex; 
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: scroll;
    ::-webkit-scrollbar{display:none;}  /*스크롤바 안보이게*/
`;

const Content = styled.div`
    width: 550px;
    height: 850px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
`;

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    width: 550px;
    font-size: 40px;
`;

const PostSetting = styled.div`
    width: 550px;
    height: 350px;
    background: #F0F0F0;
    border-radius: 8px;
    font-size: 20px;
    display: flex;

  & .postSettingBowRow{
      display: flex;
      align-items: flex-end;
      flex-wrap: wrap;
  }
`;

const PostSettingBox = styled.div`
    padding: 5px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 550px;

    & .postSettingTitle {
        width: 50%;
        min-width: 120px;
        max-width: 160px;
        padding-left: 10px;
    }
    & .postSettingSelect{
        width: 130px;
    }
    & .ant-select-arrow{
        color: #FF4300;
    }
    & .ant-calendar-picker-icon{
        color: #FF4300;
    }

    & .ant-time-picker-clock-icon{
        color: #FF4300; 
    }
    & .postSettingGetData{
        display: flex;
    }
    & .postSettingDatePicker{
        width: 100%;
        min-width: 100px;
        max-width: 130px;
    }
    & .postSettingTimePicker{
        width: 100%;
        min-width: 90px;
        max-width: 120px;
        margin-left: 10px;
    }
    & .postSettingInput{
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        width: 100%;
        min-width: 100px;
        max-width: 130px;
        height: 32px;
        padding-left: 2px;
        font-size: 15px;
        margin-bottom: 1vh;
        color: #7a7a7a;
        :focus{
            outline: none;
        }
        ::placeholder{
            color: #BFC7CE;
        }
    }
    /* input type="number"일 경우 생기는 화살표 제거 */
    & input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

const InputTitle = styled.input`
    border: none;
    color: #7a7a7a;
    font-size: 40px;
    width: 550px;
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
    font-size: 25px;
    margin-top: 20px;
    width: 550px;
    height: 300px;

    & > textarea {
        width: 550px;
        height: 200px;
        resize: none;
        color: #7a7a7a;
        border-color: #d9d9d9;
        border-radius: 8px;
        font-size: 20px;
        ::placeholder{
            color: #BFC7CE;
        }
    }
`;

const UploadImage = styled.div`
    margin-top: 20px;
    width: 550px;
    font-size: 25px;

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
            height: 13.5vh;
            border: 1px solid #BFC7CE;
            border-radius: 4px;
            margin-right: 1vw;

            & .deleteIcon{
                font-size: 1vw;
                text-align: right;
                margin-left: 1vw;
                opacity: 0;

                :hover {
                    opacity: 0.7;
                }
            }

            :hover {
                background: #F0F0F0;
                opacity: 0.7;
                z-index: 1;
            }
        }

        & img{
            margin: 0.05vh 0.5vw;
            width: 5vw;
            height: 10vh;
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