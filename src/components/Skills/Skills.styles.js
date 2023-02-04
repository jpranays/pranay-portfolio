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
`;
