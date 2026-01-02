import * as SecureStore from 'expo-secure-store';

export const loginUser = async (voterId, password) => {
  const response = await fetch('YOUR_API_URL/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ voterId, password }),
  });

  const data = await response.json();

  if (response.ok) {
    // Store the token securely
    await SecureStore.setItemAsync('userToken', data.token);
    // You can also store user info if needed
    await SecureStore.setItemAsync('userData', JSON.stringify(data.user));
    return data;
  } else {
    throw new Error(data.message || 'Login failed');
  }
};