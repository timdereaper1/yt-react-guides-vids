import { render, screen } from '@testing-library/react';
import { fetchRelatedProductsFromApi } from './apis';
import RelatedProducts from './RelatedProducts';

jest.mock('./apis');

const mockedFetchRelatedProducts = fetchRelatedProductsFromApi as jest.MockedFn<
	typeof fetchRelatedProductsFromApi
>;

test('should show related products when there is product to search', async () => {
	mockedFetchRelatedProducts.mockResolvedValue(['product 1', 'product 2']);
	render(<RelatedProducts product="searching product&8" />);
	await screen.findByText('product 1');
	await screen.findByText('product 2');
	expect(mockedFetchRelatedProducts).toHaveBeenCalledWith('searching product');
});

test('should not show any related products when there is no product to search', () => {
	render(<RelatedProducts product="" />);
	expect(mockedFetchRelatedProducts).not.toHaveBeenCalled();
});
