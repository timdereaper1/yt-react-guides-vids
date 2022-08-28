import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App, { getRolesAndPrivilegesByUsername, TableBody, UserContext } from './App';

describe('TableBody', () => {
	test('should show the roles of the user', () => {
		const accessRoles = getRolesAndPrivilegesByUsername('Timothy');
		render(
			<UserContext.Provider
				value={{ user: { username: 'Timothy', accessRoles }, onUserChange: jest.fn() }}
			>
				<TableBody />
			</UserContext.Provider>
		);
		expect(screen.getByText(/Administrator/i)).toBeInTheDocument();
	});
});

describe('App', () => {
	test('Show user', async () => {
		render(<App />);
		userEvent.type(screen.getByLabelText('Enter Username'), 'Timothy');
		userEvent.click(screen.getByRole('button'));
		await screen.findByText(/Administrator/i);
	});
});
