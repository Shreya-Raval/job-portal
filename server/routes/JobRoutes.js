const express = require("express");
const router = express.Router();

const {getJobs, createJob,updateJob,deleteJob} = require("../controllers/JobController");
const {authentication,authorization} = require("../middleware/AuthMiddleware");

router.get('/', authentication, getJobs);
router.post('/', authentication, authorization(['admin', 'recruiter']), createJob);
router.get('/:id', authentication, getJobs);
router.put('/:id', authentication, authorization(['admin', 'recruiter']), updateJob);
router.delete('/:id', authentication, authorization(['admin', 'recruiter']), deleteJob);

module.exports = router;