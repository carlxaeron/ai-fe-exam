import axios from 'axios';

const axiosInstance = (config) => axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': config && config.formData ? 
      'multipart/form-data' : 'application/json',
  },
});

export default axiosInstance;