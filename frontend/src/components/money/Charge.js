// 충전
import React, { useCallback, useState } from "react";
import { Modal, Button } from "antd";
import styled from "styled-components";
import ChargeItem from "./ChargeItem";

const coins = [
  { key: 1, coin: 1 },
  { key: 5, coin: 100 },
  { key: 2, coin: 10 },
  { key: 6, coin: 200 },
  { key: 3, coin: 30 },
  { key: 7, coin: 300 },
  { key: 4, coin: 50 }
];
const Charge = ({ visible, setVisible }) => {
  const [selectCoin, setSelectCoin] = useState(0);
  const handleOk = useCallback(e => {
    e.preventDefault();
    // 다른 행동 취해야함.
    setVisible(prev => !prev);
  }, []);
  const handleCancel = useCallback(() => {
    setVisible(prev => !prev);
  }, []);
  const selectCoinOnClick = useCallback(
    c => e => {
      e.preventDefault();
      setSelectCoin(c.coin);
    },
    []
  );
  return (
    <CoinModal
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      title="충전"
      footer={[
        <Button key="submit" name="submit" onClick={handleOk}>
          확인
        </Button>,
        <Button key="cancel" name="cancel" onClick={handleCancel}>
          취소
        </Button>
      ]}
    >
      <div className="modalMain">
        <div className="coinBox">
          {coins.map((c, i) => (
            <ChargeItem c={c} selectCoinOnClick={selectCoinOnClick}/>
          ))}
        </div>
        <div className="coinContent">코인{selectCoin}개를 충전하시겠습니까?</div>
      </div>
    </CoinModal>
  );
};

const CoinModal = styled(Modal)`
  & .ant-modal-header div {
    font-size: 25px;
  }
  & .ant-modal-footer {
      display: flex;
      justify-content : center;
      & button[name="submit"] {
          background : tomato;
          color :white;
      }
      & button[name="cancel"] {
          background : #F0F0F0;
          color : black;
      }
  }

  & .modalMain {
    display: flex;
    flex-direction: column;
    align-items: center;
    & .coinContent {
        padding : 10px;
        font-size: 20px;
    }
  }
  & div .coinBox {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    & div {
      width: 50%;
      height: 6vh;
      display: flex;
      justify-content: space-around;
      align-items: center;
      & button {
        color: tomato;
        border: 1px solid tomato;
      }
      & button:focus {
        background: tomato;
        color: #fff;
      }
    }
  }
`;
export default Charge;
