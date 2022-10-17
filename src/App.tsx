import React from 'react';
import RelatedProducts from './RelatedProducts';

export default function App() {
	const [value, setValue] = React.useState({
		product: '',
		quantity: 0,
	});

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setValue({ ...value, [event.target.name]: event.target.value });
	}

	return (
		<form>
			<input
				type="text"
				placeholder="Product"
				value={value.product}
				name="product"
				onChange={handleChange}
				id="product"
				aria-label="product"
			/>
			<input
				type="number"
				value={value.quantity}
				placeholder="Quantity"
				name="quantity"
				onChange={handleChange}
			/>
			<button type="submit">Submit</button>
			<RelatedProducts product={value.product} />
		</form>
	);
}
