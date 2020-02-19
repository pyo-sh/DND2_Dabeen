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

const Dabeen = ({Component, store, pageProps}) => {
    return (
        <Provider store={store}>
        <>
        <style jsx global>{`
        html, body {
            height : 100%;
            overflow: auto;
        }
        body {
            font-family: "Noto Sans KR", sans-serif;
        }
        #__next {
            height: 100%;
        }
      `}</style>
            <Head>
                <title>Dabeen</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.25.3/antd.css"/>
                <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon"/>
                <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap" rel="stylesheet"/>
                <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            </Head>
                <AppLayout>
                    <Component {...pageProps} />
                </AppLayout>
        </>
    </Provider> // 컴포넌트가 AppLayout의 props로 듶어감
    );
};

Dabeen.getInitialProps = async context => {
    const { ctx, Component } = context;
    let pageProps = {};
    // const state = ctx.store.getState(); 리덕스의 스토어 안에 있는 state 불러오기 가능

    if (Component.getInitialProps) { 
        pageProps = await Component.getInitialProps(ctx);
    }
    // 만약에 localstroage에 토큰이 있으면 로그인 하는 로직을 추가합시다!!
    return { pageProps };
};

const configureStore = (initialState, options) => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const enhancer = process.env.NODE_ENV === 'production' ? compose(applyMiddleware(...middlewares)) :
    compose(applyMiddleware(...middlewares),
    !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : 
    (f) => f);
    const store = createStore(reducer, initialState, enhancer);
    sagaMiddleware.run(rootSaga);
    return store;
};
export default withRedux(configureStore)(Dabeen);