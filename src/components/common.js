export const setCookie = (cookieName, cookieValue, exdays) => {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	const expires = `expires=${d.toUTCString()}`;
	if (typeof document !== "undefined") {
		document.cookie = `${cookieName}=${cookieValue};${expires};path=/`;
	}
};

export const readCookie = cookieName => {
	if (typeof document !== "undefined") {
		const match = document.cookie.match(
			new RegExp(`(^| )${cookieName}=([^;]+)`)
		);
		return match ? match[2] : null;
	}
	return null;
};

export const deleteCookie = cookieName => setCookie(cookieName, null, 0);

export const setLocalStorage = (key, data) => {
	localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorage = key => {
	const json = localStorage.getItem(key);

	return json ? JSON.parse(json) : undefined;
};

export const removeLocalStorage = key => {
	localStorage.removeItem(key);
};

export const classNames = classNameList => {
	if (!classNameList || classNameList?.length < 0) {
		return "";
	}

	return classNameList.filter(Boolean).join(" ");
};
