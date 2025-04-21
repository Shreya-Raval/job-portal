import apiCall from "../helpers/api";

export const getJobs = () => apiCall.get("/job");
export const getJobById = (id) => apiCall.get(`/job/${id}`);
export const createJob = (data) => apiCall.post("/job", data);
export const updateJob = (id, data) => apiCall.put(`/job/${id}`, data);
export const deleteJob = (id) => apiCall.delete(`/job/${id}`);
