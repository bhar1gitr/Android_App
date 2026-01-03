import axios from 'axios';

// Replace '192.168.x.x' with your actual Computer IP address
// Use '10.0.2.2' if you are using the Android Emulator
// Change from 1.5 to 1.8
const BASE_URL = 'http://192.168.1.8:3000/api';

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;