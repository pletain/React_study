import React from 'react';
import {
	MdCheckBoxOutlineBlank,
	MdCheckBox,
	MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({ todo, onRemove, onToggle }) => {
	const { id, text, checked } = todo;
	return (
	<div className="TodoListItem">
	<div className={cn('checkbox', { checked })} onClick={() => onToggle(id)}>
		{ checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
		<div className="text">{text}</div>
	</div>
	<div className="remove" onClick={() => onRemove(id)}>
	<MdRemoveCircleOutline />
	</div>
	</div>
	);
};

//React.memo로 감싸주기만 하면 된다.
// 이제 TodoListItem 컴포넌트는 todo, onRemove, onToggle이 바뀌지 않으면 리렌더링 하지 X
export default React.memo(TodoListItem);

