import styled from "styled-components";

export const SkillsContainer = styled.div`
	height: 100vh;
	width: 100%;
	background-color: ${({ theme }) => theme.body};
	color: ${({ theme }) => theme.text};
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 10px;
	@media screen and (max-width: 480px) {
		height: 100%;
	}
`;
export const SkillsWrapper = styled.div`
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: start;
	justify-content: space-between;
	flex-wrap: wrap;
	padding: 10px;
	margin-top: 50px;
	gap: 10px;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	place-items: center;
	@media screen and (max-width: 1024px) {
		grid-template-columns: repeat(4, max-content);
	}
	@media screen and (max-width: 768px) {
		grid-template-columns: repeat(3, max-content);
	}
	@media screen and (max-width: 480px) {
		justify-content: center;
		width: 100%;
		gap: 50px;
		grid-template-columns: repeat(2, max-content);
	}
	@media screen and (max-width: 1024px) {
		align-items: center;
	}
`;
export const SkillsHeaderTitle = styled.h1`
	font-size: 1.5rem;
	color: ${({ theme }) => theme.text};
	@media screen and (max-width: 480px) {
		font-size: 1.2rem;
		text-align: center;
	}
`;
export const SkillsDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
	width: 100px;
	padding: 10px;
	border-radius: 10px;
	transition: all 0.3s ease-in-out;
	user-select: none;
	background-color: ${({ theme }) => {
		return theme.name === "light" ? "#F9F5E7" : "#2A303C";
	}};
	&:hover {
		transform: scale(1.1);
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
	}
`;
export const SkillsIcon = styled.img`
	width: 40px;
	height: 40px;
`;
