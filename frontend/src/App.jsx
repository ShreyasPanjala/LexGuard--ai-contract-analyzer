import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import AnalyzePage from './pages/AnalyzePage';
import NotFoundPage from './pages/NotFoundPage';

/**
 * App — root component.
 *
 * Sets up the client-side router and mounts the route tree inside MainLayout.
 * All routes share the Navbar and Footer via the Outlet in MainLayout.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="analyze" element={<AnalyzePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
