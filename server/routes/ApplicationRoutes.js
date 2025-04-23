const express = require("express");
const { applyForJob,getMyApplications, getJobApplicantions,updateApplicationStatus } = require("../controllers/ApplicationController.js");
const {  authentication, authorization } = require("../middleware/AuthMiddleware.js");
const uploadWithModule = require("../helpers/FileUploadHelper.js");

const router = express.Router();

router.post('/apply', authentication,authorization(['jobseeker']), uploadWithModule("application").single('resume'), applyForJob);
router.get('/my-applications', authentication,authorization(['jobseeker']), getMyApplications);
router.get('/job-applications', authentication,authorization(['recruiter']), getJobApplicantions);
router.get('/job-applications', authentication,authorization(['recruiter']), getJobApplicantions);
router.patch('/application/:applicationId/updateStatus', authentication,authorization(['recruiter']), updateApplicationStatus);

module.exports = router;