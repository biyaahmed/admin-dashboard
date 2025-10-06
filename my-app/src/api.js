const API_BASE_URL = 'https://ordersbackend.breadsquared.com/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

// Admin authentication functions
export const adminLogin = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const adminLogout = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/logout`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Logout failed: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const adminRegister = async (name, email, password) => {
  const response = await fetch(`${API_BASE_URL}/admin/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    throw new Error(`Registration failed: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

// Admin data functions
export const getAdminOrders = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/orders`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const getOrderDetails = async (orderId) => {
  const response = await fetch(`${API_BASE_URL}/admin/orders/${orderId}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch order details: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const getAdminStats = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/stats`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch stats: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

// Public functions
export const createOrder = async (orderData) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error(`Failed to create order: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const getStates = async () => {
  const response = await fetch(`${API_BASE_URL}/states`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch states: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
