import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const analyzeResumes = async (jobDescription, resumes) => {
  const formData = new FormData();
  formData.append('job_description', jobDescription);
  
  resumes.forEach((resume) => {
    formData.append('resumes', resume);
  });

  const response = await axios.post(`${API_URL}/match`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};
