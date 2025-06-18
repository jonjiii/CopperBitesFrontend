import axios from 'axios';

const API_URL = 'http://localhost:8080';

export async function getPlates() {
  try {
    const response = await axios.get('http://localhost:8080/api/dishes'); // 👈 AÑADE /api
    return response.data.data;
  } catch (error) {
    console.error('Error al obtener los platos:', error);
    return [];
  }
}



