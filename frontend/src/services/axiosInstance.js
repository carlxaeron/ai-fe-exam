import axios from 'axios';
import store from '@/store';

const axiosInstance = (config) => axios.create({
    timeout: 10000,
    headers: {
      'Content-Type': config && config.formData ? 
        'multipart/form-data' : 'application/json',
      'X-Username': store.state.currentUser ? store.state.currentUser.username : '',
    },
  });

export default axiosInstance;