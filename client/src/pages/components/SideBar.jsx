import apiCall from "../../helpers/api";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SideBar = () => {
    const navigate = useNavigate();
    const {user,setUser} = useAuth()
    const handleLogout = async () => {
        try {
          await apiCall.get("/auth/logout");
          setUser(null); 
          navigate("/login");
        } catch (err) {
          console.error("Logout failed", err);
        }
      };

    return (
        <div className="w-1/5 bg-gray-100 p-6 border-r">
        <button
          onClick={() => navigate("/profile")}
          className="block w-full text-left text-blue-600 font-semibold mb-4 hover:underline"
        >
           Update Profile
        </button>
        {(user?.role === "recruiter" )  && (
          <>
          <button
            onClick={() => navigate("/jobs")}
            className="block w-full text-left text-blue-600 font-semibold mb-4 hover:underline"
          >
            View Applicants
          </button>
          </>
        )}
          {(user?.role === "admin" )  && (
            <>
          <button
          onClick={() => navigate("/manage-users")}
          className="block w-full text-left text-blue-600 font-semibold mb-4 hover:underline"
          >
            Manage Users
          </button>
        </>
        )}
          {(user?.role === "jobseeker" )  && (
          <button
            onClick={() => navigate("/manage-jobs")}
            className="block w-full text-left text-blue-600 font-semibold mb-4 hover:underline"
          >
            View Applications
          </button>
        )}
        <button
          onClick={handleLogout}
          className="block w-full text-left text-red-600 font-semibold hover:underline"
        >
           Logout
        </button>
      </div>
    );
};

export default SideBar;