import React from 'react';
import { MdAdd } from 'react-icons/md'; //컴포넌트처럼 아이콘을 사용할 수 있다.
import './TodoInsert.scss';

const TodoInsert = () => {
	return (
		<form className="TodoInsert">
			<input placeholder="할 일을 입력하세요" />
			<button type="submit">
				<MdAdd />
			</button>
		</form>
	);
};

export default TodoInsert;