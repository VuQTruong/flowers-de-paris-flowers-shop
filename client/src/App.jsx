import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop/ScropToTop';
import LoadingPage from './containers/LoadingPage/LoadingPage';
import ClientLayout from './containers/client/ClientLayout/ClientLayout';
import AdminLayout from './containers/admin/AdminLayout/AdminLayout';

import Home from './containers/client/Home/Home';
import Page404 from './containers/Page404/Page404';

// lazy load components
const Dashboard = lazy(() => import('./containers/admin/Dashboard/Dashboard'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          {/* client routes */}
          <Route path='/' element={<ClientLayout />}>
            <Route index element={<Home />} />
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
