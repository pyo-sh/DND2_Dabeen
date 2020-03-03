import React, { useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from 'antd';
import {Modal, DrawerForm} from './CheckDabeener.style';
import ApplyDabeener from './ApplyDabeener';

const CheckDabeener = ({click, onModal,helpNum, needPersonnel, postUserNum, applyCheck, applyDabeeners, approveDabeenersNum, setApproveDabeenersNum}) => {
    // const {helpPosts} = useSeletor(state => state.posts);
    const [visible, setVisible] = useState(click);
    const [count, setCount] = useState(0);
    const { me } = useSelector(state => state.user);
    const isMe = useMemo(() => me.userNum === postUserNum, [me && me.userNum, postUserNum]);
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
                         <div className="drawerTopMargin"><span style={{color: "#FF4300"}}>{applyDabeeners.length}</span>명</div>
                     </div>
                     <div className="drawerTopMargin">|</div>
                     <div className="drawerTopFlex">
                     <div className="drawerTopMargin">확정인원</div>
                        <div className="drawerTopMargin"><span style={{color: "#FF4300"}}>{approveDabeenersNum}</span>/{needPersonnel}</div>
                     </div>
                     {
                        applyCheck === "y" && isMe && <button className="pay">결제!</button>
                     }
                 </div>
                 <div className="drawerMiddle">
                    {applyDabeeners.map(dabeener => <ApplyDabeener key={dabeener.user.userNum} helpNum={helpNum} dabeener={dabeener} myNum={me.userNum} isMe={isMe} setApproveDabeenersNum={setApproveDabeenersNum}/>)}
                </div>
            </DrawerForm>
        </Modal>
    );
};
export default CheckDabeener;