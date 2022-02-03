import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingPage from './containers/LoadingPage/LoadingPage';

const Home = lazy(() => import('./containers/Home/Home'));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/loading' element={<LoadingPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
