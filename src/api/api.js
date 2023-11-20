import axios from 'axios';

const baseURL = 'http://localhost:5223/api';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
});

const api = {
  
  // get Driver
  getDrivers: async () => {
    try {
      const response = await axiosInstance.get('/Driver');
      return response.data;
    } catch (error) {
      console.error('Error fetching Driver data:', error);
      throw error;
    }
  },

  // save Driver
  saveDriver: async () => {
    try {
      const response = await axiosInstance.post('/Driver');
      return response.data;
    } catch (error) {
      console.error('Error fetching Driver data:', error);
      throw error;
    }
  },

  // get Results
  getResults: async () => {
    try {
      const response = await axiosInstance.get('/Race');
      return response.data;
    } catch (error) {
      console.error('Error fetching Results data:', error);
    }
  },

  // get Teams
  getTeams: async () => {
    try {
      const response = await axiosInstance.get('/Team');
      return response.data;
    } catch (error) {
      console.error('Error fetching Teams data:', error);
    }
  },

  // get Nationalities
  getNationalities: async () => {
    try {
      const response = await axiosInstance.get('/Utility/references?referenceType=Nationality');
      return response.data;
    } catch (error) {
      console.error('Error fetching Nationalities data:', error);
    }
  },

  // get Teams
  getTeamData: async () => {
    try {
      const response = await axiosInstance.get('/Utility/references?referenceType=Team');
      return response.data;
    } catch (error) {
      console.error('Error fetching Teams data:', error);
    }
  },

};

export default api;