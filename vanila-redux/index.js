const divToggle = document.querySelector('.toggle');
const counter = document.querySelector('h1');
const btnIncrease = document.querySelectro('#increase');
const btnDecrease = document.querySelector('#decrease');

const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

const toggleSwitch = () => {{ type: TOGGLE_SWITCH }};
const increase = difference => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

const initialState = {
	toggle: false,
	counter: 0
};

const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = difference => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

const initialState = {
	toggle: false,
	counter: 0
};

//state가 undefined일 때는 initialState를 기본값으로 사용
function reducer(state = initialState, action) {
	//action.type에 따라 다른 작업을 처리함
	switch(action.type) {
		case TOGGLE_SWITCH:
			return {
				...state, //불변성 유지를 해 주어야 합니다.
				toggle: !.state.toggle
			};
		case INCREASE:
			return {
				...state,
				counter: state.counter + action.difference
			};
		case DECREASE:
			return {
				...state,
				counter: state.counter - 1
			};
		default: 
			return state;
	}
}

const store = createStore(reducer);

const render = () => {
	const state = store.getState(); //현재 상태를 불러옵니다.
	//토글 처리
	if (state.toggle) {
		divToggle.classList.add('active');
	} else {
		divToggle.classList.remove('active');
	}
	//카운터처리
	counter.innerText = state.counter;
};




//상태가 업데이트될 때마다 호출
//리액트의 render 함수와 다르게 html로 이미 만들어진 UI 속성을 상태에 따라 변경
render();
store.subscribe(render);














