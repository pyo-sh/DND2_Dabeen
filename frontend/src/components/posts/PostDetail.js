import React, { useCallback, useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import { Button, Icon, Input, TimePicker, DatePicker, Popconfirm, Row, Col } from 'antd';
import CheckDabeener from './CheckDabeener';
import MyLocation from '../map/MyLocation';
import inputChangeHook from '../../hooks/inputChangeHook';
import moment from 'moment';
import SearchJuso from '../map/SearchJuso';

// 내가 쓴 글 / 아닌 글 구분해야함
const PostDetail = ({setVisible, data}) => {

    //임시로 내가 쓴 글이라고 설정
    const [myPost, setMyPost] = useState(true);
    const [click, setClick] = useState(false);
    const [edit, setEdit] = useState(false);    //Edit 버튼 눌렀을 때 편집 모드로 바뀜
    const [editTitle, setEditTitle] = inputChangeHook(data.help_title);
    const [editPost_num, setEditPost_num] = inputChangeHook(data.post_num);
    const [editHelp_aply_cls_dttm, setEditHelp_aply_cls_dttm] = useState(data.help_aply_cls_dttm);
    const [editPost_type, setEditPost_type] = useState('');
    const [editPrice, setEditPrice] = inputChangeHook(data.price);
    const [editExec_loc, setEditExec_loc] = useState(data.exec_loc);
    const [editCont, setEditCont] = inputChangeHook(data.cont);
    const dateFormat = 'YYYY-MM-DD';
    const {helpPosts} = useSelector(state => state.posts);

    //신청 다비너 창 여닫을떄
    const onModal = useCallback(() => {
        setClick(prev => !prev);
    }, []);

    const onConfirm = useCallback(() => {
        //dispatch 수정 정보들
        setEdit(prev => !prev);
    }, []);

    return (
        <Modal>
            <ContentForm>
                <Content>     
                    <Icons>
                        {edit&&
                        <Popconfirm placement="bottom" title="수정을 그만두시겠습니까?" onConfirm={useCallback(()=>{setEdit(prev => !prev)}, [])} onCancel={edit} okText="네" cancelText="아니요">
                        <Icon type="rollback" style={{marginRight: 10, color: "#7A7A7A"}}/>
                        </Popconfirm>
                        }
                        <Icon onClick={setVisible} type="close"/>
                    </Icons>
                    <Title>
                        {
                            !edit ? <div>{data.help_title}</div> : <EditTitle value={editTitle} onChange={setEditTitle}/>
                        }
                        <div className="titleDetail">
                            <div>작성일 : {data.help_post_dttm}</div>
                            <div>작성자 : {data.id}</div>  
                            {
                                !edit ? <Edit onClick={useCallback(() => {setEdit(prev => !prev)}, [])}>Edit</Edit>
                                : 
                                <Popconfirm placement="topLeft" title="수정하시겠습니까?" onConfirm={onConfirm} onCancel={edit} okText="네" cancelText="아니요">
                                    <Edit>완료</Edit>
                                </Popconfirm>
                            }         
                        </div>
                    </Title>
                    <Image>근데 여기에 무슨 사진을 넣나요</Image>
                    <ApplicationInfo>
                        <Row>
                            <Col xd={24} sm={21}>
                                <Col xd={24} sm={21}>
                                    <ApplicationInfoBox>
                                    <div className="applicationInfoBoxTitle">신청인원</div>
                                    { !edit ?
                                        <>
                                        <div style={{display: "flex"}} className="applicationInfoBoxDetail"><div><span>0</span>/{data.post_num}</div><button onClick={onModal}>신청 확인</button></div>      
                                        {click &&<CheckDabeener click ={click} onModal ={onModal} needPersonnel={data.post_num}/>}
                                        </>
                                        :
                                        <div style ={{display:"flex"}}><div><span>0</span>/<input className ="needPersonnel" value={editPost_num} onChange={setEditPost_num}/></div></div>
                                    }
                                    </ApplicationInfoBox>
                                    <ApplicationInfoBox>
                                    <div className="applicationInfoBoxTitle">신청 마감 일시</div>
                                    {
                                        !edit ?
                                        <div className="applicationInfoBoxDetail">{data.help_aply_cls_dttm}</div>
                                        : 
                                        <DatePicker defaultValue ={moment(data .help_aply_cls_dttm, dateFormat)}/>
                                    }
                                    </ApplicationInfoBox>
                                    <ApplicationInfoBox>
                                    <div className="applicationInfoBoxTitle">신청인원</div>
                                    {
                                        !edit ?
                                        <div className="applicationInfoBoxDetail">{data.post_type}, PM 06:19</div>
                                        :
                                        <DatePicker defaultValue ={moment(data.post_type ,dateFormat)}/>
                                    }
                                    </ApplicationInfoBox>
                                </Col>
                                <Col xs={24} sm={3}>
                                    <div className="applicationMoney">
                                        {
                                            !edit ?
                                            <>
                                            <div>{data.price}원</div>
                                            <ClickButton apply>마감</ClickButton>
                                            </>
                                            :  
                                            <>      
                                            <div style ={{color:"#424242", fontSize:"1.1vw"}}>금액 수정 </div>
                                            <div><input value ={editPrice} onChange ={setEditPrice}/></div>
                                            </>
                                        }
                                    </div>
                                </Col>
                            </Col>
                        </Row>
                    </ApplicationInfo>
                    <ContentItem>
                        <div>
                            <div className="contentTitle">위치</div>
                        </div>
                        <div className="map">
                            {
                                !edit ?
                                <>
                                <div>{data.exec_loc}</div>
                                <MyLocation myLocation={data.exec_loc}/>
                                </>
                                :
                                <SearchJuso location={editExec_loc} getLocation={setEditExec_loc}/>
                            }
                        </div>
                    </ContentItem>
                    <ContentItem>
                        <div className="contentTitle">도움정보</div>
                        {
                            !edit ?       
                            <p>
                            {data.cont}
                            </p>
                            :
                            <textarea required  value={editCont} onChange={setEditCont}/>
                        }
                    </ContentItem>
                </Content>
            </ContentForm>
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

const ContentForm = styled.div`
    font-size: 20px;
    color: #424242;
    background: white;
    padding: 1rem;
    width: 590px;
    height: 87vh;
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: auto;
    ::-webkit-scrollbar{display:none;}  /*스크롤바 안보이게*/
`;

const Icons = styled.div`
    text-align: right;
    font-size: 35px;
    color: #BFC7CE;
`;

const Content = styled.div`
    width: 550px;
    height: 85vh;
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: flex-start;
    width: 550px;
    font-size: 40px;

    & > .titleDetail{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        width: 350px;
        font-size: 15px;
    }
`;

const EditTitle = styled(Input)`
    border: none;
    color: #7a7a7a;
    font-size: 40px;
    width: 550px;

    :focus{
        outline: none;  
    }
`;

const Image = styled.div`
    width: 550px;
    height: 200px;
    background: #BFC7CE;
    margin-top: 0.5vh;
`;

const ApplicationInfoBox = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 90%;

    & button{
        border: none;
        background: none;
        color: #7A7A7A;
        cursor: pointer;

        :focus{
            outline: none;
        }
    }
    
    & span{
        color: #FF4300;
        font-size: 1.2vw;
    }

    & .applicationInfoBoxTitle {
        width: 200px;
        padding-left: 10px;
    }
    & .applicationInfoBoxDetail{
        width: 170px;
        font-size: 15px;
        padding-left: 10px;
    }  
`;

const ApplicationInfo = styled.div`
    width: 550px;
    margin-top: 20px;
    
    & .applicationMoney{
        display: flex;
        flex-direction: column;
        width: 400px;
        justify-content:flex-end;
        color: #FF4300;
        font-size: 20px;

        & input{
            border: none;
            width: 5vw;
            font-size: 1.1vw;
        }
    }

    & .needPersonnel {
        font-size: 0.8vw;
        border: none;
        width: 5vw;
    }

    & .ant-calendar-picker {
        width: 7vw;

        & .ant-calendar-picker-icon {
            display: none;
        }
    }
`;

const ClickButton = styled(Button)`
    background: ${props => (props.apply ? "#FF4300" : "#F0F0F0")};
    border: ${props => (props.apply ? "#FF4300" : "#F0F0F0")};
    color: ${props => (props.apply ? "#FFFFFF" : "#7A7A7A")};
    font-size: 15px;
    box-shadow: 2px 3px 5px #BFC7CE;
    width: 100px;

    :hover {
        opacity: 0.9;
        background: ${props => (props.apply ? "#FF4300" : "#F0F0F0")};
        border: ${props => (props.apply ? "#FF4300" : "#F0F0F0")};
        color: ${props => (props.apply ? "#FFFFFF" : "#7A7A7A")};
    }

    :focus{
        background: ${props => (props.apply ? "#FF4300" : "#F0F0F0")};
        border: ${props => (props.apply ? "#FF4300" : "#F0F0F0")};
        color: ${props => (props.apply ? "#FFFFFF" : "#7A7A7A")};
    }
`;

const ContentItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 18px;
    margin-top: 4vh;
    width: 550px;

    & .contentTitle{
        font-size: 20px;
    }

    & > p{
        margin-top: 10px;
        font-size: 18px;
    }

    & .map{
        width: 550px;
        height: 200px;
    }

    & > textarea {
        width: 550px;
        height: 100px;
        resize: none;
        color: #7a7a7a;
        border-color: #d9d9d9;
        ::-webkit-scrollbar{display:none;}  /*스크롤바 안보이게*/

        ::placeholder{
            color: #BFC7CE;
        }
    }
`;

const Edit = styled.button`
    background: #F0F0F0;  
    border: 1px solid #F0F0F0;
    border-radius: 7px;
    color: #7A7A7A;
    width: 40px;
    height: 20px;  
    font-size: 10px;
    cursor: pointer;

    :focus{
        outline: none;
    }

    :hover{
        opacity: 0.7;
    }
`;

export default PostDetail;