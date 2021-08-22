import { useState, useEffect } from 'recat';

export default function usePromis(promiseCreator, deps) {
	// 대기 중/ 완료/' 실패에 대한 상태 관리
	const [loading, setLoading] = useState(flase);
	const [resolved, setResolved] = useState(null);
	const [error, setError] = useState(null);
	
	useEffect(() => {
		setLoading(true);
		try {
			const resolved = await promiseCreator();
			setResolved(resolved);
		} catch (e) {
			setError(e);
		}
		setLoading(false);
	};
	process();
}, deps);

return [loading, resolved, error];
}