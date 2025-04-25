import { useState, useEffect } from "react";
import apiCall from "../../helpers/api";
import { toast } from "react-toastify";

const ApplyModal = ({ isOpen, onClose, jobId }) => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      toast.error("Please upload a resume!");
      return;
    }

    const formData = new FormData();
    formData.append("job_id", jobId);
    formData.append("resume", resume);

    try {
      setLoading(true);
      await apiCall.post("/application/apply", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      
      // Show confetti
      setShowConfetti(true);
      toast.success("Application submitted successfully");
      
      // Close modal after confetti effect
      setTimeout(() => {
        setShowConfetti(false);
        onClose();
      }, 3000);
    } catch (error) {
      toast.error(`Error occurred while submitting application ${error?.response?.data?.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Clean up confetti when component unmounts
    return () => {
      setShowConfetti(false);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      {showConfetti && <Confetti />}
      <div className="bg-gray-800 text-white p-6 rounded-xl shadow-xl w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-semibold mb-6 text-center">Upload Resume</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Resume (PDF only)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="block w-full text-gray-300 bg-gray-700 border border-gray-600 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-sm text-gray-400 mt-2">Maximum file size: 5MB</p>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Apply Now"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Confetti Component
const Confetti = () => {
  useEffect(() => {
    const confettiElements = [];
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    // Create confetti particles
    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 10 + 5}px`;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.top = `-20px`;
      confetti.style.zIndex = '9999';
      confetti.style.borderRadius = `${Math.random() > 0.5 ? '50%' : '0'}`;
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      document.body.appendChild(confetti);
      confettiElements.push({
        element: confetti,
        x: parseFloat(confetti.style.left),
        y: parseFloat(confetti.style.top),
        speed: Math.random() * 3 + 2,
        rotation: Math.random() * 10 - 5,
        horizontalMovement: Math.random() * 5 - 2.5
      });
    }
    
    // Animate confetti
    const animateConfetti = () => {
      confettiElements.forEach((confetti, index) => {
        confetti.y += confetti.speed;
        confetti.element.style.top = `${confetti.y}px`;
        
        // Add horizontal movement
        confetti.x += confetti.horizontalMovement;
        confetti.element.style.left = `${confetti.x}vw`;
        
        // Add rotation
        confetti.element.style.transform = `rotate(${parseFloat(confetti.element.style.transform.replace('rotate(', '').replace('deg)', '')) + confetti.rotation}deg)`;
        
        // Remove confetti when it's off-screen
        if (confetti.y > window.innerHeight) {
          document.body.removeChild(confetti.element);
          confettiElements.splice(index, 1);
        }
      });
      
      if (confettiElements.length > 0) {
        requestAnimationFrame(animateConfetti);
      }
    };
    
    requestAnimationFrame(animateConfetti);
    
    // Clean up
    return () => {
      confettiElements.forEach(confetti => {
        if (document.body.contains(confetti.element)) {
          document.body.removeChild(confetti.element);
        }
      });
    };
  }, []);
  
  return null;
};

export default ApplyModal;