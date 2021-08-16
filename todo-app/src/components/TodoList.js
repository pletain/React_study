import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

//여러 종류의 값을 전달해야 하는 경우에는 객체로 통쨰로 전달하는 편이 나중에 성능 최적화를 할 때 편리함
const TodoList = ({ todos, onRemove, onToggle }) => {
	return (
		<div className="TodoList">
			{todos.map(todo => (
				<TodoListItem
					todo={todo}
					key={todo.id}
					onRemove={onRemove}
					onToggle={onToggle}
					/>
			))}
		</div>
	);
};

export default React.memo(TodoList);
