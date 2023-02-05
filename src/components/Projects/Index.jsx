import React, { memo, useEffect, useRef } from "react";
import {
	Card,
	CardBody,
	CardFooter,
	CardFooterA,
	CardTags,
	CardTagsP,
	CardsContainer,
	ProjectsContainer,
	ProjectsHeaderTitle,
	ProjectsWrapper,
} from "./Projects.styles";

function Contact() {
	const PROJECTS = [
		{
			id: 1,
			title: "Snap-shots",
			description:
				"A TypeScript MERN stack CRUD application with state management using Redux.",
			tags: ["REACT", "NODE", "EXPRESS", "MONGODB", "JWT", "REST-API"],
			githubLink: "https://github.com/jpranays/Snapshots",
		},
		{
			id: 2,
			title: "Private Chat App",
			description:
				"A Full-Stack MERN real-time application built using web-sockets.",
			tags: [
				"sOCKET.IO",
				"REACT",
				"NODE",
				"EXPRESS",
				"MONGODB",
				"JWT",
				"REST-API",
			],
			githubLink: "https://github.com/jpranays/chat-application",
		},
		{
			id: 3,
			title: "Agro-Consultant",
			description:
				"A website which recommends the best crop to grow, fertilizers to use and the diseases caught by your crops.",
			tags: ["FLASK", "HTML", "CSS", "JS"],
			githubLink: "http://bit.ly/3kfTyrw",
		},
		{
			id: 4,
			title: "React-Recipe-App",
			description:
				"A React application which fetches recipes from an API and displays them.",
			tags: ["REACT", "API", "HTML", "CSS", "JS"],
			githubLink: "https://github.com/jpranays/React-Recipe-App",
		},
		{
			id: 5,
			title: "HTML-CSS-UI-Challenges",
			description:
				"HTML and CSS UI challenges from various websites like Frontend Mentor, Youtube, etc.",
			tags: ["HTML", "SASS", "JS"],
			githubLink: "https://github.com/jpranays/HTML_CSS_JS_Projects",
		},
		{
			id: 6,
			title: "React-Pokemon-App",
			description:
				"A React application which fetches pokemon data from an API and displays them.",
			tags: ["REACT", "API", "HTML", "CSS", "JS"],
			githubLink: "https://github.com/jpranays/REACT_pokemon_app",
		},
		{
			id: 7,
			title: "React-Framer-Motion-App",
			description:
				"A React application which uses framer-motion library to animate the components.",
			tags: ["REACT", "FRAMER-MOTION", "HTML", "CSS", "JS"],
			githubLink: "https://github.com/jpranays/react-recipe-web-app",
		},
	];
	return (
		<ProjectsContainer id="projects">
			<ProjectsHeaderTitle>Projects & some work</ProjectsHeaderTitle>
			<ProjectsWrapper>
				<CardsContainer>
					{PROJECTS.map(({ id, title, description, tags, githubLink }) => {
						return (
							<Card key={id}>
								<p>{title}</p>
								<CardBody>
									<h2>{description}</h2>
									<CardTags>
										<CardTagsP>{tags.join(" ")}</CardTagsP>
									</CardTags>
								</CardBody>
								<CardFooter>
									<h4>
										<CardFooterA href={githubLink} target="_blank">
											Github Link
										</CardFooterA>
									</h4>
								</CardFooter>
							</Card>
						);
					})}
				</CardsContainer>
				<CardFooterA href="https://github.com/jpranays" target="_blank">
					And many more on my Github
				</CardFooterA>
			</ProjectsWrapper>
		</ProjectsContainer>
	);
}

export default memo(Contact);
