let URL = '';

export const getFirebaseData = async () => {
  URL = process.env.REACT_APP_MODE === 'prod' ? process.env.REACT_APP_BACKEND_URL : 'http://localhost:3002'
  try {
    const resp = await fetch(`${URL}/cooler`);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error('Error occured while fetching cooler details: ', error);
  }
}


export const performCoolerOperations = async (payload) => {
  URL = process.env.REACT_APP_MODE === 'prod' ? process.env.REACT_APP_BACKEND_URL : 'http://localhost:3002'
  try {
    await fetch(`${URL}/coolerOp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error('Error occured while fetching cooler details: ', error);
  }
}