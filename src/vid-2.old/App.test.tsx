import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from './App';

const server = setupServer(
	rest.get('https://myapi.endpoint.com/api/names', (req, res, ctx) =>
		res(ctx.json(['Hello world']))
	)
);

beforeAll(() => {
	server.listen();
});

afterAll(() => {
	server.close();
});

test('should show Hello world', async () => {
	render(<App />);
	await screen.findByText('Hello world');
});
