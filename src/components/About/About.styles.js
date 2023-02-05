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
	height: 100%;
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	border: 1px solid blue;
	display: flex;
	.container {
		display: grid;
		border: 1px solid red;
		height: 80%;
		width: 50%;
		align-items: center;
		align-content: center;
		grid-template-columns: repeat(6, max-content);
		grid-gap: 1rem;
		div:nth-child(11) {
			grid-column: 5/-1;
			justify-self: start;
		}
		.line {
			width: 5px;
			height: 50px;
			background: royalblue;
			animation: blink 0.2s linear infinite;
		}
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
export const Name = styled.div`
	font-size: 64px;
	font-family: sans-serif;
	-webkit-text-fill-color: transparent;
	-webkit-text-stroke: 0.2vw rgba(224, 48, 4, 0.979);
	transition: transform 1s, opacity 1s;
	transform: translateY(-20px) translateX(20px);
	opacity: 1;
	&.anim {
		animation: ${myAnim} 1s forwards;
	}
`;
