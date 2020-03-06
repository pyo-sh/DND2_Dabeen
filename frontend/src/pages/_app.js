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
import { loginRequestAction } from '../reducers/user';
import { getCookie } from '../utils/cookieFunction';

const Dabeen = ({ Component, store, pageProps, asPath }) => {
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
                  content: "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=yes"
              },
              {
                "http-equiv": "X-UA-Compatible",
                content: "IE=edge"
              }, 
              {
                name: "description",
                content: "DND Dabeen Project"
              },
              {
                name: "og:title",
                content: "Dabeen"
              },
              {
                name: "og:description",
                content: "DND Dabeen Project"
              },
              {
                property: "og:type",
                content: "website"
              }
          ]}
          link={[{},
            {
                rel: "shortcut icon",
                href: "/images/favicon.ico",
                type: "image/x-icon"
            },
          ]}
        >
        </Helmet>
          <AppLayout asPath={asPath}>
            <Component {...pageProps} />
          </AppLayout>
      </Provider>
      // 컴포넌트가 AppLayout의 props로 듶어감
  );
};

Dabeen.getInitialProps = async context => {
  const { ctx, Component } = context;
  let pageProps = {};
 // 리덕스의 스토어 안에 있는 state 불러오기 가능
  const asPath = ctx.asPath;
  const state = ctx.store.getState();
  let cookie = "";
  if (ctx.isServer && ctx.req.headers.cookie) { // 쿠키를 서버일 때는 헤더에서 아닐 때는 getCookie로 넣어준다.
    cookie = ctx.req.headers.cookie.split('=')[1];
  }
  else if(!ctx.isServer) {
    cookie = getCookie();
  }
  
  // 서버쪽일 땐 axios의 쿠키가 없어서 헤더에 쿠키를 넣어줬던거고
  // 프론트는 알아서 withCredentials 가 되던것..
  // 그러면 나는 그건 필요 없이 dispatch 할 때 쿠키를 넣어주도록 하자..
  // 아니면 cookiee 넣어두고.. 갖고 오는 방법이 있나 
  if(!state.user.me.userNum && cookie) {
    ctx.store.dispatch(loginRequestAction({cookie}));
  }
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx, cookie);
  }
  
  return { pageProps, asPath };
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
