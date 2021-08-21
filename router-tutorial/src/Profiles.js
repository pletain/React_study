import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import Profile from './Profile';

const Profiles = () => {
	const activeStyle = {
		background: 'black',
		color: 'white'
	};
	return (
	<div>
		<h3>사용자 목록:</h3>
		<ul>
			<li>
				<NavLink activeStyle={activeStyle} to="/profiles/velopert">
					velopert
				</NavLink>
			</li>
			<li>
				<NavLink activeStyle={activeStyle} to="/profiles/pletain">
					pletain
				</NavLink>
			</li>
		</ul>
		
			<Route
				path="/profiles"
				exact //JSX에서 props 설정 시 값을 생략하면 자동으로 true
				render={() => <div>사용자를 선택해 주세요.</div>} //라우터에서 컴포넌트 대신 render라는 props를 전달해줌
			/>
			
			<Route path="/profiles/:username" component={Profile} />
		</div>
		
	);
};

export default Profiles;