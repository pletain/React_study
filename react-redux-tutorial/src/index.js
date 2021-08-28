import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux' //리액트 컴포넌트에서 스토어를 사용할 수 있도록 App 컴포넌트를 감싸줌
import './index.css';
import App from './App';
import rootReducer from './modules';

const store = createStore(rootReducer);


ReactDOM.render(
	<Provider store={sotre}>
	<App />
	</Provider>,
	document.getElementByID('root'),
);
