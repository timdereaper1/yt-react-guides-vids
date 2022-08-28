import { useEffect, useState } from 'react';

export default function App() {
	const [data, setData] = useState([]);
	useEffect(() => {
		fetch('https://myapi.endpoint.com/api/names')
			.then((res) => res.json())
			.then(setData);
	}, []);
	return (
		<div>
			{data.map((datum) => (
				<span>{datum}</span>
			))}
		</div>
	);
}
