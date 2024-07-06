import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from './Login';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders login form and handles input', () => {
  const { getByPlaceholderText, getByText } = render(
    <Router>
      <Login />
    </Router>
  );

  const emailInput = getByPlaceholderText('Email');
  const passwordInput = getByPlaceholderText('Password');
  const submitButton = getByText('Login');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });

  expect(emailInput.value).toBe('test@example.com');
  expect(passwordInput.value).toBe('password');

  fireEvent.click(submitButton);
});
