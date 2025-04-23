const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    job_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },
    applicant_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    applied_at : {
        type: Date,
        default: Date.now
    },
    resume : {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, { timestamps : true });

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;