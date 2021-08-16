import React, {useCallback} from 'react';
import { List } from 'react-virtualized';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

//여러 종류의 값을 전달해야 하는 경우에는 객체로 통쨰로 전달하는 편이 나중에 성능 최적화를 할 때 편리함
const TodoList = ({ todos, onRemove, onToggle }) => {
	const rowRenderer = useCallback(
	({ index, key, style }) => {
		const todo = todos[index];
		return (
		<TodoListItem
			todo={todo}
			key={key}
			onRemove={onRemove}
			onToggle={onToggle}
			style={style}
			/>
			);
	},
	[onRemove, onToggle, todos],
	);
	
	return (
		<List
			className="TodoList"
			width={512} //전체 크기
			height={513} //전체 높이
			rowCount={todos.length} // 항목 개수
			rowHeight={57}
			rowRenderer={rowRenderer}
			list={todos} //배열
			style={{outline: 'none'}} //List에 기본 적용되는 outline 스타일 제거
		/>
		);
};

export default React.memo(TodoList);
