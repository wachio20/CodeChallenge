const axios = require('axios');

export async function getAvailableDrinks() {
    try {
      return await axios.get('/dispenser/getavailabledrinks');
    } catch (error) {
      console.error(error);
      return []
    }
}

export async function updateAvailableDrinks(drinks) {
    try {
      return await axios.post('/dispenser/updateavailabledrinks', drinks);
    } catch (error) { 
      return {status: error.response.status, data: error.response.data}
    }
}

export async function processPurchase(coins, total) {
  try {
    return await axios.post(`/dispenser/ProcessPurchase/${total}`, coins)
  } catch (error) { 
    return {status: error.response.status, data: error.response.data}
  }
}