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

export const number_format = (
	number,
	IsConvertRequired = false,
	digits = 2
) => {
	let n = number;
	if (!isNaN(n)) {
		if (IsConvertRequired) {
			n /= 1000;
		}
		n = digits > 0 ? Number(n).toFixed(digits) : Number(n);
	}

	n += "";
	const arr = n.split(".");
	const re = /(\d{1,3})(?=(\d{3})+$)/g;
	return (
		arr[0].replace(re, "$1,") +
		(arr.length == 2 ? `.${arr[1]}` : "") +
		(IsConvertRequired ? " ('000)" : "")
	);
};

export const classNames = classNameList => {
	if (!classNameList || classNameList?.length < 0) {
		return "";
	}

	return classNameList.filter(Boolean).join(" ");
};
