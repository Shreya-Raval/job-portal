import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import RecruiterDashboard from './pages/RecruiterDashboard';
import JobForm from './pages/JobForm';
import PublicRoute from './pages/routes/PublicRoute';
import ProtectedRoute from './pages/routes/ProtectedRoute';
import Home from './pages/Home';

function App() {

  return (
    
    <Router>
      <Routes>
          <Route path="/" element={<PublicRoute> <Home /> </PublicRoute>} />
          <Route path="/login" element={<PublicRoute> <Login /> </PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /> </PublicRoute>} />
        <Route 
          path="/dashboard" 
          element={
            // <ProtectedRoute >
            //   <Dashboard />
            // </ProtectedRoute>
            <Dashboard/>
          } 
        />
        <Route 
          path="/profile" 
          element={
            //  <ProtectedRoute>
            //    <Profile />
            //  </ProtectedRoute>
            <Profile />
          } 
        />
{/*         
        <Route path="/recruiter/dashboard" element={<ProtectedRoute allowedRoles={['recruiter']}> <RecruiterDashboard /> </ProtectedRoute>} /> */}
        <Route path="/job/edit/:id" element={<ProtectedRoute allowedRoles={['recruiter']}><JobForm /></ProtectedRoute>} /> 

        <Route path="/job/create" element={<ProtectedRoute allowedRoles={['recruiter']}> <JobForm /> </ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} /> 
      </Routes>
    </Router>
  );
}

export default App;