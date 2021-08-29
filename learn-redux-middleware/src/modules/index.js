//루트 리듀서 생성
import { combineReducers } from 'redux';
import counter from './counter';

const rootReducer = combineReducers({
	counter
});

export default rootReducer;