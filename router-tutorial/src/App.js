import React from 'react';
import { Route, Link } from 'react-router-dom';
import About from './About';
import Home from './Home';

const App = () => {
	return (
	<div>
		<ul>
			<li>
			<Link to="/">홈</Link>
			</li>
			<li>
			<Link to="/about">소개1</Link>
			</li>
			<li>
			<Link to="/info">소개2</Link>
			</li>
		</ul>
		<Route path="/" component={Home} exact={true}/>
		<Route path="/about, '/info'" component={About} />
	</div>
	);
};

export default App;