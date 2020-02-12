import React from "react";
import { Button } from 'antd';

const ChargeItem = ({ c, selectCoinOnClick }) => {
  return (
    <div>
      <span>코인{c.coin}개</span>
      <Button onClick={selectCoinOnClick(c)}>{c.coin * 100}원</Button>
    </div>
  );
};

export default ChargeItem;
