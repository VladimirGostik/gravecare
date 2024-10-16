import axios from 'axios';

const API_URL = 'https://example.com/api/orders';



// Funkcia na získanie všetkých objednávok
export const getOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;  // Vráti zoznam objednávok
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Funkcia na vytvorenie novej objednávky
// V Services/orders.js
export const createOrder = async (orderData) => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) {
    throw new Error('Chyba pri vytváraní objednávky');
  }
  return await response.json();
};




// Funkcia na aktualizáciu objednávky
export const updateOrder = async (orderId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${orderId}`, updatedData);
    return response.data;  // Vráti aktualizovanú objednávku
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

// Funkcia na zmazanie objednávky
export const deleteOrder = async (orderId) => {
  try {
    await axios.delete(`${API_URL}/${orderId}`);
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};
