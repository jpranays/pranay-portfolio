import { useEffect, useState } from "react";

export function useDarkMode() {
	const [currentTheme, setCurrentTheme] = useState("light");
	useEffect(() => {
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
