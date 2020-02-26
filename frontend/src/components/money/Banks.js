import React from 'react';
import { Select } from './Banks.style';

const banks = [
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
const Banks = ({selectOnChange}) => {
    return (
        <Select
            className="bankSelect"
            placeholder="은행선택"
            onChange={selectOnChange}
          >
            {banks.map((b, i) => (
              <option key={i} value={b}>
                {b}
              </option>
            ))}
          </Select>
    );
};

export default Banks;