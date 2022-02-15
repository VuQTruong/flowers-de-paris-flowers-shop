import { useState } from 'react';
import { Suspense, lazy } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop/ScropToTop';
import LoadingPage from './containers/LoadingPage/LoadingPage';
import ClientLayout from './containers/client/ClientLayout/ClientLayout';
import AdminLayout from './containers/admin/AdminLayout/AdminLayout';
import UserLayout from './containers/client/UserLayout/UserLayout';

import Home from './containers/client/Home/Home';
import Page404 from './containers/Page404/Page404';

import { fetchSlidesInfo } from './features/config/fetch-slides-info';
import { fetchLayoutInfo } from './features/config/fetch-layout-info';
import { fetchCategories } from './features/categories/fetch-categories';
import { verifyUser } from './features/users/verify-user';
import { setUpAxiosResponseInterceptor } from './config/axios';
import Loading from './components/Loading/Loading';

// lazy load components
const Dashboard = lazy(() => import('./containers/admin/Dashboard/Dashboard'));
const Signin = lazy(() => import('./containers/client/Signin/Signin'));
const Signup = lazy(() => import('./containers/client/Signup/Signup'));
const OAuthFail = lazy(() => import('./containers/client/OAuthFail/OAuthFail'));
const Unauthorized = lazy(() =>
  import('./containers/Unauthorized/Unauthorized')
);
const Forbidden = lazy(() => import('./containers/Forbidden/Forbidden'));
const UserInfo = lazy(() => import('./containers/client/UserInfo/UserInfo'));
const UserFavorites = lazy(() =>
  import('./containers/client/UserFavorites/UserFavorites')
);
const UserOrders = lazy(() =>
  import('./containers/client/UserOrders/UserOrders')
);
const ProductsList = lazy(() =>
  import('./containers/client/ProductsList/ProductsList')
);
const ProductDetails = lazy(() =>
  import('./containers/client/ProductDetails/ProductDetails')
);

function App() {
  const dispatch = useDispatch();
  const [isInitialzing, setIsInitialzing] = useState(true);

  const { userInfo } = useSelector((state) => state.currentUser);

  useEffect(() => {
    const initApp = async () => {
      // fetch app config
      dispatch(fetchSlidesInfo());
      dispatch(fetchLayoutInfo());

      // verify the validity of user's token (jwt) or session (oauth2) each time the application is reloaded and update the userInfo in the localStorage
      dispatch(verifyUser());

      // fetch categories
      dispatch(fetchCategories());

      // set up axios response interceptor to check the expiration of user's session
      setUpAxiosResponseInterceptor(userInfo, dispatch);

      setIsInitialzing(false);
    };

    initApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isInitialzing ? (
    <main className='container flex center col' style={{ height: '100vh' }}>
      <Loading />
      <h2 style={{ marginTop: '-2em' }}>
        Our website will be ready to serve you in just a moment...
      </h2>
    </main>
  ) : (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          {/* client routes */}
          <Route path='/' element={<ClientLayout />}>
            <Route index element={<Home />} />
            <Route path='signin' element={<Signin />} />
            <Route path='signup' element={<Signup />} />
            <Route path='user' element={<UserLayout />}>
              <Route path='info' element={<UserInfo />} />
              <Route path='fav' element={<UserFavorites />} />
              <Route path='orders' element={<UserOrders />} />
            </Route>
            <Route path='products' element={<ProductsList />} />
            <Route path='products/:categorySlug' element={<ProductsList />} />
            <Route
              path='products/:categorySlug/:productSlug'
              element={<ProductDetails />}
            />
            <Route path='oauth/fail' element={<OAuthFail />} />
          </Route>

          {/* admin routes */}
          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
          </Route>

          <Route path='/warning/unauthorized' element={<Unauthorized />} />
          <Route path='/warning/forbidden' element={<Forbidden />} />

          {/* page not found */}
          <Route path='*' element={<Page404 />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
