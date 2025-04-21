import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import RecruiterDashboard from './pages/RecruiterDashboard';
import JobForm from './pages/JobForm';

function App() {
  // Set up axios defaults on app load
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //   }
    
  //   // Set base URL if you're using a separate backend
  //   // axios.defaults.baseURL = 'http://localhost:5000';
  // }, []);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            // <ProtectedRoute>
            //   <Dashboard />
            // </ProtectedRoute>
              <Dashboard />
          } 
        />
        <Route 
          path="/profile" 
          element={
            // <ProtectedRoute>
            //   <Profile />
            // </ProtectedRoute>
            <Profile/>
          } 
        />
        
      <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
      <Route path="/recruiter/create" element={<JobForm />} />
      <Route path="/recruiter/edit/:id" element={<JobForm />} />


        {/* Redirect to login if no route matches */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;