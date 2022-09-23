import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import AddNewCustomer from './AddNewCustomer';

const server = setupServer();

beforeAll(() => {
	server.listen();
});

afterAll(() => {
	server.close();
});

describe('AddNewCustomer', () => {
	test('should show the customer name when entered by admin', () => {
		render(<AddNewCustomer />);
		userEvent.type(screen.getByLabelText(/Name/i), 'Marvin Adinblock');
		expect(screen.getByDisplayValue('Marvin Adinblock')).toBeInTheDocument();
	});

	test('should show the customer email when entered by someone', () => {
		render(<AddNewCustomer />);
		userEvent.type(screen.getByRole('textbox', { name: /Email/i }), 'marvin34adin@gmail.com');
		expect(screen.getByLabelText(/Email/i)).toHaveValue('marvin34adin@gmail.com');
	});

	test('should not allow customer registration when form is not filled', async () => {
		render(<AddNewCustomer />);
		userEvent.click(screen.getByRole('button'));
		await screen.findByText('Please ensure that the customer details is filled correctly');
	});

	test('should alert user of customer registration when submission is successful', async () => {
		server.use(
			rest.post('https://customer.ytvids.com/customer', (_, res, ctx) =>
				res(ctx.json({ success: true }))
			)
		);
		render(<AddNewCustomer />);
		userEvent.type(screen.getByLabelText(/Name/i), 'Marvin Adinblock');
		userEvent.type(screen.getByRole('textbox', { name: /Email/i }), 'marvin34adin@gmail.com');
		userEvent.click(screen.getByRole('button'));
		await screen.findByText('Customer added successfully without errors');
	});

	test('should alert user if customer registration fails', async () => {
		server.use(
			rest.post('https://customer.ytvids.com/customer', (_, res, ctx) => res(ctx.status(500)))
		);
		render(<AddNewCustomer />);
		userEvent.type(screen.getByLabelText(/Name/i), 'Marvin Adinblock');
		userEvent.type(screen.getByRole('textbox', { name: /Email/i }), 'marvin34adin@gmail.com');
		userEvent.click(screen.getByRole('button'));
		await screen.findByText(
			'Sorry could not add the new customer. Something happened, please try again.'
		);
	});
});
