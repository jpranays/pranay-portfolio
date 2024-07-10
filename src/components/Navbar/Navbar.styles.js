import styled from "styled-components";
export const Nav = styled.nav`
	height: 10vh;
	min-height: 70px;
	position: sticky;
	top: 0;
	transition: all 0.5s ease;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
	background-color: ${({ theme }) => theme.body};
	@media screen and (max-width: 768px) {
		.theme-toggle {
			right: 5rem;
		}
	}
	z-index: 10;
`;
export const NavLinks = styled.ul`
	display: flex;
	height: 100%;
	justify-content: space-evenly;
	align-items: center;
	margin-left: auto;
	@media screen and (max-width: 768px) {
		position: fixed;
		inset:0;
		flex-direction: column;
		justify-content: center;
		background-color: ${({ theme: { name } }) =>
			name === "light" ? "#fff" : "#2A303C"};
		clip-path: circle(0px at 90% -10%);
		-webkit-clip-path: circle(0px at 90% -10%);
		transition: all 0.7s ease-in-out;
		clip-path: ${({ open }) =>
			open ? "circle(2000px at 90% -10%)" : "circle(0px at 90% -10%)"};
		-webkit-clip-path: ${({ open }) =>
			open ? "circle(2000px at 90% -10%)" : "circle(0px at 90% -10%)"};
	}
`;
export const NavLink = styled.li`
	list-style: none;
`;
export const NavLinkA = styled.a`
	text-decoration: none;
	cursor: pointer;
	color: ${({ theme }) => theme.text};
	font-size: 1.5rem;
	transition: all 0.3s ease;
	position: relative;
	font-weight: 500;
	user-select: none;
	color: ${(props) => {
		return props.activeLink == props["data-href"].substring(1)
			? "#f26a2e"
			: props.theme.text;
	}};
	&:hover {
		color: #f26a2e;
	}
	&:after {
		content: "";
		display: block;
		width: 0;
		height: 2px;
		background: #f26a2e;
		transition: width 0.3s;
	}

	&:hover:after {
		width: 100%;
		left: 0;
		position: absolute;
	}
	@media screen and (max-width: 768px) {
		font-size: 1.8rem;
		text-align: center;
		padding: 2rem 0;
		width: 100%;
		display: table;
		transition: all 0.3s ease;
	}
`;
export const ToggleButton = styled.div`
	@media screen and (max-width: 768px) {
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		border: none;
		cursor: pointer;
		z-index: 1;
	}
`;
export const ToggleButtonLine = styled.div`
	@media screen and (max-width: 768px) {
		width: 2rem;
		height: 0.3rem;
		background: ${({ theme }) => theme.text};
		margin-bottom: 0.5rem;
		border-radius: 10px;
		transition: all 0.3s linear;
		&:nth-child(1) {
			transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
			transform-origin: 1px;
		}
		&:nth-child(2) {
			opacity: ${({ open }) => (open ? "0" : "1")};
			transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
		}
		&:nth-child(3) {
			transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
			transform-origin: 1px;
		}
	}
`;
