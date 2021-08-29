//useActions Hook 은 액션 생성 함수를 액션을 디스패치하는 함수로 변환해줌
//첫 번째 파라미터에는 액션 생성 함수로 이뤄어진 배열
//두 번째 파라미터는 deps배열이며, 이 배열 안에 들어 있는 원소가 바뀌면 액션을 디스패치

import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

export default function useActions(actions, deps) {
	const dispatch = useDispatch();
	return useMemo(
	() => {
		if (Array.isArray(actions)) {
		return actions.map(a => bindActionCreators(a, dispatch));
	}
	return bindActionCreators(actions, dispatch);
		},
	deps ? [dispatch, ...deps] : deps
	);
}