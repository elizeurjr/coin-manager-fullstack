<<<<<<< HEAD
import api from './api';

export async function signIn(email, password) {
  const response = await api.post('/auth/sign-in', { email, password });
  return response.data;
}
//
=======
import api from './api';

export async function signIn(email, password) {
  const response = await api.post('/auth/sign-in', { email, password });
  return response.data;
}
//
>>>>>>> f8635ec35210507233f94112cb7aa20c22387894
