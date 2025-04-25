import { useNavigate, useOutletContext } from "react-router-dom";
import Cookies from "js-cookie";
import apiCall from "../../helpers/api";

// Import icons
const ProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

const ApplicationsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 3a1 1 0 10-2 0v6.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L14 12.586V6z" clipRule="evenodd" />
  </svg>
);

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);

const TopNav = () => {
  const navigate = useNavigate();
  const { user } = useOutletContext();
  
  const handleLogout = async () => {
    try {
      await apiCall.get("/auth/logout");
      Cookies.remove('portalUserInfo');
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold">Job Portal</h1>
      </div>
      
      <div className="flex space-x-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-1 text-gray-300 hover:text-white"
        >
          <HomeIcon />
          <span>Home</span>
        </button>
        
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center space-x-1 text-gray-300 hover:text-white"
        >
          <ProfileIcon />
          <span>Profile</span>
        </button>
        
        {user?.role === "recruiter" && (
          <button
            onClick={() => navigate("/job-applications")}
            className="flex items-center space-x-1 text-gray-300 hover:text-white"
          >
            <ApplicationsIcon />
            <span>Applicants</span>
          </button>
        )}
        
        {user?.role === "admin" && (
          <button
            onClick={() => navigate("/manage-users")}
            className="flex items-center space-x-1 text-gray-300 hover:text-white"
          >
            <UsersIcon />
            <span>Users</span>
          </button>
        )}
        
        {user?.role === "jobseeker" && (
          <button
            onClick={() => navigate("/my-applications")}
            className="flex items-center space-x-1 text-gray-300 hover:text-white"
          >
            <ApplicationsIcon />
            <span>My Applications</span>
          </button>
        )}
        
        <button
          onClick={handleLogout}
          className="flex items-center space-x-1 text-red-400 hover:text-red-300"
        >
          <LogoutIcon />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default TopNav;