import axios from 'axios';

export const getDays = () => axios.get('/api/days');
export const getDay = dayId => axios.get(`/api/days/${dayId}`);
export const createDay = today => axios.post('/api/days', { day: today });