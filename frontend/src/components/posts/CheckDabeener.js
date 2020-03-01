import React, { useState, useCallback } from 'react';
import { useSeletor } from 'react-redux';
import { Icon } from 'antd';
import {Modal, DrawerForm} from './CheckDabeener.style';
import ApplyDabeener from './ApplyDabeener';

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
                        applyCheck === "y" &&<button className="pay">결제!</button>
                     }
                 </div>
                 <div className="drawerMiddle">
                    {/* 얘도 map으로 줘야함.... 
                        아이디, 닉네임, 총 도움수, 평점, 자기소개 받아와서 출력
                    */}
                    <ApplyDabeener />
                    <ApplyDabeener />
                </div>
            </DrawerForm>
        </Modal>
    );
};
export default CheckDabeener;