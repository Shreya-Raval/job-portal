import JobList from "./components/JobListing";
import SideBar from "./components/SideBar";
import { useOutletContext } from "react-router-dom";

const Dashboard = () => {
  const {user} = useOutletContext();
  return (
    <div className="flex min-h-screen">      
      <SideBar/>

      <div className="flex-1 p-8">
        <div className="bg-blue-100 p-8 rounded-lg shadow text-center mb-6">
          <h1 className="text-3xl font-bold">Hello {user?.userName}!</h1>
          <p className="text-lg text-gray-700 mt-2">{user?.role === 'jobseeker' && "Ready to apply for jobs?"}{user?.role === 'recruiter' && "Manage applications and jobs"}{user?.role === 'admin' && "Manage jobs and users"}</p>
        </div>

       <JobList/>
      </div>
    </div>
  );
};

export default Dashboard;
