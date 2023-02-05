import React, { memo, useEffect, useRef } from "react";
import {
	SkillsDiv,
	SkillsIcon,
	SkillsContainer,
	SkillsHeaderTitle,
	SkillsWrapper,
} from "./Skills.styles";

function Skills() {
	return (
		<SkillsContainer id="skills">
			<SkillsHeaderTitle>I have good knowledge of following</SkillsHeaderTitle>
			<SkillsWrapper>
				<SkillsDiv>
					<SkillsIcon src="https://img.icons8.com/color/48/000000/html-5.png" />
					<p>HTML</p>
				</SkillsDiv>
				<SkillsDiv>
					<SkillsIcon src="https://img.icons8.com/color/48/000000/css3.png" />
					<p>CSS</p>
				</SkillsDiv>
				<SkillsDiv>
					<SkillsIcon src="https://img.icons8.com/color/48/000000/sass.png" />
					<p>Sass</p>
				</SkillsDiv>
				<SkillsDiv>
					<SkillsIcon src="https://img.icons8.com/color/48/000000/javascript.png" />
					<p>JavaScript</p>
				</SkillsDiv>
				<SkillsDiv>
					<SkillsIcon src="https://img.icons8.com/color/48/000000/typescript.png" />
					<p>TypeScript</p>
				</SkillsDiv>
				<SkillsDiv>
					<SkillsIcon src="https://img.icons8.com/color/48/000000/react-native.png" />
					<p>React</p>
				</SkillsDiv>
				<SkillsDiv>
					<SkillsIcon src="https://img.icons8.com/color/48/000000/redux.png" />
					<p>Redux</p>
				</SkillsDiv>
				<SkillsDiv>
					<SkillsIcon src="https://img.icons8.com/color/48/000000/nodejs.png" />
					<p>Node</p>
				</SkillsDiv>
				<SkillsDiv>
					<SkillsIcon src="https://img.icons8.com/color/48/000000/express.png" />
					<p>Express</p>
				</SkillsDiv>
				<SkillsDiv>
					<SkillsIcon src="https://img.icons8.com/color/48/000000/mongodb.png" />
					<p>MongoDB</p>
				</SkillsDiv>
				<SkillsDiv>
					<SkillsIcon src="https://img.icons8.com/color/48/000000/mysql-logo.png" />
					<p>MySQL</p>
				</SkillsDiv>
				<SkillsDiv>
					<SkillsIcon src="https://img.icons8.com/color/48/000000/git.png" />
					<p>Git</p>
				</SkillsDiv>
				<SkillsDiv>
					<SkillsIcon src="https://img.icons8.com/color/48/000000/github.png" />
					<p>GitHub</p>
				</SkillsDiv>
				<SkillsDiv>
					<SkillsIcon src="https://img.icons8.com/color/48/000000/visual-studio-code-2019.png" />
					<p>VS Code</p>
				</SkillsDiv>
				<SkillsDiv>
					<SkillsIcon src="https://img.icons8.com/color/48/000000/figma--v1.png" />
					<p>Figma</p>
				</SkillsDiv>
			</SkillsWrapper>
		</SkillsContainer>
	);
}

export default memo(Skills);
