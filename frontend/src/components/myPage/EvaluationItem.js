import React, {memo} from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import StarScore from './StarScore';

const EvaluationItem = ({eItem}) => {
    const {nickname, profile, comment, score, date } = eItem;
    return (
        <EItemBox>
            <div className="eProfile">
            </div>
            <div>
                <div>{nickname}</div>
                <div><StarScore score={score}/>{date}</div>
                <div>{comment}</div>
            </div>
        </EItemBox>
    );
};

const EItemBox = styled.div`
    border-bottom : 1px solid black;
    display : flex;
    & .eProfile {
        border : 1px solid black;
        border-radius : 50%;
        width : 75px;
    }
    & div .eStar {
        color : #FF4300;
    }
`;

export default memo(EvaluationItem);