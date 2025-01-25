import axios from 'axios';
import store from '@/store';

const axiosInstance = (config) => axios.create({
    timeout: 10000,
    headers: {
      'x-username': store.state?.currentUser ? store.state.currentUser?.username : '',
      'Content-Type': config && config.formData ? 
        'multipart/form-data' : 'application/json',
    },
  });

export default axiosInstance;