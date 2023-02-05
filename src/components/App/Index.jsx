import { ThemeProvider } from "styled-components";
import { useDarkMode } from "../../hooks/useDarkMode";
import { GlobalStyle } from "../../styles/Global";
import Navbar from "../Navbar/Index";
import About from "../About/Index";
import Skills from "../Skills/Index";
import Projects from "../Projects/Index";
import Contact from "../Contact/Index";
import Interests from "../Interests/Index";
import { useState } from "react";
import useIntersectionObs from "../../hooks/useIntersectionObs";
function App() {
	const [currentTheme, setCurrentTheme] = useDarkMode();
	const [activeLink, setActiveLink] = useState("about");
	const theme = {
		lightTheme: {
			name: "light",
			body: "#FFFBF5",
			text: "#121620",
		},
		darkTheme: {
			name: "dark",
			body: "#1F242D",
			text: "#f1f1f1",
		},
	};
	useIntersectionObs(setActiveLink, [
		"about",
		"skills",
		"projects",
		"contact",
		"interests",
	]);
	return (
		<ThemeProvider
			theme={currentTheme === "light" ? theme.lightTheme : theme.darkTheme}
		>
			<GlobalStyle />
			<Navbar
				currentTheme={currentTheme}
				setCurrentTheme={setCurrentTheme}
				activeLink={activeLink}
			/>
			<About />
			<Skills />
			<Projects />
			<Contact />
			<Interests />
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
