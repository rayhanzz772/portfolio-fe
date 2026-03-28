// src/App.jsx
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const MainPage = lazy(() => import('./pages/MainPage'));
const Overview = lazy(() => import('./pages/Overview'));
const DetailPage = lazy(() => import('./pages/DetailPage'));
const CodingActivity = lazy(() => import('./pages/CodingActivity'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Certifiactions Page


// Awards Page


function App() {
  return (
    <Router>
      <Suspense fallback={<main className="min-h-screen bg-white" />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/portfolio" element={<Overview />} />
          <Route path="/coding-activity" element={<CodingActivity />} />

          {/* Dynamic detail page untuk semua jenis */}
          <Route path="/projects/:slug" element={<DetailPage />} />
          <Route path="/certifications/:slug" element={<DetailPage />} />
          <Route path="/awards/:slug" element={<DetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
