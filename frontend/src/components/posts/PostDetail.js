import React, { useCallback, useState, useEffect, useMemo } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Icon, TimePicker, DatePicker, Popconfirm } from 'antd';
import CheckDabeener from './CheckDabeener';
import MyLocation from '../map/MyLocation';
import inputChangeHook from '../../hooks/inputChangeHook';
import moment from 'moment';
import SearchJuso from '../map/SearchJuso';
import { Modal, Icons, Content, Title, HelpPic, DetailSlick, slickSetting, ApplyCheck, EditTitle, Edit, ApplicationInfo, ApplicationInfoBox, DeadlineButton, ContentItem} from './PostDetail.style';
import { updateHelpPostRequestAction, removeHelpPostRequestAction, loadApplyDabeenerRequestAction, addApplyRequestAction } from '../../reducers/posts';
import { getCookie } from '../../utils/cookieFunction';
import Upload from '../uploadImages/Upload';
import customAxios from '../../utils/axiosBase';

const PostDetail = ({setVisible, data, categoryNum}) => {
    const helpExec = data.helpExecDate.split('T');     // helpExec[0]=날짜 / helpExec[1]=시간
    const helpDeadline = data.helpDeadLine.split('T');  // helpDeadline[0]=날짜 / helpDeadline[1]=시간
    const helpExecHour = parseInt(helpExec[1].substring(0,2));
    const helpDeadlineHour = parseInt(helpDeadline[1].substring(0,2));
    const imagesURL = data.helpPic.map(pic => pic.path);    //path만 따로 배열에 저장
    // imgPaths.map(pic => delete pic.help_num)
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
    const [editImages, setEditImages] = useState(imagesURL);       //도움 이미지
    const [editImgPaths, setEditImgPaths] = useState([]);   //Request에 보낼 이미지

    const {me} = useSelector(state => state.user);  //내 정보
    const dispatch = useDispatch();
    const dateFormat = 'YYYY-MM-DD';
    const timeFormat = 'HH:mm';

    useEffect(() => {
        dispatch(loadApplyDabeenerRequestAction({helpNum : data.helpNum}));
    }, [data.helpNum]);
    
    const { applyDabeeners } = useSelector(state => state.posts);
    const [ approveDabeenersNum, setApproveDabeenersNum ]= useState(applyDabeeners.filter(v => v.isApprove === 'y').length)
    // setEditImgPaths(data.helpPic.map(pic => editImages.push({"pic_ornu": pic.pic_ornu, "path": pic.path})))
    const isApplyed = useMemo(() => applyDabeeners.filter(v => v.user.userNum === me.userNum).length, [applyDabeeners, me&&me.userNum])
    
    // AM, PM 표시 하도록 하는 함수
    const time = useCallback((hour, time) => {
        if(hour < 12) return <div>AM{time.substring(0, 5)}</div>
        else {
            if(hour == 12) return <div>PM{time.substring(0, 5)}</div>
            else{
                const hours = String(hour-12);
                if(parseInt(hours) <= 9) return <div>PM0{hours + time.substring(2, 5)}</div>
                else return <div>PM{hours + time.substring(2, 5)}</div>
            }
        }
    }, []);

    //신청 다비너 창 여닫을떄
    const onModal = useCallback(() => {
        setClick(prev => !prev);
    }, []);

    //수정 완료 버튼 눌렀을 때
    const onConfirm = useCallback(() => {
        setEditImgPaths(editImages.map((pic, i) => editImgPaths.push({"path": pic, "pic_ornu": i+1})))
        dispatch(updateHelpPostRequestAction({
                // helpPostDate: data.helpPostDate,
                userNum: data.userNum,
                helpNum: data.helpNum,
                helpTitle: editTitle, 
                categoryNum: String(categoryNum),
                helpDeadLine: editHelpDeadLineDate.concat('T' + editHelpDeadLineTime),
                helpExecDate: editHelpExecDate.concat('T'+editHelpExecTime),
                postNum: parseInt(editNeedPersonnel),
                price: parseInt(editPrice),
                execLoc: editExecLoc,
                helpEndTime: data.helpEndTime,
                isHelpApprove: data.isHelpApprove,
                helpContent: editContent,
                isPaymentApprove: data.isPaymentApprove,
                helpPic: editImgPaths,
                cookie : getCookie()
            })
        );
        setEdit(prev => !prev);
    }, [editTitle, editHelpDeadLineDate, editHelpDeadLineTime, editHelpExecDate, editHelpExecTime, editNeedPersonnel, editPrice, editExecLoc, editContent, editImages, editImgPaths]);
    
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
    const deletePost = useCallback((helpNum) => () => {
        if(imagesURL.length != 0){
            console.log(imagesURL)
            const imageFormData = new FormData();
            imagesURL.map(url => imageFormData.append('url', url));
            try{
                customAxios.post('/pic/delete', imageFormData, {headers : {Authorization: `Bearer ${getCookie()}`}});
            }catch(e){
                console.log(e.response);
            }
        }
        dispatch(removeHelpPostRequestAction({help_num: helpNum, cookie : getCookie()}));
    }, []);

    const helpApply = useCallback(async () => {
        if (me.userRole !== 'y') {
            alert('다비너로 등록된 회원만 신청 가능합니다.');
            return;
        }
        dispatch(addApplyRequestAction({helpNum: data.helpNum, userNum : me.userNum, cookie: getCookie()}));
    }, [data.helpNum, me.userNum, me.userRole]);

    return (
        <Modal>
        <div>
        <Content>
            <Title>
                <div className="TitleWrapper">
                    {!edit
                    ?   <div className="PostTitle">
                            {data.helpTitle}
                        </div>
                    :   <EditTitle value={editTitle} onChange={setEditTitle}/>
                    }
                    <Icons>
                        {edit &&
                        <>
                        <Popconfirm
                            placement="bottom"
                            title="수정을 그만두시겠습니까?"
                            onConfirm={useCallback(() => {setEdit(prev => !prev)}, [])}
                            onCancel={edit}
                            okText="네"
                            cancelText="아니요"
                            >
                        <Icon type="rollback" style={{marginRight: 10, color: "#7A7A7A"}}/>
                        </Popconfirm>
                        <Popconfirm
                            placement="bottom"
                            title="정말 삭제하시겠습니까?"
                            onConfirm={deletePost(data.helpNum)}
                            onCancel={edit}
                            okText="네"
                            cancelText="아니요"
                            >
                        <Icon type="delete" style={{marginRight: 10}}/>
                        </Popconfirm>
                        </>
                        }
                        <Icon onClick={setVisible} type="close"/>
                    </Icons>
                </div>
                <div className="PostTitleDetail">
                    <div className="PostTitleDetailContent">
                        <div className="PostTitleDetailDate">작성일 : {data.helpPostDate.split('T')[0]}</div>
                        <div className="PostTitleDetailAuthor">작성자 : {data.nickname}</div>
                    </div>
                    <div className="PostTitleDetailBtn">
                        {
                            data.userNum === me.userNum && (
                            !edit ? <Edit onClick={useCallback(() => {setEdit(prev => !prev)}, [])}>Edit</Edit>
                            : 
                            <Popconfirm
                                placement="topLeft"
                                title="수정하시겠습니까?"
                                onConfirm={onConfirm}
                                onCancel={edit}
                                okText="네"
                                cancelText="아니요"
                                >
                                <Edit>완료</Edit>
                            </Popconfirm>
                            )
                        }
                        {data.isHelpApprove === 'y'
                        ?   <ApplyCheck apply>마감</ApplyCheck>
                        :   <ApplyCheck>신청 중</ApplyCheck>
                        }
                    </div>
                </div>
            </Title>
            {!edit && (imagesURL.length === 0 ?
            <DetailSlick {...slickSetting}>
            <img className="PostDetailImage" src={'/images/main1.jpg'}/>
            <img className="PostDetailImage" src={'/images/main2.jpg'}/>
            <img className="PostDetailImage" src={'/images/main3.jpg'}/>
            <img className="PostDetailImage" src={'/images/main4.jpg'}/>
            </DetailSlick>
            :
            imagesURL.length === 1 ?
            <HelpPic>
            <img className="PostDetailImage" src={imagesURL} />
            </HelpPic>
            :
            <DetailSlick {...slickSetting}>
            {imagesURL.map((url, i) => {
                <img className="PostDetailImage" src={url} key={url} alt={url}/>
            })}
            </DetailSlick>
            )}
            <ApplicationInfo>
                <div className="ApplicationInfoBoxWrapper">
                    <ApplicationInfoBox>
                        <div className="ApplicationInfoBoxTitle">선택인원</div>
                        {!edit
                        ?   <>
                            <div className="ApplicationInfoBoxDetail">
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <span style={{fontSize: 25, color: "#FF4300"}}>{approveDabeenersNum}</span>
                                    /{data.postNum}
                                </div>
                                <button className="ApplyCheck" onClick={onModal}>
                                    {applyDabeeners ? applyDabeeners.length : 0} 신청 확인
                                </button>
                            </div>      
                            {click &&<CheckDabeener click={click} onModal={onModal} needPersonnel={data.postNum} helpNum={data.helpNum} postUserNum={data.userNum} applyDabeeners={applyDabeeners} applyCheck={data.isHelpApprove}
                                        approveDabeenersNum={approveDabeenersNum} setApproveDabeenersNum={setApproveDabeenersNum}/>}
                            </>
                        :   <div style ={{display:"flex"}} className="ApplicationInfoBoxDetail">
                                <div>
                                    <span style={{fontSize: 18, color: "#FF4300"}}>0</span>
                                    /
                                    <input
                                        className ="needPersonnel"
                                        value={editNeedPersonnel}
                                        onChange={setEditNeedPersonnel}
                                        />
                                </div>
                            </div>
                        }
                    </ApplicationInfoBox>
                    <ApplicationInfoBox>
                        <div className="ApplicationInfoBoxTitle">신청 마감 일시</div>
                        {!edit
                        ?   <div className="ApplicationInfoBoxDetail"><div className="ApplicationInfoBoxDetailDate">{helpDeadline[0]}</div>{time(helpDeadlineHour, helpDeadline[1])}</div>
                        :   <div className="ApplicationInfoBoxDetail">
                                <DatePicker
                                    className="ApplicationInfoBoxDatePicker"
                                    defaultValue ={moment(editHelpDeadLineDate, dateFormat)}
                                    onChange={onChangeHelpDeadlineDate}
                                    />
                                <TimePicker
                                    className="ApplicationInfoBoxTimePicker"
                                    format="HH:mm"
                                    minuteStep={10}
                                    defaultValue={moment(editHelpDeadLineTime, timeFormat)}
                                    onChange={onChangeHelpDeadlineTime}
                                    />
                            </div>
                        }
                    </ApplicationInfoBox>
                    <ApplicationInfoBox>
                        <div className="ApplicationInfoBoxTitle">수행 일시</div>
                        {!edit
                        ?   <div className="ApplicationInfoBoxDetail"><div className="ApplicationInfoBoxDetailDate">{helpExec[0]}</div>{time(helpExecHour, helpExec[1])}</div>
                        :   <div className="ApplicationInfoBoxDetail">
                                <DatePicker
                                    className="ApplicationInfoBoxDatePicker"
                                    defaultValue ={moment(editHelpExecDate ,dateFormat)}
                                    onChange={onChangeHelpExecDate}
                                    />
                                <TimePicker
                                    className="ApplicationInfoBoxTimePicker"
                                    format="HH:mm"
                                    minuteStep={10}
                                    defaultValue={moment(editHelpExecTime, timeFormat)}
                                    onChange={onChangeHelpExecTime}
                                    />
                            </div>
                        }
                    </ApplicationInfoBox>
                </div>
                <div className="ApplicationMoney">
                    {!edit
                    ?   <>
                        <div className="ApplicationMoneyTitle"><div className="ApplicationMoneyTitleValue">{data.price}</div>원</div>
                        {data.userNum === me.userNum    //내가 쓴 게시글이면 마감버튼 뜨게, 아닐시엔 신청 버튼이 뜨게
                        ?   (data.isHelpApprove === 'y'
                            ?   <DeadlineButton apply>마감 완료</DeadlineButton>
                            :   <DeadlineButton>마감</DeadlineButton> 
                            )
                        :   isApplyed ?<DeadlineButton apply={true} disabled>신청완료</DeadlineButton>  : <DeadlineButton onClick={helpApply}>신청</DeadlineButton>
                        }
                        </>
                    :   <>      
                        <div style ={{color:"#424242", fontSize:"23px"}}>금액 수정 </div>
                        <input value ={editPrice} onChange ={setEditPrice}/>
                        </>
                    }
                </div>
            </ApplicationInfo>
            <ContentItem>
                <div>
                    <div className="ContentTitle">위치</div>
                </div>
                {!edit
                ?   <div className="ContentMapWrapper">
                        <div className="ContentMap">
                            <MyLocation myLocation={data.execLoc}/>    
                        </div>    
                        <div className="ContentMapInfo">
                            지도 위치
                            <div className="ContentMapLocation">{data.execLoc}</div>
                        </div>
                    </div>
                :   <div className="ContentMapWrapper">
                        <div className="ContentMap">
                            <MyLocation myLocation={editExecLoc}/>    
                        </div>    
                        <div className="ContentMapInfo">
                            <SearchJuso location={editExecLoc} setLocation={setEditExecLoc}/>
                        </div>
                    </div>
                }
            </ContentItem>
            <ContentItem>
                <div className="ContentTitle">도움정보</div>
                {!edit
                ?   <p>{data.helpContent}</p>
                :   <textarea required value={editContent} onChange={setEditContent}/>
                }
            </ContentItem>
            {edit&&(<ContentItem>
                <div className="ContentTitle">사진첨부</div>
                <Upload images={editImages} setImages={setEditImages} imgPaths={editImgPaths} setImgPaths={setEditImgPaths}/>
            </ContentItem>
            )}
        </Content>
        </div>
        </Modal>
    );
};

export default PostDetail;