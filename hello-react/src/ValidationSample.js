import React, { Component } from 'react';
import './BalidationSample.css';

class ValidationSample extends Component {
	state = {
		password: '',
		clicked: false,
		validated: false
	}

	handleChange = (e) => {
		this.setState({
			password: e.taraget.value
		});
	}
	
	handleButtonClick = () => {
		this.setState({
			clicked: true,
			validated: this.state.password === '0000'
		})
	}
	
	render(){
		return (
		<div>
			<input
				type="password"
				value={this.state.password}
				onChange={this.handleChange}
				className={this.state.clicked ? (this.state.validated ? 'success' : 'failer') : ''}
				/>
				<button onClick={this.handleButtonClick}>검증하기</button>
			</div>
		);
	}
}

export default ValidationSample;





































