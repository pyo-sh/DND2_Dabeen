import React, { useCallback, useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Icon, TimePicker, DatePicker, Popconfirm, Row, Col } from 'antd';
import CheckDabeener from './CheckDabeener';
import MyLocation from '../map/MyLocation';
import inputChangeHook from '../../hooks/inputChangeHook';
import moment from 'moment';
import SearchJuso from '../map/SearchJuso';
import {Modal, Icons, Content, Title, ApplyCheck, EditTitle, Edit, Image, ApplicationInfo, ApplicationInfoBox, DeadlineButton, ContentItem} from './PostDetail.style';
import {updateHelpPostRequestAction, removeHelpPostRequestAction} from '../../reducers/posts';
import { getCookie } from '../../utils/cookieFunction';
// 내가 쓴 글 / 아닌 글 구분해야함
const PostDetail = ({setVisible, data}) => {
    //수행일시랑 마감일시 날짜랑 시간 잘라야함
    //임시로 내가 쓴 글이라고 설정
    const helpExec = data.helpExecDate.split('T');     // helpExec[0]=날짜 / helpExec[1]=시간
    const helpDeadline = data.helpDeadLine.split('T');  // helpDeadline[0]=날짜 / helpDeadline[1]=시간
    const [click, setClick] = useState(false);
    const [edit, setEdit] = useState(false);    //Edit 버튼 눌렀을 때 편집 모드로 바뀜
    const [editTitle, setEditTitle] = inputChangeHook(data.helpTitle);  //수정할 게시글 제목
    const [editHelpExecDate, setEditHelpExecDate] = useState(helpExec[0]);  //수정할 도움 수행 날짜
    const [editHelpExecTime, setEditHelpExecTime] = useState(helpExec[1]);  //수정할 도움 수행 시간
    const [editHelpDeadLineDate, setEditHelpDeadLineDate] = useState(helpDeadline[0]);  //수정할 도움 신청 마감 날짜
    const [editHelpDeadLineTime, setEditHelpDeadLineTime] = useState(helpDeadline[1]);  //수정할 도움 신청 마감 시간
    const [editNeedPersonnel, setEditNeedPersonnel] = inputChangeHook(data.postNum);    //수정할 필요 인원
    const [editPrice, setEditPrice] = inputChangeHook(data.price);  //수정할 금액
    const [editExecLoc, setEditExecLoc] = useState(data.execLoc);  //수정할 주소
    const [editContent, setEditContent] = inputChangeHook(data.helpContent);    //수정할 요구사항
    const {me} = useSelector(state => state.user);  //내 정보
    const dispatch = useDispatch();
    const dateFormat = 'YYYY-MM-DD';
    const timeFormat = 'HH:mm:ss';

    //신청 다비너 창 여닫을떄
    const onModal = useCallback(() => {
        setClick(prev => !prev);
    }, []);

    //수정 완료 버튼 눌렀을 때
    const onConfirm = useCallback(() => {
        dispatch(updateHelpPostRequestAction({
                helpPostDate: data.helpPostDate,
                userNum: data.userNum,
                helpNum: data.helpNum,
                helpTitle: editTitle, 
                categoryNum: data.categoryNum,
                helpDeadLine: editHelpDeadLineDate.concat('T' + editHelpDeadLineTime),
                helpExecDate: editHelpExecDate.concat('T'+editHelpExecTime),
                postNum: parseInt(editNeedPersonnel),
                price: parseInt(editPrice),
                execLoc: editExecLoc,
                helpEndTime: data.helpEndTime,
                isHelpApprove: data.isHelpApprove,
                helpContent: editContent,
                payment: data.payment,
                cookie : getCookie()
            })
        );
        setEdit(prev => !prev);
    }, [editTitle, editHelpDeadLineDate, editHelpDeadLineTime, editHelpExecDate, editHelpExecTime, editNeedPersonnel, editPrice, editExecLoc, editContent]);

    const onChangeHelpDeadlineDate = useCallback((date, dateString) => {
        setEditHelpDeadLineDate(dateString);
    }, [])

    const onChangeHelpDeadlineTime = useCallback((time, timeString) => {
        setEditHelpDeadLineTime(timeString);
    }, []);

    const onChangeHelpExecDate = useCallback((date, dateString) => {
        setEditHelpExecDate(dateString);
    }, []);

    const onChangeHelpExecTime = useCallback((time, timeString) => {
        setEditHelpExecTime(timeString);
    }, []);

    //Picker들 수정할 때 이거 쓰니까 오류떠서 잠시 안씀
    // const onChangeHelpDatePicker = setStateFunc =>
    // useCallback((moment, string) => {
    //   setStateFunc(string); 
    // }, []);

    //게시글 삭제 버튼 눌렀을 때
    const deletePost = useCallback((id) => () => {
        // console.log(helpNum)
        dispatch(removeHelpPostRequestAction({helpNum: id, cookie : getCookie()}));
    }, []);

    return (
        <Modal>
            <div>
            <Content>
                <Title>
                    <div className="TitleWrapper">
                        {
                        !edit ? 
                        <div className="postTitle">
                            <div>{data.helpTitle}</div>
                            {
                                data.isHelpApprove === 'y' ? 
                                <ApplyCheck apply>마감</ApplyCheck>:
                                <ApplyCheck>신청 중</ApplyCheck>     
                            }
                        </div>
                        : 
                        <EditTitle value={editTitle} onChange={setEditTitle}/>
                        }
                        <Icons>
                            {edit&&
                            <>
                            <Popconfirm placement="bottom" title="수정을 그만두시겠습니까?" onConfirm={useCallback(()=>{setEdit(prev => !prev)}, [])} onCancel={edit} okText="네" cancelText="아니요">
                            <Icon type="rollback" style={{marginRight: 10, color: "#7A7A7A"}}/>
                            </Popconfirm>
                            <Popconfirm placement="bottom" title="정말 삭제하시겠습니까?" onConfirm={deletePost(data.helpNum)} onCancel={edit} okText="네" cancelText="아니요">
                            <Icon type="delete" style={{marginRight: 10}}/>
                            </Popconfirm>
                            </>
                            }
                            <Icon onClick={setVisible} type="close"/>
                        </Icons>
                    </div>
                    <div className="titleDetail">
                        <div>작성일 : {data.helpPostDate.split('T')[0]}</div>
                        <div>작성자 : {data.userId}</div>  
                        {
                            data.userNum === me.userNum && (
                            !edit ? <Edit onClick={useCallback(() => {setEdit(prev => !prev)}, [])}>Edit</Edit>
                            : 
                            <Popconfirm placement="topLeft" title="수정하시겠습니까?" onConfirm={onConfirm} onCancel={edit} okText="네" cancelText="아니요">
                                <Edit>완료</Edit>
                            </Popconfirm>
                            )
                        }         
                    </div>
                </Title>
                <Image>근데 여기에 무슨 사진을 넣나요</Image>
                <ApplicationInfo>
                    <Row>
                        <Col span={20}>
                            <ApplicationInfoBox>
                            <div className="applicationInfoBoxTitle">신청인원</div>
                            { !edit ?
                                <>
                                <div style={{display: "flex"}} className="applicationInfoBoxDetail"><div><span style={{fontSize: 18, color: "#FF4300"}}>0</span>/{data.postNum}</div><button className="applyCheck" onClick={onModal}>신청 확인</button></div>      
                                {click &&<CheckDabeener click ={click} onModal ={onModal} needPersonnel={data.postNum} applyCheck={data.isHelpApprove}/>}
                                </>
                                :
                                <div style ={{display:"flex"}}><div><span style={{fontSize: 18, color: "#FF4300"}}>0</span>/<input className ="needPersonnel" value={editNeedPersonnel} onChange={setEditNeedPersonnel}/></div></div>
                            }
                            </ApplicationInfoBox>
                            <ApplicationInfoBox>
                            <div className="applicationInfoBoxTitle">신청 마감 일시</div>
                            {
                                !edit ?
                                <div className="applicationInfoBoxDetail">{helpDeadline[0]}</div>
                                : 
                                <>
                                <DatePicker defaultValue ={moment(editHelpDeadLineDate, dateFormat)} onChange={onChangeHelpDeadlineDate}/>
                                <TimePicker minuteStep={10} defaultValue={moment(editHelpDeadLineTime, timeFormat)} onChange={onChangeHelpDeadlineTime}/>
                                </>
                            }
                            </ApplicationInfoBox>
                            <ApplicationInfoBox>
                            <div className="applicationInfoBoxTitle">수행 일시</div>
                            {
                                !edit ?
                                <div className="applicationInfoBoxDetail">{helpExec[0]}</div>
                                :
                                <>
                                <DatePicker defaultValue ={moment(editHelpExecDate ,dateFormat)} onChange={onChangeHelpExecDate}/>
                                <TimePicker minuteStep={10} defaultValue ={moment(editHelpExecTime, timeFormat)} onChange={onChangeHelpExecTime} />
                                </>
                            }
                            </ApplicationInfoBox>
                        </Col>
                        <Col span={4}>
                            <div className="applicationMoney">
                                {
                                    !edit ?
                                    <>
                                    <div>{data.price}원</div>
                                    {   //내가 쓴 게시글이면 마감버튼 뜨게, 아닐시엔 신청 버튼이 뜨게
                                        data.userNum === me.userNum ? 
                                        (
                                        data.isHelpApprove === 'y' ?
                                        <DeadlineButton apply>마감 완료</DeadlineButton>:
                                        <DeadlineButton>마감</DeadlineButton> 
                                        )
                                        :
                                        <DeadlineButton>신청</DeadlineButton>
                                    }
                                    </>
                                    :  
                                    <>      
                                    <div style ={{color:"#424242", fontSize:"20px"}}>금액 수정 </div>
                                    <div><input value ={editPrice} onChange ={setEditPrice}/></div>
                                    </>
                                }
                            </div>
                        </Col>
                    </Row>
                </ApplicationInfo>
                <ContentItem>
                    <div>
                        <div className="contentTitle">위치</div>
                    </div>
                    {
                        !edit ?
                        <div className="map">
                            <div>{data.location}</div>
                            <MyLocation myLocation={data.location}/>        
                        </div>
                        :
                        <SearchJuso location={editExecLoc} getLocation={setEditExecLoc}/>
                    }
                </ContentItem>
                <ContentItem>
                    <div className="contentTitle">도움정보</div>
                    {
                        !edit ?       
                        <p>
                        {data.helpContent}
                        </p>
                        :
                        <textarea required value={editContent} onChange={setEditContent}/>
                    }
                </ContentItem>
            </Content>
            </div>
        </Modal>
    );
};

export default PostDetail;