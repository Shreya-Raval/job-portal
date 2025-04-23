const Job = require("../models/JobModel");

const getJobs = async(req,res) => {
    try{
        const jobId = req.params.id;
        let jobDetail;
        if(jobId){
            jobDetail = await Job.findById(req.params.id).populate('createdBy','firstName lastName');
            if(!jobDetail){
                return res.status(400).json({message: 'Job not found'});
            }
            return res.status(200).json({message: 'Job details fetched successfully', data : {jobDetail}});
        }
        const jobs = await Job.find();
        return res.status(200).json({jobs: jobs});
    } catch(err){
        return res.status(500).json({message: `Error occured while fetching jobs ${err}`});
    }
}

const createJob = async(req,res) => {
    try{
        const { title, description, company, location, salary, experience } = req.body;
        const job = new Job({
            title,
            description,
            company,
            location,
            salary,
            experience,
            createdBy : req.user.userId
        });
        await job.save();
        return res.status(200).json({message: "Job created successfully"})
    } catch(err){
        return res.status(500).json({message: `Error occured while creating jobs ${err}`});
    }
}

const updateJob = async(req,res) => {
    try{
        const id = req.params.id;
        const job = await Job.findById(id);
        if(!job){
            return res.status(400).json({message: 'Job not found'});
        }
        const { title, description, company, location,salary,experience } = req.body;
        const updatedJob = await Job.findByIdAndUpdate( id, {   title,
            description,
            company,
            location,
            salary,
            experience }, { new : true} );
        return res.status(200).json(  {message: "Job created successfully" , data: { updatedJob }}  );
    } catch(err){
        return res.status(500).json({message: `Error occured while updating jobs ${err}`});
    }
}

const deleteJob = async(req,res) => {
    try{    
        const id = req.params.id;
        const job = await Job.findById(id);
        if(!job){
            return res.status(400).json({message: 'Job not found'});
        }

        await Job.findByIdAndDelete( id );
        return res.status(200).json(  {message: "Job deleted successfully"}  );
    } catch(err){
        return res.status(500).json({message: `Error occured while deleting jobs ${err}`});
    }   
}

module.exports = { getJobs, createJob, updateJob, deleteJob  };