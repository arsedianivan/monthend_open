import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../components/Login';
import '@testing-library/jest-dom/extend-expect';

test('renders Login component', () => {
    render(<Login setToken={jest.fn()} />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
});

test('allows user to login', async () => {
    const mockSetToken = jest.fn();
    render(<Login setToken={mockSetToken} />);

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText(/Login/i));

    // Simulate a delay for async request
    await new Promise(r => setTimeout(r, 1000));

    expect(mockSetToken).toHaveBeenCalled();
});
