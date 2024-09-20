import styled from "styled-components";

export const InterestsContainer = styled.div`
	width: 100%;
	background-color: ${({ theme }) => theme.body};
	color: ${({ theme }) => theme.text};
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	min-height: unset !important;
`;
export const InterestsWrapper = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(3, minmax(max-content, 1fr));
	align-items: center;
	margin-top: 50px;
	overflow: hidden;
	padding: 50px;
	border-radius: 20px;
	@media screen and (max-width: 480px) {
		grid-template-columns: repeat(2, 1fr);
		padding: 10px;
	}
`;
export const InterestsHeaderTitle = styled.h1` 

	font-size: 1.5rem;
	color: ${({ theme }) => theme.text};
	@media screen and (max-width: 480px) {
		font-size: 1.2rem;
		text-align: center;
	}
`;
export const InterestDiv = styled.div`
	width: 100%;
	position: relative;
	height: 250px;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
	transition: all 0.5s ease;
	overflow: hidden;
	&:hover {
		border-radius: 20px;
		transform: scale(1.1);
	}
	cursor: default;
`;
export const InterestImg = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	position: absolute;
	top: 0;
	left: 0;
	overflow: hidden;
	transition: all 0.5s ease;
	filter: blur(1.5px);
`;
export const InterestOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	transition: all 0.5s ease;
`;
export const InterestContent = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 1.5rem;
	transition: all 0.5s ease;
	text-align: center;
	color: #fff;
	font-style: italic;
	text-transform: uppercase;
	text-shadow: 1px 2px #f26a2e;
`;
