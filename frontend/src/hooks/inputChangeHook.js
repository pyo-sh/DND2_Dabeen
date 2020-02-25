import {useState, useCallback} from 'react';

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