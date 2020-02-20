import React from "react";
import AppLayout from "../components/AppLayout";
import Helmet from 'react-helmet';
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";
import reducer from "../reducers";
import axios from "axios";

const Dabeen = ({ Component, store, pageProps }) => {
  return (
      <Provider store={store}>
        <Helmet
          title = "Dabeen"
          htmlAttributes={{lang : 'ko'}}
          meta={[
              {
                  charset: "UTF-8"
              },
              {
                  name: "viewport",
                  content: "width=device-witdh, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=yes"
              },
              {
                "http-equiv": "X-UA-Compatible",
                content: "IE=edge"
              },
          ]}
          link={[{},
            {
              rel: "stylesheet",
              href:
                "https://cdnjs.cloudflare.com/ajax/libs/antd/3.25.3/antd.css"
            },
            {
                rel: "shortcut icon",
                href: "/images/favicon.ico",
                type: "image/x-icon"
            },
            {
              rel: "stylesheet",
              href:
                "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            },
            {
              rel: "stylesheet",
              href:
                "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            }
          ]}
        >
        </Helmet>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
      </Provider>
      // 컴포넌트가 AppLayout의 props로 듶어감
  );
};

Dabeen.getInitialProps = async context => {
  const { ctx, Component } = context;
  let pageProps = {};
  // const state = ctx.store.getState(); 리덕스의 스토어 안에 있는 state 불러오기 가능
  const user = await axios.get("http://15.164.2.26:3307/api/user/2002170001");
  console.log(user);
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  // 만약에 localstroage에 토큰이 있으면 로그인 하는 로직을 추가합시다!!
  return { pageProps };
};

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : compose(
          applyMiddleware(...middlewares),
          !options.isServer &&
            typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f
        );
  const store = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};
export default withRedux(configureStore)(withReduxSaga(Dabeen));
