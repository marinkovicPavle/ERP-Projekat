import React, { Fragment, useEffect } from 'react';
import Router from 'next/router';
import {wrapper} from '../store';

// global styles
import 'swiper/swiper.scss';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';
import '../assets/css/styles.scss';

import * as gtag from './../utils/gtag';

/*moji importovi*/
import { AuthProvider } from '../context/AuthContext'

const isProduction = process.env.NODE_ENV === 'production';

// only events on production
if(isProduction) {
  
  // Notice how we track pageview when route is changed
  Router.events.on('routeChangeComplete', (url) => gtag.pageview(url));
}

const MyApp = ({Component, pageProps}) => {
    return(
  <AuthProvider>
    <Fragment>
        <Component {...pageProps} />
    </Fragment>
  </AuthProvider>
)};

export default wrapper.withRedux(MyApp);