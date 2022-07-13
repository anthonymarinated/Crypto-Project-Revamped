import React from 'react';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import App from '../client/App';

/**
 * @jest-environment jsdom
 */

describe('App', () => {
    test('renders App component', () => {
      render(<App />);
    });
  });

  