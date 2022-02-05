import { Suspense, lazy } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop/ScropToTop';
import LoadingPage from './containers/LoadingPage/LoadingPage';
import ClientLayout from './containers/client/ClientLayout/ClientLayout';
import AdminLayout from './containers/admin/AdminLayout/AdminLayout';

import Home from './containers/client/Home/Home';
import Page404 from './containers/Page404/Page404';

import { fetchCategories } from './features/categories/categories-slice';
import { verifyUser } from './features/auth/current-user-slice';

// lazy load components
const Dashboard = lazy(() => import('./containers/admin/Dashboard/Dashboard'));
const Signin = lazy(() => import('./containers/client/Signin/Signin'));
const Signup = lazy(() => import('./containers/client/Signup/Signup'));
const OAuthFail = lazy(() => import('./containers/client/OAuthFail/OAuthFail'));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyUser());
    dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          {/* client routes */}
          <Route path='/' element={<ClientLayout />}>
            <Route index element={<Home />} />
            <Route path='signin' element={<Signin />} />
            <Route path='signup' element={<Signup />} />
            <Route path='oauth/fail' element={<OAuthFail />} />
          </Route>

          {/* admin routes */}
          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
          </Route>

          {/* page not found */}
          <Route path='*' element={<Page404 />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
