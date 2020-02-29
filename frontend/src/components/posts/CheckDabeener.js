import React, { useState, useCallback } from 'react';
import { useSeletor } from 'react-redux';
import { Avatar, Rate, Icon } from 'antd';
import {Modal, DrawerForm, ApplyDabeener, UserInfo, ChoiceButton} from './CheckDabeener.style';

const CheckDabeener = ({click, onModal, needPersonnel, applyCheck}) => {
    // const {helpPosts} = useSeletor(state => state.posts);
    const [visible, setVisible] = useState(click);
    const [count, setCount] = useState(0);

    const onClose = useCallback(() => {
        onModal(!visible);
    },[visible]);
    
    //필요 인원 수 만큼 버튼 클릭 할 수 있게 만들어야함 
    // const choiceDabeener = useCallback(() => {
    //     if(count <= needPersonnel){
            
    //     }
    // }, []);

    return (
        <Modal>
            <DrawerForm>
                <div className="drawerTitle">
                    <div>신청 다비너</div><Icon type="close" className="icon" onClick={onClose}/>
                </div>
                <div className="drawerTop">
                    <div className="drawerTopFlex">
                         <div className="drawerTopMargin">신청인원</div>
                         <div className="drawerTopMargin"><span style={{color: "#FF4300"}}>N</span>명</div>
                     </div>
                     <div className="drawerTopMargin">|</div>
                     <div className="drawerTopFlex">
                     <div className="drawerTopMargin">확정인원</div>
                        <div className="drawerTopMargin"><span style={{color: "#FF4300"}}>1</span>/{needPersonnel}</div>
                     </div>
                     {
                        applyCheck&&<button className="pay">결제!</button>
                     }
                 </div>
                 <div className="drawerMiddle">
                    {/* 얘도 map으로 줘야함.... 
                        아이디, 닉네임, 총 도움수, 평점, 자기소개 받아와서 출력
                    */}
                    <ApplyDabeener>
                        <Avatar/> {/*이 antd도 조만간 안녕일듯  */}
                        <UserInfo>
                            <div className="user">
                                <div className="userInfo">
                                    <div>닉네임</div>
                                    <div style={{fontSize: 14}}>@아이디</div>
                                </div>
                                <div className="userIntro">
                                    아이엠 그라운드 자기소개하기! 안녕 나는 연전광이라고해! 우리 앞으로 잘 지내자!
                                </div>
                            </div>
                            <div className="userDetailInfo">
                                <div>
                                    <div style={{fontSize:15}}>10</div>
                                    <div style={{fontSize:11}}>총 도움수</div>
                                </div>
                                <div>
                                    <div className="rateFlex">
                                        <Rate allowHalf disabled defaultValue={3.5} style={{fontSize: 15}}/>
                                        <div>3.5</div>
                                    </div>
                                    <div style={{fontSize:11}}>평점</div>
                                </div>
                                <ChoiceButton>선택</ChoiceButton>
                            </div>
                        </UserInfo>
                    </ApplyDabeener>
                    <ApplyDabeener>
                        <Avatar icon="user"/>
                        <UserInfo>
                            <div className="user">
                                <div className="userInfo">
                                    <div>닉네임</div>
                                    <div style={{fontSize: 14}}>@아이디</div>
                                </div>
                                <div className="userIntro">
                                    아이엠 그라운드 자기소개하기! 안녕 나는 연전광이라고해! 우리 앞으로 잘 지내자!
                                </div>
                            </div>
                            <div className="userDetailInfo">
                                <div>
                                    <div style={{fontSize:15}}>10</div>
                                    <div style={{fontSize:11}}>총 도움수</div>
                                </div>
                                <div>
                                    <div className="rateFlex">
                                        <Rate allowHalf disabled defaultValue={3.5} style={{fontSize: 15}}/>
                                        <div>3.5</div>
                                    </div>
                                    <div style={{fontSize:11}}>평점</div>
                                </div>
                                <ChoiceButton choice>취소</ChoiceButton>
                            </div>
                        </UserInfo>
                    </ApplyDabeener>
                </div>
            </DrawerForm>
        </Modal>
    );
};


export default CheckDabeener;