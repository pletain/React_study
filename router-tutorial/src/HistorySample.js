import React, { Component } from 'react';

class HistorySample extends Component {
	//뒤로 가기
	handleGoBack = () => {
		this.props.history.goBack();
	};
	
	//홈으로 이동
	handleGoHome = () => {
		this.props.history.push('/');
	};
	
	componentDidMount() {
		//이 설정 이후 페이지에 변화 생기려고 할 떄마다 정말 나갈 것인지 질문함
		this.unblock = this.props.history.block('정말 떠나실 건가요?');
	}
	
	componentWillUnmount() {
		//컴포넌트가 언마운트되면 질문을 멈춤
		if (this.unblock) {
			this.unblock();
		}
	}
	
	render() {
		return (
		<div>
			<button onClick={this.handleGoBack}>뒤로</button>
			<button onClick={this.handleGoHome}>홈으로</button>
		</div>
		);
	}
}
			
export default HistorySample;