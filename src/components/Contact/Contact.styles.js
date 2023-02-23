import styled from "styled-components";

export const ContactContainer = styled.div`
	width: 100%;
	background-color: ${({ theme }) => theme.body};
	color: ${({ theme }) => theme.text};
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 100vh;
	scroll-snap-align: start;
`;
export const ContactsWrapper = styled.div`
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	gap: 50px;
	padding: 10px;
	margin-top: 50px;
	form {
		width: 50%;
		display: flex;
		flex-direction: column;
		gap: 15px;
		@media screen and (max-width: 480px) {
			width: 100%;
			button {
				width: 50%;
				align-self: center;
			}
		}
		#name,
		#email,
		#message {
			color: ${({ theme }) => theme.text};
		}
		button {
			align-self: center;
			margin-top: 15px;
		}
	}
	.profile-container {
		display: flex;
		align-items: center;
		gap: 5px;
		#github-icon,
		#linkedin-icon,
		#email-icon {
			color: ${({ theme }) => theme.text};
		}
	}
`;
export const ContactsHeaderTitle = styled.h1`
	font-size: 1.5rem;
	color: ${({ theme }) => theme.text};
	@media screen and (max-width: 480px) {
		font-size: 1.2rem;
		text-align: center;
	}
`;
