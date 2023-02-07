import { useEffect } from "react";

function useIntersectionObs(setActiveLink, containerArray) {
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveLink(entry.target.id);
					}
				});
			},
			{
				root: null,
				rootMargin: "0px",
				threshold: 0.5,
			}
		);
		containerArray.forEach((container) => {
			const target = document.querySelector(`#${container}`);
			observer.observe(target);
		});
	}, []);
}

export default useIntersectionObs;
