import React, { memo, useEffect, useRef } from "react";
import {
	AboutContainer,
	AboutWrapper,
	HeroText,
	HeroTextWrapper,
	Name,
	NameWrapper,
	Span,
	TypingLine,
} from "./About.styles";
import { useTypingAnim } from "../../hooks/useTypingAnim";

function About() {
	const MYNAMETEXT = "PRANAYSUNILJADHAV";
	let counter;
	useEffect(() => {
		counter = setInterval(anim, 250);
		let i = 0;
		function anim() {
			let span = document.querySelectorAll(".container div")[i];
			i++;
			if (i == 17) {
				clearInterval(counter);
				i = 0;
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
				<Span>
					Hello World,
					<br />
				</Span>
				<Span>Myself</Span>
				<NameWrapper className="container">
					{MYNAMETEXT.split("").map((name, index) => (
						<Name key={index}>{name}</Name>
					))}
				</NameWrapper>
				<Span>& I'm</Span>
				<HeroTextWrapper>
					<HeroText className="hero-text"></HeroText>
					<TypingLine />
				</HeroTextWrapper>
			</AboutWrapper>
		</AboutContainer>
	);
}

export default memo(About);
