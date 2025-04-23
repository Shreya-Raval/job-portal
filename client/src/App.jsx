import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import JobForm from './pages/JobForm';
import PublicRoute from './pages/routes/PublicRoute';
import ProtectedRoute from './pages/routes/ProtectedRoute';
import Home from './pages/Home';
import MyApplications from './pages/MyApplications';
import RecruiterApplications from './pages/components/RecruiterApplication';
import ManageUsers from './pages/components/ManageUsers';

function App() {

  return (
    <Router>
      <Routes>
          
          <Route path="/" element={ <PublicRoute><Home /></PublicRoute> } />
          <Route path="/login" element={  <PublicRoute><Login /></PublicRoute> } />
          <Route path="/register" element={ <PublicRoute><Register /></PublicRoute> } />
        

          <Route element={<ProtectedRoute/>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={  <Profile />} />       
          </Route>  

          <Route element={<ProtectedRoute allowedRoles={['recruiter']}/>}>
            <Route path="/job/edit/:id" element={<JobForm />} /> 
            <Route path="/job/create" element={ <JobForm /> } />
            <Route path="/job-applications" element={ <RecruiterApplications /> } />
          </Route>  

          <Route element={<ProtectedRoute allowedRoles={['jobseeker']}/>}>
            <Route path="/my-applications" element={ <MyApplications /> }/>
          </Route>  

          <Route element={<ProtectedRoute allowedRoles={['admin']}/>}>
            <Route path="/manage-users" element={<ManageUsers />} />
          </Route>


        <Route path="*" element={<Navigate to="/login" replace />} /> 
      </Routes>
    </Router>
  );
}

export default App;