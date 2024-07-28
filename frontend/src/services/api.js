import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  return response.data;
};

export const addExpense = async (expenseData, token) => {
  const response = await axios.post(`${API_URL}/expenses`, expenseData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getExpenses = async (token) => {
  const response = await axios.get(`${API_URL}/expenses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteExpense = async (expenseId, token) => {
  const response = await axios.delete(`${API_URL}/expenses/${expenseId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}



export const addIncome = async (incomeData, token) => {
  const response = await axios.post(`${API_URL}/incomes`, incomeData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getIncomes = async (token) => {
  const response = await axios.get(`${API_URL}/incomes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteIncome = async (incomeId, token) => {
  const response = await axios.delete(`${API_URL}/incomes/${incomeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export const getSpendingAnalysis = async (token) => {
  const response = await axios.get(`${API_URL}/analysis/spending-patterns`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


