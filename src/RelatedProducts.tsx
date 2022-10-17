import React from 'react';
import { fetchRelatedProductsFromApi } from './apis';
import { showNotification } from './utils';

export default function RelatedProducts({ product }: { product: string }) {
	const [relatedProducts, setRelatedProducts] = React.useState<string[]>([]);

	React.useEffect(() => {
		if (!product) return setRelatedProducts([]);
		const formatProduct = product.replace('$8', '');
		fetchRelatedProductsFromApi(formatProduct)
			.then((loadedProductsFromApi) => {
				setRelatedProducts(loadedProductsFromApi);
			})
			.catch(() => {
				showNotification({
					type: 'error',
					message: 'Sorry could not load related products from server',
				});
			});
	}, [product]);

	return (
		<ul>
			{relatedProducts.map((relatedProduct) => (
				<li key={relatedProduct}>{relatedProduct}</li>
			))}
		</ul>
	);
}
