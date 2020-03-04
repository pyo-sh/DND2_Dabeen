import React, { useMemo } from 'react';
import { Icon } from 'antd';
import {Modal, DrawerForm} from './CheckDabeener.style';
import EvaluateDabeener from './EvaluateDabeener';

const EvaluateModal = ({onEvaluateModal,helpNum, evalDabeener, approveDabeenersNum, setApproveDabeenersNum}) => {
    // const {helpPosts} = useSeletor(state => state.posts);

    const evaledCount = useMemo(() => evalDabeener.reduce((acc, current) => { // 평가 된 사람의 수를 세고 싶다.
        if (current.rate !== null) {
            return acc + 1;
        }
        return acc;
    }, 0), [evalDabeener])

    return (
        <Modal>
            <DrawerForm>
                <div className="drawerTitle">
                    <div>도와 준 다비너</div><Icon type="close" className="icon" onClick={onEvaluateModal}/>
                </div>
                <div className="drawerTop">
                    <div className="drawerTopFlex">
                     </div>
                     <div className="drawerTopFlex">
                     <div className="drawerTopMargin">평가인원</div>
                        <div className="drawerTopMargin"><span style={{color: "#FF4300"}}>{evaledCount}</span>/{evalDabeener.length}</div>
                     </div>
                 </div>
                 <div className="drawerMiddle">
                    {evalDabeener.map(dabeener => <EvaluateDabeener key={dabeener.user.userNum} helpNum={helpNum} dabeener={dabeener}/>)}
                </div>
            </DrawerForm>
        </Modal>
    );
};
export default EvaluateModal;