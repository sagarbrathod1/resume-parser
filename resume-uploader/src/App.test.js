import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  fireEvent.click(screen.getByText("Upload"));

  expect(getByText(/Hello World/i)).toBeInTheDocument();
});
