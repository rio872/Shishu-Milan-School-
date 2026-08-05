import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AcademicsPage from './pages/AcademicsPage';
import FacilitiesPage from './pages/FacilitiesPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import ApplyPage from './pages/ApplyPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/academics"
          element={<AcademicsPage />}
        />
        <Route
          path="/facilities"
          element={<FacilitiesPage />}
        />
        <Route
          path="/gallery"
          element={<GalleryPage />}
        />
        <Route
          path="/contact"
          element={<ContactPage />}
        />
        <Route
          path="/apply"
          element={<ApplyPage />}
        />

        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}