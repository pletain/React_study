import { createAction } from 'redux-actions';

//액션 타입 정의하기
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
//액션 생성 함수 만들기
//createAction을 사용하면 매번 객체를 직접 만들어주지 않아도 됨.
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

//초기 상태 및 리듀서 함수 만들기
const initialState = {
	number: 0
}
//handleActions로 리듀서 함수 간단하게 작성
//첫 번째 파라미터에는 각 액션에 대한 업데이트 함수를 넣고
//두 번째 파라미터에는 초기 상태를 넣어줌 
const counter = handleActions(
{
	[INCREASE]: (state, action) => ({ number: state.number + 1}),
	[DECREASE]: (state, action) => ({ number: state.number - 1}),
},
initialState,
)



export default counter;