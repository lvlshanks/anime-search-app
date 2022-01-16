import React from 'react';
import {
  Route, Routes,
} from 'react-router-dom';

const Home = React.lazy(
  () => import('./pages/Home/Home'),
);
const AnimeDetail = React.lazy(
  () => import('./pages/AnimeDetail/AnimeDetail'),
);
const NotFound = React.lazy(
  () => import('./pages/NotFound/NotFound'),
);

const App = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:animeID" element={<AnimeDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </React.Suspense>
);

export default App;
