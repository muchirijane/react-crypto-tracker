import { useState, useEffect } from 'react';
import axios from 'axios';
import Coin from './Coin/Coin';
import './App.css';

const App = () => {
	const [ coins, setCoins ] = useState([]);
	const [ search, setSearch ] = useState('');
	useEffect(() => {
		axios
			.get(
				'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
			)
			.then((res) => {
				setCoins(res.data);
				console.log(res.data);
			})
			.catch((error) => console.log(error));
	}, []);

	const searchHandler = (e) => {
		setSearch(e.target.value);
	};
	const filteredCoins = coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()));

	return (
		<div className="coin-app">
			<div>
				<h1>React cryptocurrency tracker </h1>
				<h2>Cryptocurrency Prices by Market Cap</h2>
			</div>
			<div className="coin-search">
				<h3 className="coin-text"> Search any currency</h3>
				<form>
					<input type="text" className="coin-input" placeholder="search" onChange={searchHandler} />
				</form>
			</div>
			{filteredCoins.map((coin) => {
				return (
					<Coin
						key={coin.id}
						name={coin.name}
						image={coin.image}
						price={coin.current_price}
						symbol={coin.symbol}
						marketCap={coin.market_cap}
						priceChange={coin.price_change_percentage_24h}
						volume={coin.total_volume}
					/>
				);
			})}
		</div>
	);
};

export default App;
