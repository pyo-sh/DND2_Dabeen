import React, {useCallback, useState} from 'react';
import {Icon} from 'antd';

//getUrls = url을 저장할 함수
//getImages = image를 저장할 함수
const Upload = ({urls, images, getUrls, getImages}) => {
    const [key, setKey] = useState(0);

    const addFile = useCallback((e)=> {
        getImages([...images, {key: key, image: e.target.files}]);
        getUrls([...urls, {key: key, url:URL.createObjectURL(e.target.files[0])}]); 
        setKey(key+1);
    }, [images, urls, key]);
    
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