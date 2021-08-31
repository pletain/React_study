import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
	const onClick = () => {
		import('./notify').then(ressult => result.default()); //import 함수를 이용하면 Promise를 반환
		// main 파일 안에 저장하지 않고 파일을 따로 분리시켜서 저장함.
	};
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
		  <p onClick={onClick}>Hello React!</p>
      </header>
    </div>
  );
}

export default App;
