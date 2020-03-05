import styled from 'styled-components';

export const UploadImageDiv = styled.div`

& .uploadImageFlex {
        display: flex;
    }

    & .uploadImageButton {
        border: 1px dashed #BFC7CE;
        border-radius: 5px;
        color: #BFC7CE;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 5px;
        margin-right: 10px;
        padding: 5px;
        width: 120px;
        height: 120px;
        cursor: pointer;
    }

    & .previewImage {
        display: flex;
        margin-top: 5px;

        & .imgBorder{
            width: 120px;
            height: 120px;
            border: 1px solid #BFC7CE;
            border-radius: 4px;
            margin-right: 10px;

            & .deleteIcon{
                font-size: 12px;
                text-align: right;
                margin-left: 5px;
            }
        }

        & img{
            margin-left: 15px;
            margin-bottom: 10px;
        }
    }
`;