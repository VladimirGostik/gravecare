import axios from 'axios';

const API_URL = 'https://example.com/api';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Vráti údaje o používateľovi
  } catch (error) {
    console.error('Login error:', error);
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
  }
};

export const registerEntrepreneurAPI = async (personalData, companyData) => {
  try {
    // const response = await fetch('/api/submitRegistration', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     ...personalData,  // Osobné údaje
    //     ...companyData    // Profesionálne údaje
    //   }),
    // });

    // if (!response.ok) {
    //   throw new Error('Chyba pri registrácii: ' + response.statusText);
    // }

    // const data = await response.json();
    console.log(personalData);
    console.log(companyData);
    return "Vsetko ok";
  } catch (error) {
    console.error('Chyba pri registrácii:', error);
    throw error;
  }
};

