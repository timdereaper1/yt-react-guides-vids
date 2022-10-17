import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetchRelatedProductsFromApi } from './apis';
import App from './App';

jest.mock('./apis');

const mockedFetchRelatedProducts = fetchRelatedProductsFromApi as jest.MockedFn<
	typeof fetchRelatedProductsFromApi
>;

test('should show related products when products is entered', async () => {
	mockedFetchRelatedProducts.mockResolvedValue(['product 1', 'product 2']);
	render(<App />);
	userEvent.type(screen.getByRole('textbox', { name: /product/i }), 'my product');
	expect(screen.getByDisplayValue('my product')).toBeInTheDocument();
	await screen.findByText('product 1');
	expect(mockedFetchRelatedProducts).toHaveBeenCalledWith('my product');
});
