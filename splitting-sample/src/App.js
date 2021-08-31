import React, { useState, Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
const SpliteMe = React.lazy(() => import('./SpliteMe'));


function App() {
	const [visible, setVisible] = useState(flase);
	const onClick = () => {
		setVisible(true);
	};
	return (
	<div className="App">
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<p onClick={onClick}>Hello React!</p>
			<Suspense fallback={<div>loading...</div>}>
				{visible && <SpliteMe />}
			</Suspense>
			</header>
		</div>
		);
	}

export default App;
