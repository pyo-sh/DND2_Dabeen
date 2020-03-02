import React, {useCallback, useRef} from 'react';
import {UploadImageDiv} from './Upload.style';
import {Icon} from 'antd';
import customAxios from '../../utils/axiosBase';
import axios from 'axios';
import { getCookie } from '../../utils/cookieFunction';

const Upload = ({images, setImages, imgPaths, setImgPaths}) => {
    const imageInput = useRef();

    //이미지 삭제
    const deleteImage = useCallback((url, i) => () => {
        const imageFormData = new FormData();
        imageFormData.append('url', url);
        try{
            axios.post('/pic/delete', imageFormData, {headers : {Authorization: `Bearer ${getCookie()}`}});
            setImages(images.filter(image => image != url));
            console.log(images);
            // const index = imgPaths.findIndex(path => path.pic_ornu == i+1);
            // console.log(index)
            // setImgPaths(imgPaths.splice(index, 1));
            // setImgPaths(imgPaths.filter(path => Object.values(path) !== url));
        }catch(e){
            console.log(e.response);
        }
    }, [images]);

    const onChangeImages = useCallback(async (e) => {
        const imageFormData = new FormData();
        // console.log(e.target.files[0]);
        imageFormData.append('pic', e.target.files[0]);
        // console.log(imageFormData.get('pic'));
        try{
            const result = await customAxios.post('/pic/upload/help', imageFormData, {headers : {Authorization: `Bearer ${getCookie()}`}});
            console.log(result);
            // setImages(prev => [...prev, {"path" : result.data.data}]);
            setImages(prev => [...prev, result.data.data]);
            // setImgPaths(prev => [...prev, {"pic_ornu": prev.length + 1, "path": result.data.data}]);
        }catch(e){
            console.log(e.response);
        }
    }, []);

    console.log(imgPaths)
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