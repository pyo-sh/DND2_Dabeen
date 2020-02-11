import React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';

const StarIcon = styled(Icon)`
    color : #FF4300;
`;
const StarScore = ({score}) => {
    return (
        <>
            {Array(Math.round(score)).fill(null).map(e => <StarIcon className="eStar" type="star" theme="filled"/>)}
        </>
    );
};

export default StarScore;