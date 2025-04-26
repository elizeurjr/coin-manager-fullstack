<<<<<<< HEAD
import api from './api';

export async function signUp(email, password) {
  const response = await api.post('/users', { email, password });
  return response.data;
}
//
=======
import api from './api';

export async function signUp(email, password) {
  const response = await api.post('/users', { email, password });
  return response.data;
}
//
>>>>>>> f8635ec35210507233f94112cb7aa20c22387894
