import { combineReducers } from 'redux'; //스토어를 만들 때는 리듀서를 하나만 사용해야 함. 기존에 만든 리듀서를 이 유틸 함수로 하나로 함쳐줌
import counter from './counter';
import todos from './todos';

const rootReducer = combineReducers({
	counter,
	todos,
});

export default rootReducer;

//파일 이름을 index.js로 설정해 주면 나중에 디렉터리 이름까지만 입력하여
//불러올 수 있다. 
//import rootReducer form './modules';