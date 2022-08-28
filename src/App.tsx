import { useState } from 'react';

export default function App() {
	const [name, setName] = useState('none');
	const options = [
		{
			onClick: () => setName('first'),
			text: 'First',
			active: name === 'first',
		},
		{
			onClick: () => setName('second'),
			text: 'Second',
			active: name === 'second',
		},
		{
			onClick: () => setName('none'),
			text: 'None',
			active: name === 'none',
		},
		{
			onClick: () => setName('unique'),
			element: <div>Component</div>,
			active: name === 'unique',
		},
	];
	return (
		<>
			<List options={options} />
			<p>Selected option: {name}</p>
		</>
	);
}

function List({
	options,
}: {
	options: Array<
		| { text: string; onClick: () => void; active: boolean }
		| { onClick: () => void; element: JSX.Element }
	>;
}) {
	const [searchWord, setSearchWord] = useState('');

	const optionsToShow = searchWord
		? options.filter((option) => {
				if ('element' in option) return false;
				return option.text.toLowerCase().includes(searchWord.toLowerCase());
		  })
		: options;

	return (
		<ul>
			<input
				type="search"
				name="search"
				id="search"
				value={searchWord}
				onChange={(e) => setSearchWord(e.currentTarget.value)}
			/>
			{optionsToShow.map((option, i) =>
				'text' in option ? (
					<li
						key={i}
						onClick={option.onClick}
						className={`${option.active ? 'active' : ''}`}
					>
						{option.text}
					</li>
				) : (
					<li key={i} onClick={option.onClick}>
						{option.element}
					</li>
				)
			)}
		</ul>
	);
}
