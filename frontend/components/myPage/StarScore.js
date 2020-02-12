import React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';

const StarScore = ({score}) => {
    return (
        <>
            {Array(Math.round(score)).fill(null).map(e => <StarIcon className="eStar" type="star" theme="filled"/>)}
        </>
    );
};

const StarIcon = styled(Icon)`
    color : #FF4300;
`;

export default StarScore;