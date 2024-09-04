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
	const containerRef = useRef(null);
	const PROJECTS = [
		{
			id: 0,
			title: "React-fast-hooks",
			description:
				"A collection of custom React hooks",
			tags: ["REACT", "TYPESCRIPT", "HOOKS"],
			githubLink: "https://github.com/jpranays/react-fast-hooks",
		},
		{
			id: 8,
			title: "Ui Challenges",
			description:
				"A collection of UI challenges from various websites like Frontend Mentor, Youtube, etc.",
			tags: ["HTML", "SASS", "JS"],
			githubLink: "https://github.com/jpranays/UI-challenges",
		},
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
			demoLink: "https://jpranays-recipe-app.netlify.app/",
		},
		{
			id: 5,
			title: "HTML-CSS-UI-Challenges",
			description:
				"HTML and CSS UI challenges from various websites like Frontend Mentor, Youtube, etc.",
			tags: ["HTML", "SASS", "JS"],
			githubLink: "https://github.com/jpranays/HTML_CSS_JS_Projects",
			demoLink: "https://github.com/jpranays/HTML_CSS_JS_Projects#readme",
		},
		{
			id: 6,
			title: "React-Pokemon-App",
			description:
				"A React application which fetches pokemon data from an API and displays them.",
			tags: ["REACT", "API", "HTML", "CSS", "JS"],
			githubLink: "https://github.com/jpranays/REACT_pokemon_app",
			demoLink: "https://jpranays-react-pokemon-app.netlify.app/",
		},
		{
			id: 7,
			title: "React-Framer-Motion-App",
			description:
				"A React application which uses framer-motion library to animate the components.",
			tags: ["REACT", "FRAMER-MOTION", "HTML", "CSS", "JS"],
			githubLink: "https://github.com/jpranays/react-recipe-web-app",
			demoLink: "https://jpranays-react-recipe-web-app.netlify.app/",
		},
	];
	useEffect(() => {
		containerRef.current.addEventListener("mouseover", (e) => {
			let activeCard = document.querySelector(".preactive");
			if (activeCard) {
				document.querySelector(".preactive").classList.remove("preactive");
			}
		});
	}, []);
	return (
		<ProjectsContainer id="projects">
			<ProjectsHeaderTitle>Projects & some work</ProjectsHeaderTitle>
			<ProjectsWrapper>
				<CardsContainer ref={containerRef}>
					{PROJECTS.map(
						({ id, title, description, tags, githubLink, demoLink }) => {
							return (
								<Card key={id} className={id === 8 ? "preactive" : ""}>
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
										{demoLink && (
											<h4>
												<CardFooterA href={demoLink} target="_blank">
													Live Demo
												</CardFooterA>
											</h4>
										)}
									</CardFooter>
								</Card>
							);
						}
					)}
				</CardsContainer>
				<CardFooterA href="https://github.com/jpranays" target="_blank">
					And many more on my Github
				</CardFooterA>
			</ProjectsWrapper>
		</ProjectsContainer>
	);
}

export default memo(Contact);
