import React, {useCallback, useRef} from 'react';
import {UploadImageDiv} from './Upload.style';
import {Icon} from 'antd';
import customAxios from '../../utils/axiosBase';
import { getCookie } from '../../utils/cookieFunction';

const Upload = ({images, setImages}) => {
    const imageInput = useRef();

    //이미지 삭제
    const deleteImage = useCallback((url, i) => () => {
        const imageFormData = new FormData();
        imageFormData.append('url', url);
        try{
            customAxios.post('/pic/delete', imageFormData, {headers : {Authorization: `Bearer ${getCookie()}`}});
            setImages(images.filter(image => image != url));
        }catch(e){
            console.error(e);
        }
    }, [images]);
    
    const onChangeImages = useCallback(async (e) => {
        const imageFormData = new FormData();
        imageFormData.append('pic', e.target.files[0]);
        try{
            const result = await customAxios.post('/pic/upload/help', imageFormData, {headers : {Authorization: `Bearer ${getCookie()}`}});
            setImages(prev => [...prev, result.data.data]);
        }catch(e){
            console.error(e);
        }
    }, []);

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

   return(
       <UploadImageDiv>
        <div className="uploadImageFlex">
            <input type="file" hidden ref={imageInput} onChange={onChangeImages}/>
            <div className="uploadImageButton" onClick={onClickImageUpload}>
                <Icon type="plus-circle" style={{fontSize: 25}}/>
                <div style={{fontSize: 23}}>UPLOAD</div>
            </div>
            <div className="previewImage">
                {images.map((url, i) => {
                    return(
                        <div key={url} className="imgBorder">
                        <div className="deleteIcon" onClick={deleteImage(url, i)}>
                            <Icon type="close" />
                        </div>
                        <img src={url} alt={url} width="90" height="90"/>
                        </div>
                    )
                })}
            </div>
        </div>
        </UploadImageDiv>
   )
};

export default Upload;