import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
	const [storedValue, setStoredValue] = useState<T>(initialValue);

	useEffect(() => {
		if (typeof localStorage === "undefined") return;
		// Retrieve from localStorage
		const item = localStorage.getItem(key);
		if (item) setStoredValue(JSON.parse(item) as T);
	}, [key]);

	const setValue = (value: T) => {
		setStoredValue(value);
		// Persist to localStorage
		localStorage.setItem(key, JSON.stringify(value));
	};

	return [storedValue, setValue];
}
