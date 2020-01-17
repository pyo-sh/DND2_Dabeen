import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import reducer from '../reducers';

const Dabeen = ({Component, store}) => {
    return (
      {/* <Provider store={store}> // 컴포넌트가 AppLayout의 props로 듶어감 */}
      <>
            <Head>
                <title>Dabeen</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.25.3/antd.css"/>
            </Head>
            <AppLayout>
                <Component/>
            </AppLayout>
        {/* </Provider> // 컴포넌트가 AppLayout의 props로 듶어감 */}</>
    );
};

// export default withRedux((initialState, options) => {
//     const sagaMiddleware = createSagaMiddleware();
//     const middlewares = [sagaMiddleware];
//     const enhancer = compose(applyMiddleware(...middlewares),
//     typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : 
//     (f) => f);
//     const store = createStore(reducer, initialState, enhancer);
//     sagaMiddleware.run(rootSaga);
//     return store;
// })(Dabeen);

export default Dabeen;