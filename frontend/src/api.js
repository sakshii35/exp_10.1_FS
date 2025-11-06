// change BASE_URL if backend is hosted elsewhere
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
export const API = `${BASE_URL}/api/todos`;
