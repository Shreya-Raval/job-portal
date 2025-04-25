// import JobList from "./components/JobListing";
// import SideBar from "./components/SideBar";
// import { useOutletContext } from "react-router-dom";

// const Dashboard = () => {
//   const {user} = useOutletContext();
//   return (
//     <div className="flex min-h-screen">      
//       <SideBar/>

//       <div className="flex-1 p-8">
//         <div className="bg-blue-100 p-8 rounded-lg shadow text-center mb-6">
//           <h1 className="text-3xl font-bold">Hello {user?.userName}!</h1>
//           <p className="text-lg text-gray-700 mt-2">{user?.role === 'jobseeker' && "Ready to apply for jobs?"}{user?.role === 'recruiter' && "Manage applications and jobs"}{user?.role === 'admin' && "Manage jobs and users"}</p>
//         </div>

//        <JobList/>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import { useEffect, useState } from "react";
import JobList from "./components/JobListing";
import TopNav from "./components/TopNav"; // Renamed from SideBar
import { useOutletContext } from "react-router-dom";

const Dashboard = () => {
  const { user } = useOutletContext();
  const [currentEmoji, setCurrentEmoji] = useState("👋");
  
  // Emoji typing effect
  useEffect(() => {
    const emojis = ["👋", "💼", "🚀", "✨", "🔍", "💯", "🎯"];
    let index = 0;
    
    const interval = setInterval(() => {
      index = (index + 1) % emojis.length;
      setCurrentEmoji(emojis[index]);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  const getRoleMessage = () => {
    switch(user?.role) {
      case 'jobseeker':
        return "Ready to find your dream job?";
      case 'recruiter':
        return "Manage your job listings and applications";
      case 'admin':
        return "Oversee platform activity and user management";
      default:
        return "Welcome to the job portal";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <TopNav />
      <div className="flex-1 p-6">
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-8 rounded-lg shadow-lg text-center mb-6">
          <h1 className="text-4xl font-bold flex items-center justify-center">
            Hello {user?.userName}! <span className="ml-2">{currentEmoji}</span>
          </h1>
          <p className="text-xl text-gray-300 mt-3">
            {getRoleMessage()}
          </p>
        </div>
        <JobList />
      </div>
    </div>
  );
};

export default Dashboard;
