import {useState, useCallback} from 'react';

export const inputCheckChangeHook = (initialState, checkObject) => {
    const [customState, customSetState] = useState(initialState);

    const onChangeFunc = useCallback((e) => {
        const targetString = e.target.value;    // Input창의 value 값
        let deleteString = targetString;
        // checkObject들을 모두 지운다.
        checkObject.forEach(element => {
            deleteString = deleteString.replace(element, "");
        });
        // 지운 값이 비어있다면?? setState
        if(!deleteString)
            customSetState(e.target.value);
    } ,[]);
    return [customState, onChangeFunc];
};

const inputChangeHook = (initialState) => {
    const [basic, setBasic] = useState(initialState);

    const onChange = useCallback((e) => {
        setBasic(e.target.value)
    }, []);

    return [
        basic,
        onChange
    ]
};

export default inputChangeHook;