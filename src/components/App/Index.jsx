import { ThemeProvider } from "styled-components";
import { useDarkMode } from "../../hooks/useDarkMode";
import { GlobalStyle } from "../../styles/Global";
import { useEffect } from "react";
function App() {
	const [currentTheme, setCurrentTheme] = useDarkMode();
	const theme = {
		lightTheme: {
			body: "#f1f1f1",
			text: "#121620",
		},
		darkTheme: {
			body: "#121620",
			text: "#f1f1f1",
		},
	};
	return (
		<ThemeProvider
			theme={currentTheme === "light" ? theme.lightTheme : theme.darkTheme}
		>
			<GlobalStyle />
			<h1>Vite + React</h1>
		</ThemeProvider>
	);
}

export default App;
/*
Container
Navbar 
main intro animation 1] Typing 2] Jen Simmons
skills 
projects
contact
footer
*/
