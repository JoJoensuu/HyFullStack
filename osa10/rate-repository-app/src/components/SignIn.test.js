import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import SignIn from './SignIn';
import { MemoryRouter } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';

jest.mock('../hooks/useSignIn', () => ({
    __esModule: true, // This line is crucial for jest to understand that it's a module
    default: jest.fn(() => [
      jest.fn().mockResolvedValue(true), // Mocking the signIn function to always succeed
      {} // Mocking the result object, can be expanded to include loading, error states, etc.
    ]),
  }));

describe('SignIn', () => {
    const mockSignIn = jest.fn();
    useSignIn.mockReturnValue([mockSignIn]);
    describe('SignInContainer', () => {
      it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
        render(
                <MemoryRouter>
                    <SignIn />
                </MemoryRouter>
          );

        fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle');
        fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
        fireEvent.press(screen.getByText('Sign in'));
        // render the SignInContainer component, fill the text inputs and press the submit button
        await waitFor(() => {
            expect(mockSignIn).toHaveBeenCalledTimes(1);
            expect(mockSignIn).toHaveBeenCalledWith({
              username: 'kalle',
              password: 'password'
            });
          });
      });
    });
  });