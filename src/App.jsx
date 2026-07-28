import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AcademicsPage from './pages/AcademicsPage';
import FacilitiesPage from './pages/FacilitiesPage';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/academics" element={<AcademicsPage />} />
        <Route path="/facilities"element={<FacilitiesPage />} />
   
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}