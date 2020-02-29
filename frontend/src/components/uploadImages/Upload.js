import React, {useCallback, useState, useRef} from 'react';
import {Icon} from 'antd';
import styled from 'styled-components';

//getUrls = url을 저장할 함수
//getImages = image를 저장할 함수
const Upload = ({urls, images, getUrls, getImages}) => {
    const [key, setKey] = useState(0);
    const imageInput = useRef();

    const addFile = useCallback((e)=> {
        getImages([...images, {key: key, image: e.target.files}]);
        getUrls([...urls, {key: key, url:URL.createObjectURL(e.target.files[0])}]); 
        setKey(key+1);
    }, [images, urls, key]);
    
    // const onChangeImages = useCallback((e) => {
    //     console.log(e.target.files);
    //     const imageFormData = new FormData();
    //     [].forEach.call(e.target.files, (f) => {
    //         imageFormData.append('image', f);
    //     });
    // }, []);

    // const onClickImageUpload = useCallback(() => {
    //     imageInput.current.click();
    // }, [imageInput.current]);

    return (
        <div>
            <label className="uploadImage" for="fileUpload">
                <Icon type="upload" />Upload
            </label>
            <input type="file" id="fileUpload" onChange={addFile}/>
            {/* <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages}/>
            <Button onClick={onClickImageUpload}><Icon type="upload" />Upload</Button> */}
        </div>
    );
};

export default Upload;