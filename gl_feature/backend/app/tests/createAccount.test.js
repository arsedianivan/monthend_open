// src/tests/CreateAccount.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateAccount from '../components/CreateAccount';
import '@testing-library/jest-dom/extend-expect';

test('renders CreateAccount component', () => {
    render(<CreateAccount />);
    expect(screen.getByLabelText(/Account Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Parent ID/i)).toBeInTheDocument();
});

test('allows user to create an account', () => {
    render(<CreateAccount />);
    
    fireEvent.change(screen.getByLabelText(/Account Number/i), { target: { value: '1001' } });
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Cash' } });
    fireEvent.change(screen.getByLabelText(/Type/i), { target: { value: 'Asset' } });
    fireEvent.change(screen.getByLabelText(/Parent ID/i), { target: { value: '' } });

    fireEvent.click(screen.getByText(/Create Account/i));

    expect(screen.getByLabelText(/Account Number/i).value).toBe('');
    expect(screen.getByLabelText(/Name/i).value).toBe('');
    expect(screen.getByLabelText(/Type/i).value).toBe('');
    expect(screen.getByLabelText(/Parent ID/i).value).toBe('');
});
