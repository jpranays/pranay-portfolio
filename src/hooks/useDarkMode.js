import { useEffect, useState } from "react";

export function useDarkMode() {
	const [currentTheme, setCurrentTheme] = useState("dark");
	useEffect(() => {
		const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
			.matches
			? "dark"
			: "light";

		if (systemTheme === "dark") {
			setCurrentTheme("dark");
		} else {
			setCurrentTheme("light");
		}
		function handleThemeChange(e) {
			if (e.matches) {
				setCurrentTheme("dark");
			} else {
				setCurrentTheme("light");
			}
		}
		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", handleThemeChange);

		return () => {
			window
				.matchMedia("(prefers-color-scheme: dark)")
				.removeEventListener("change", handleThemeChange);
		};
	}, []);
	return [currentTheme, setCurrentTheme];
}
