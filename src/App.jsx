import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './pages/MainLayout';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';

import CreateProjectPage from './pages/CreateProject';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="calendrier" element={<Calendar />} />
          <Route path="projets" element={<CreateProjectPage />} />
        </Route>
        <Route path="*" element={<div className="p-10 text-center text-2xl">404 Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
