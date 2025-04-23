const Application = require("../models/ApplicationModel");
const Job = require("../models/JobModel");
const path = require("path");

const applyForJob = async (req, res) => {
    const { job_id } = req.body;
    const applicant_id = req.user.userId;
    const resume = req.file ? "uploads/" + path.join(path.basename(req.file.destination), req.file.filename) : null;
  
    try {

      if(!job_id){
          res.status(400).json({ message: 'Job not found' });
      }

      const alreadyApplied = await Application.findOne({ job_id, applicant_id });
      if (alreadyApplied) {
        return res.status(400).json({ message: 'Already applied to this job.' });
      }
  
      const application = new Application({
        job_id,
        applicant_id,
        resume
      })
  
      await application.save();
  
      res.status(200).json({ message: 'Application submitted successfully.', data: {application} });
    } catch (err) {
      res.status(500).json({ message: 'Error submitting application.', error: err.message });
    }
  };

const getMyApplications = async(req,res) => {
    try{
        const applications = await Application.find({ applicant_id: req.user.userId }).populate('job_id').sort({createdAt : -1});
        res.status(200).json({ message: 'Application Details Fetched Successfully.', data:  applications  });
    } catch(err){
        res.status(500).json({ message: 'Failed to fetch applications.', error: err.message });
    }
}  

const getJobApplicantions = async(req,res) => {
    try{
        const allPostedJobs = await Job.find({ createdBy: req.user.userId }, '_id' );
        const jobIds = allPostedJobs.map(job => job._id );

        const applications = await Application.find({ job_id: {$in: jobIds}  }).populate('job_id','title location').populate('applicant_id','firstName lastName email').sort({ createdAt : -1});
        res.status(200).json({ message: 'Application Details Fetched Successfully.', data: { applications } });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch recruiter applications.', error: err.message });
    }
}

const updateApplicationStatus = async (req, res) => {

    const { applicationId } = req.params;
    const { status } = req.body;
  
    try {
      const application = await Application.findById(applicationId).populate('job_id');
  
      if (!application) {
        return res.status(404).json({ message: 'Application not found.' });
      }

      if (application.job_id.createdBy.toString() !== req.user.userId.toString()) {
        return res.status(400).json({ message: 'You are not authorized to update this application.' });
      }
  
      application.status = status;
      await application.save();
  
      res.status(200).json({ message: `Application ${status} successfully.` });
    } catch (err) {
      res.status(500).json({ message: 'Failed to update application status.', error: err.message });
    }
  };
  

module.exports = { applyForJob, getMyApplications, getJobApplicantions , updateApplicationStatus }