// apiService.js
import axios from 'axios';
import { API_ENDPOINT, USER_ID, API_KEY,general_ascendant_report,
basic_panchang,
horoscope,
Birth_horo_chart,planets,majorvdasha } from './Constants';
var Buffer = require('buffer/').Buffer
const baseURL = 'https://json.astrologyapi.com/v1/';

const api = axios.create({
  baseURL
});

api.interceptors.request.use((config) => {
  const auth = 'Basic ' + Buffer.from(USER_ID + ':' + API_KEY).toString('base64');
  config.headers.Authorization = auth;
  return config;
});


export const getChart = async (chartId, data,header) => {
    const url = `${API_ENDPOINT}/${chartId}`;
    console.log('Request URL:', baseURL + url);
  
    try {
      const response = await api.post(url, data,header);
    
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  export const getAscentReport = async (data,header) => {
    const url = `${general_ascendant_report}`;
    console.log('Request URL:', baseURL + url);
  
    try {
      const response = await api.post(url, data,header);
    
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  export const getBasicPanchang = async (data,header) => {
    const url = `${basic_panchang}`;
    console.log('Request URL:', baseURL + url,);
  
    try {
      const response = await api.post(url, data,header);
    
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  export const getplanets = async (data,header) => {
    const url = `${planets}`;
    console.log('Request URL:', baseURL + url,);
  
    try {
      const response = await api.post(url, data,header);
    
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  export const getdasha = async (data,header) => {
    const url = `${majorvdasha}`;
    console.log('Request URL:', baseURL + url,);
  
    try {
      const response = await api.post(url, data,header);
    
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  export const getKpHoroscope = async (data,header) => {
    const url = `${horoscope}`;
    console.log('Request URL:', baseURL + url);
  
    try {
      const response = await api.post(url, data,header);
    
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  export const getBirthChart = async (data) => {
    const url = `${Birth_horo_chart}`;
    console.log('Request URL:', baseURL + url);
  
    try {
      const response = await api.post(url, data,{
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language':'en'
        },
      });
    
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };  




  
