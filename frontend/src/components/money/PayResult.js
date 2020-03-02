import React from 'react';
import { useSelector } from 'react-redux';
import { Result, Button } from 'antd';

const PayResult = ({ setVisible }) => {
    const result = useSelector(state => state.basket.payResult);
    return (
        <Result
            status="success"
            title="결제가 성공적으로 완료되었습니다."
            subTitle={"Order number : "+result.pymt_num+"   Price : "+result.pymt_price+"   Time : "+result.pymt_dttm.slice(0,10)+" T  "+result.pymt_dttm.slice(11,19)}
            extra={[
                <Button type="primary" key="console" onClick={setVisible}>
                    돌아가기
                </Button>
            ]}/>
    );
};

export default PayResult;