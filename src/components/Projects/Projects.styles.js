import styled from "styled-components";

export const ProjectsContainer = styled.div`
	width: 100%;
	background-color: ${({ theme }) => theme.body};
	color: ${({ theme }) => theme.text};
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
export const ProjectsWrapper = styled.div`
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	justify-content: space-between;
	margin-top: 50px;
	gap: 50px;
`;
export const CardsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(11, 1fr);
	padding: 15px;
	width: 100%;
	overflow-x: scroll;
	&::-webkit-scrollbar {
		height: 0.5rem;
	}
`;
export const Card = styled.div`
	display: flex;
	flex-direction: column;
	background: ${({ theme }) =>
		theme.name === "light" ? "#f8ead8;" : "#2A303C"};
	box-shadow: 0 0 10px 0
		${({ theme }) =>
			theme.name === "light" ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.5)"};
	border-radius: 15px;
	width: 300px;
	height: 350px;
	padding: 20px;
	user-select: none;
	margin-left: -130px;
	transition: all 0.2s ease;
	position: relative;
	gap: 10px;
	&:first-child {
		box-shadow: none;
	}
	&:hover {
		margin-right: 130px;
		transform: rotate(5deg);
	}
	&:nth-child(1) {
		margin-left: 0;
	}
`;

export const CardBody = styled.div`
	font-size: 0.8rem;
	height: 180px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
export const CardTags = styled.div`
	margin-top: 10px;
	max-width: 90%;
`;
export const CardTagsP = styled.p`
	font-size: 13px;
	color: #ff7a18;
	text-transform: uppercase;
`;
export const CardFooter = styled.div`
	margin-top: auto;
	display: flex;
	justify-content: start;
	align-items: center;
	padding: 5px 10px;
	cursor: pointer;
	width: max-content;
`;
export const CardFooterA = styled.a`
	text-decoration: underline;
	color: ${({ theme }) => theme.text};
	&:hover {
		color: #ff7a18;
	}
`;

export const ProjectsHeaderTitle = styled.h1`
	font-size: 1.5rem;
	color: ${({ theme }) => theme.text};
	@media screen and (max-width: 480px) {
		font-size: 1.2rem;
		text-align: center;
	}
`;
