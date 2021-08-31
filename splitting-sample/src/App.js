import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const App extends Component {
	state = {
	SpliteMe: null
	};
	
	handleClick = async () => {
		const loadeMoudle = await import('./SpliteMe');
		this.setState({
			SpliteMe: loadedModule.default
		});
	};
	render() {
		const { SpliteMe } = this.state;
		return (
		<div className="App">
			<header className="App-header">
				<img src={logo} calssName="App-log" alt="logo" />
				<p onClick={this.handleClick}>Hello React!</p>
				{SpliteMe && <SpliteMe />}
			</header>
		</div>
		);
	}
}

export default App;
