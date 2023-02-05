import React, { memo, useEffect, useRef } from "react";
import {
	InterestContent,
	InterestDiv,
	InterestImg,
	InterestOverlay,
	InterestsContainer,
	InterestsHeaderTitle,
	InterestsWrapper,
} from "./Interests.styles";

function Contact() {
	return (
		<InterestsContainer id="interests">
			<InterestsHeaderTitle>I like</InterestsHeaderTitle>
			<InterestsWrapper>
				<InterestDiv>
					<InterestImg src="/running.webp" />
					<InterestOverlay />
					<InterestContent>Gym</InterestContent>
				</InterestDiv>
				<InterestDiv>
					<InterestImg src="/bike-trips.webp" />
					<InterestOverlay />
					<InterestContent>Bike Trips</InterestContent>
				</InterestDiv>
				<InterestDiv>
					<InterestImg src="/boxing.webp" />
					<InterestOverlay />
					<InterestContent>Boxing</InterestContent>
				</InterestDiv>
				<InterestDiv>
					<InterestImg src="/inspecting.webp" />
					<InterestOverlay />
					<InterestContent>Inspecting Web Pages</InterestContent>
				</InterestDiv>
				<InterestDiv>
					<InterestImg src="/ufc.webp" />
					<InterestOverlay />
					<InterestContent>UFC</InterestContent>
				</InterestDiv>
			</InterestsWrapper>
		</InterestsContainer>
	);
}

export default memo(Contact);
