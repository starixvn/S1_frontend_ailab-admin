import { useEffect, useRef } from "react";

const useMounted = () => {
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	return isMountedRef;
};

export { useMounted };
