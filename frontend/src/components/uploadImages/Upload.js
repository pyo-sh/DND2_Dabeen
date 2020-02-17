import React, {useCallback} from 'react';
import {Icon} from 'antd';

//getUrls = url을 저장할 함수
//getImages = image를 저장할 함수
const Upload = ({urls, images, getUrls, getImages}) => {

    const addFile = useCallback((e)=> {
        getImages([...images, e.target.files]);
        getUrls([...urls, URL.createObjectURL(e.target.files[0])]); 
    }, [images, urls]);
    
    return (
        <div>
            <label className="uploadImage" for="fileUpload">
                <Icon type="upload" />Upload
            </label>
            <input type="file" id="fileUpload" onChange={addFile}/>
        </div>
    );
};

export default Upload;