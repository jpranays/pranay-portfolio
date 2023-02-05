import React, { memo, useEffect, useRef } from "react";
import { AboutContainer, AboutWrapper, Name } from "./About.styles";
import { useTypingAnim } from "../../hooks/useTypingAnim";

function About() {
	let counter;
	useEffect(() => {
		counter = setInterval(anim, 250);
		let i = 0;
		function anim() {
			let span = document.querySelectorAll(".container div")[i];
			i++;
			if (i == 17) {
				clearInterval(counter);
			}
			span.classList.add("anim");
		}
		useTypingAnim(
			"Passionate Full-Stack MERN Developer",
			document.querySelector(".hero-text")
		);
	}, []);
	return (
		<AboutContainer id="about">
			<AboutWrapper>
				<span>Hello World,</span>
				<div className="container">
					<Name>P</Name>
					<Name>R</Name>
					<Name>A</Name>
					<Name>N</Name>
					<Name>A</Name>
					<Name>Y</Name>
					<Name>S</Name>
					<Name>U</Name>
					<Name>N</Name>
					<Name>I</Name>
					<Name>L</Name>
					<Name>J</Name>
					<Name>A</Name>
					<Name>D</Name>
					<Name>H</Name>
					<Name>A</Name>
					<Name>V</Name>
				</div>
				<div className="container">
					<h1 className="hero-text"></h1>
					<span className="line"></span>
				</div>
			</AboutWrapper>
		</AboutContainer>
	);
}

export default memo(About);
