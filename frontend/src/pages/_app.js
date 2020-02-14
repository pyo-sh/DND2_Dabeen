import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import reducer from '../reducers';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3065/api";

const Dabeen = ({Component, store}) => {
    return (
        <Provider store={store}>
        <>
        <style jsx global>{`
        body {
            font-family: 'Yeon Sung', 'Noto Sans KR', sans-serif ;
            margin : 0;
            padding : 0;
            width : 100%;
        }
      `}</style>
            <Head>
                <title>Dabeen</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.25.3/antd.css"/>
                <link href="https://fonts.googleapis.com/css?family=Yeon+Sung&display=swap" rel="stylesheet"/>
                <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            </Head>
                <AppLayout>
                    <Component/>
                </AppLayout>
        </>
    </Provider> // 컴포넌트가 AppLayout의 props로 듶어감
    );
};

const configureStore = (initialState, options) => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const enhancer = compose(applyMiddleware(...middlewares),
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : 
    (f) => f);
    const store = createStore(reducer, initialState, enhancer);
    sagaMiddleware.run(rootSaga);
    return store;
};
export default withRedux(configureStore)(Dabeen);