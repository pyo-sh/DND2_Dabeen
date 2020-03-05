import React from 'react';
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';
import { BanksUpperDiv, BanksItemBox, Select } from './Banks.style';
import DabeenInput from "../signUp/InputFunctions";

const Banks = ({ tabKey, onTabClick, accountNumber, setAccountNumber, selectOnChange }) => {
  const { ownMilege } = useSelector(state => state.user.me);
  return (
    <BanksUpperDiv>
      <Tabs
        activeKey={tabKey}
        onTabClick={onTabClick}
      >
        <BanksItemBox tab="무통장 입금" key="d">
          <div className="BanksAccount">
            국민은행
              <div className="BanksAccountValue">939302 00 154654</div>
          </div>
        </BanksItemBox>
        <BanksItemBox tab="카드" key="c">
          <Select
            className="bankSelect"
            placeholder="은행선택"
            onChange={selectOnChange}
          >
            {bankOptions.map((b, i) => (
              <option key={i} value={b}>
                {b}
              </option>
            ))}
          </Select>
          <DabeenInput
            type="text"
            placeholder="카드 번호 12자"
            value={accountNumber}
            onChangeFunc={setAccountNumber}
          />
        </BanksItemBox>
        <BanksItemBox tab="휴대폰" key="p">
          <Select
            className="bankSelect"
            placeholder="통신사선택"
            onChange={selectOnChange}
          >
            {phoneOptions.map((b, i) => (
              <option key={i} value={b}>
                {b}
              </option>
            ))}
          </Select>
          <DabeenInput
            type="text"
            placeholder="핸드폰 번호 11자"
            value={accountNumber}
            onChangeFunc={setAccountNumber}
          />
        </BanksItemBox>
        <BanksItemBox tab="마일리지" key="m">
          <div className="BanksAccount">
            현재 보유마일리지
              <div className="BanksAccountValue">{ownMilege}</div>
          </div>
        </BanksItemBox>
      </Tabs>
    </BanksUpperDiv>
  );
};

const bankOptions = [
  "카카오",
  "신한",
  "우리",
  "국민",
  "IBK",
  "하나",
  "제일",
  "한국씨티",
  "농협",
  "부산",
  "수협"
];
const phoneOptions = [
  "SKT",
  "KT",
  "LG U+"
];

export default Banks;