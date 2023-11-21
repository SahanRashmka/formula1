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
  saveDriver: async (driverData) => {
    try {
      const response = await axiosInstance.post('/Driver', driverData);
      return response.data;
    } catch (error) {
      console.error('Error fetching Driver data:', error);
      throw error;
    }
  },

  // delete Driver
  deleteDriver: async (driverID) => {
    try {
      const response = await axiosInstance.delete(`/Driver/${driverID}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting Driver:', error);
      throw error;
    }
  },

  // save Team
  saveTeam: async (teamData) => {
    try {
      const response = await axiosInstance.post('/Team', teamData);
      return response.data;
    } catch (error) {
      console.error('Error fetching Team data:', error);
      throw error;
    }
  },

  // delete Team
  deleteTeam: async (teamID) => {
    try {
      const response = await axiosInstance.delete(`/Team/${teamID}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting Team:', error);
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

  // get Manufacturers
  getManufacturers: async () => {
    try {
      const response = await axiosInstance.get('/Utility/references?referenceType=Manufacturer');
      return response.data;
    } catch (error) {
      console.error('Error fetching Manufacturers data:', error);
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
  
  // get Drivers for drop down
  getDriverData: async () => {
    try {
      const response = await axiosInstance.get('/Utility/references?referenceType=Driver');
      return response.data;
    } catch (error) {
      console.error('Error fetching Drivers data:', error);
    }
  },

};

export default api;
