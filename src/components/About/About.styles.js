import styled, { keyframes } from "styled-components";

export const AboutContainer = styled.div`
	height: 90vh;
	width: 100%;
	background-color: ${({ theme }) => theme.body};
	color: ${({ theme }) => theme.text};
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
export const AboutWrapper = styled.div`
	width: 100%;
	height: 80%;
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	align-items: start;
	@media screen and (max-width: 1024px) {
		flex-direction: column;
		align-items: center;
	}
`;
export const Span = styled.span`
	align-self: center;
`;
export const NameWrapper = styled.div`
	display: grid;
	justify-content: center;
	height: 80%;
	width: 40%;
	align-items: center;
	align-content: center;
	grid-template-columns: repeat(6, max-content);
	grid-gap: 1rem;
	@media screen and (max-width: 1024px) {
		width: 100%;
		height: 100%;
	}
	@media screen and (max-width: 768px) {
		overflow: hidden;
	}
	div:nth-child(10) {
		justify-self: center;
	}
	${({ theme }) => {
		if (theme.name === "dark") {
			return `        
        div:nth-child(-n + 6) {
			-webkit-text-stroke: 0.2vw rgba(224, 48, 4, 0.979);
		}
		div:nth-child(n + 7):nth-child(-n + 11) {
			-webkit-text-stroke: 0.2vw #fff;
		}
		div:nth-child(n + 12):nth-child(-n + 17) {
			-webkit-text-stroke: 0.2vw green;
		}`;
		} else {
			return `
		div:nth-child(-n + 6) {
			-webkit-text-stroke: 0.2vw rgba(224, 48, 4, 0.979);
			text-shadow: 0 0 0.2vw rgba(224, 48, 4, 0.979);
		}
		div:nth-child(n + 7):nth-child(-n + 11) {
			-webkit-text-stroke: 0.2vw #fff;
			text-shadow: 0 0 10px rgba(0,0,0,1);
		}
		div:nth-child(n + 12):nth-child(-n + 17) {
			-webkit-text-stroke: 0.2vw green;
			text-shadow: 0 0 0.2vw green;
		}
	
		`;
		}
	}}
	div:nth-child(11) {
		grid-column: 5/-1;
		justify-self: start;
	}
`;
const myAnim = keyframes`
from{
    transform: translateY(50px) scale(2) translateX(10px) translateZ(10px) rotate(0deg);
}
to {
    transform: translateY(0px) scale(1) translateX(0px) translateZ(0px) rotate(360deg);
    opacity: 1;
}
`;

export const HeroTextWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80%;
	width: 50%;
	@media screen and (max-width: 768px) {
		width: 100%;
	}
`;
export const Name = styled.div`
	font-size: 64px;
	font-family: sans-serif;
	-webkit-text-fill-color: ${({ theme: { name } }) => {
		if (name === "dark") {
			return `transparent`;
		} else {
			return `#fff`;
		}
	}};
	-webkit-text-stroke: 0.2vw rgba(224, 48, 4, 0.979);
	transition: transform 1s, opacity 1s;
	transform: translateY(-20px) translateX(20px);
	opacity: 1;
	@media screen and (max-width: 768px) {
		font-size: 2.5rem;
	}
	&.anim {
		animation: ${myAnim} 1s forwards;
	}
`;
export const HeroText = styled.h1`
	font-size: 3.5rem;
	color: ${({ theme }) => theme.text};
	@media screen and (max-width: 768px) {
		font-size: 2.5rem;
	}
`;
export const TypingLine = styled.span`
	width: 5px;
	height: 50px;
	background: royalblue;
	animation: blink 0.2s linear infinite;
	@keyframes blink {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
`;
