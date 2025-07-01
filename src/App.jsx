import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './pages/MainLayout';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Settings from './pages/settings';
import Projects from './pages/Projects';
import LandingPage from './pages/landing';
import Tasks from './pages/Tasks';
import ProfilePage from './pages/profile';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Main Layout with nested routes */}
        <Route path="/u" element={<MainLayout />}>
          <Route path="profil" element={<ProfilePage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="calendrier" element={<Calendar />} />
          <Route path="projets" element={<Projects />} />
          <Route path="parametres" element={<Settings />} />
          <Route path="taches" element={<Tasks />} />
        </Route>

        <Route
          path="*"
          element={
            <div className="p-10 text-center text-2xl">404 Page Not Found</div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
