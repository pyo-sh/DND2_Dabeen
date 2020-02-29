import styled from 'styled-components';

export const UserInfoWrapper = styled.div`
         & .userinfoTitle {
           display: flex;
           justify-content: space-between;
           align-items: flex-end;
           padding-bottom: 25px;
           border-bottom: 1px solid #bfc7ce;
           font-size: 40px;
           font-weight: bold;
         }
         & .userinfoEditBtn,
         .userRefundBtn {
           width: 80px;
           height: 30px;
           color: white;
           background: #ff4300;
           border: none;
           border-radius: 10px;
           font-size: 14px;
           transition: 0.3s;
           cursor: pointer;
           &:hover {
             background: rgba(255, 67, 0, 0.9);
           }
           &:focus {
             outline: none;
           }
         }
         & .userinfoWrapper {
           padding: 20px;
         }
         & .userinfoContent {
           font-size: 20px;
           display: flex;
           & .userinfoContentName {
             min-width: 120px;
             margin: 20px 0;
             border-right: 1px solid #f0f0f0;
             & .icon {
               color: #ff4300;
             }
           }
           & .userinfoContentValue {
             word-wrap: break-word;
             white-space: normal;
             min-width: 120px;
             margin: 20px;
             margin-right: 0;
           }
           & .userRefundBtn {
             margin: 20px;
           }
           & .userinfoContentValueWrapper {
             display: flex;
             flex-wrap: wrap-reverse;
             min-width: 120px;
           }
         }
       `;