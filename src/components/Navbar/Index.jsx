import React, { memo, useEffect } from "react";
import {
	Nav,
	NavLink,
	NavLinkA,
	NavLinks,
	ToggleButton,
	ToggleButtonLine,
} from "./Navbar.styles";
import { IconButton } from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
function Navbar({ currentTheme, setCurrentTheme, activeLink }) {
	const [open, setOpen] = React.useState(false);
	const [scrolled, setScrolled] = React.useState(false);
	const handleClick = () => {
		setOpen(!open);
	};
	function handleScroll() {
		if (window.scrollY > 100) {
			setScrolled(true);
		} else {
			setScrolled(false);
		}
	}
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	function handleNavLinkClick(e) {
		const target = e.target.dataset.href;
		const element = document.querySelector(target);
		element.scrollIntoView({ behavior: "smooth" });
		setOpen(false);
	}

	return (
		<Nav scrolled={scrolled}>
			<NavLinks open={open}>
				<NavLink>
					<NavLinkA
						data-href="#about"
						onClick={handleNavLinkClick}
						activeLink={activeLink}
					>
						Me
					</NavLinkA>
				</NavLink>
				<NavLink>
					<NavLinkA
						data-href="#skills"
						onClick={handleNavLinkClick}
						activeLink={activeLink}
					>
						Skills
					</NavLinkA>
				</NavLink>
				<NavLink>
					<NavLinkA
						data-href="#projects"
						onClick={handleNavLinkClick}
						activeLink={activeLink}
					>
						Projects
					</NavLinkA>
				</NavLink>
				<NavLink>
					<NavLinkA
						data-href="#contact"
						onClick={handleNavLinkClick}
						activeLink={activeLink}
					>
						Contact
					</NavLinkA>
				</NavLink>
				<NavLink>
					<NavLinkA
						data-href="#interests"
						onClick={handleNavLinkClick}
						activeLink={activeLink}
					>
						Interests
					</NavLinkA>
				</NavLink>
				<NavLink>
					<NavLinkA
						data-href="#resume"
						onClick={() => {
							window.open("/resume.pdf", "_blank");
						}}
					>
						Resume <OpenInNewIcon />
					</NavLinkA>
				</NavLink>
			</NavLinks>
			<IconButton
				sx={{
					position: "absolute",
					right: "1rem",
					top: "1rem",
				}}
				onClick={() => {
					setCurrentTheme(currentTheme === "dark" ? "light" : "dark");
				}}
				className="theme-toggle"
				size="large"
			>
				{currentTheme === "dark" ? (
					<Brightness7Icon color="primary" />
				) : (
					<Brightness4Icon />
				)}
			</IconButton>
			<ToggleButton onClick={handleClick}>
				<ToggleButtonLine open={open} />
				<ToggleButtonLine open={open} />
				<ToggleButtonLine open={open} />
			</ToggleButton>
		</Nav>
	);
}

export default memo(Navbar);
