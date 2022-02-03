import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './containers/LoadingPage/LoadingPage';

const Home = lazy(() => import('./containers/Home/Home'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
