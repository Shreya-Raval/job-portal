import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Job Portal</h1>
        <p className="text-gray-600 mb-8">Find your dream job or hire top talent.</p>
        
        <div className="flex flex-col space-y-4">
          <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition">
            Login
          </Link>
          <Link to="/register" className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 rounded-md transition">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
