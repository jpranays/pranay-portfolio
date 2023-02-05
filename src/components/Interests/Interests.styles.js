import styled from "styled-components";

export const InterestsContainer = styled.div`
	width: 100%;
	background-color: ${({ theme }) => theme.body};
	color: ${({ theme }) => theme.text};
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
export const InterestsWrapper = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	align-items: center;
	margin-top: 150px;
	overflow: hidden;
	@media screen and (max-width: 480px) {
		grid-template-columns: repeat(3, 1fr);
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
	border-radius: 10px;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
	transition: all 0.5s ease;
	&:hover {
		transform: scale(1.1);
	}
`;
export const InterestImg = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	position: absolute;
	top: 0;
	left: 0;
	transition: all 0.5s ease;
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
`;
