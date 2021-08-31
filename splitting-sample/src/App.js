import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import loadable from '@loadable/component';
const SplitMe = loadable(() => import('./SplitMe'), {
	fallback: <div>loading...</div>
});

function App() {
	const [visible, setVisible] = useState(false);
	const onClick = () => {
		setVisible(true);
	};
	const onMouseOver = () => {
		SplitMe.preload();
	};
	return (
	<div className="App">
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<p onClick={onClick} onMouseOver={onMouseOver}>Hello React!</p> 
			{visible && <SplitMe />}
			</header>
		</div>
		);
	}
//Hello React! 위에 마우스 커서를 올리기만 해도 로딩이 시작됨.(커서 올리는 시점에서 파일이 불어와짐)
//클릭했을 때 렌더링 됨.
export default App;
