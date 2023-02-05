import React, { memo, useEffect, useRef } from "react";
import {
	ContactContainer,
	ContactsHeaderTitle,
	ContactsWrapper,
} from "./Contact.styles";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import {
	Button,
	FormControl,
	FormHelperText,
	TextField,
	IconButton,
	Snackbar,
	Alert,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
function Contact() {
	const validationSchema = Yup.object({
		name: Yup.string().required().min(3).max(20),
		email: Yup.string().required().email(),
		message: Yup.string().required().min(10).max(100),
	});
	function handleIconClick(location) {
		window.open(location, "_blank");
	}
	const encode = (data) => {
		return Object.keys(data)
			.map(
				(key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
			)
			.join("&");
	};
	const [snackBarState, setSnackBarState] = React.useState({
		open: false,
		message: "",
		severity: "",
	});
	function handleSubmit(formValues, props) {
		fetch("/", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: encode({ "form-name": "contact", ...formValues }),
		})
			.then(() => {
				setSnackBarState({
					open: true,
					message: "Message sent successfully!",
					severity: "success",
				});
				props.resetForm();
			})
			.catch((rr) => {
				setSnackBarState({
					open: true,
					message: "Message failed to send!",
					severity: "error",
				});
			});
	}
	function handleClose() {
		setSnackBarState({ ...snackBarState, open: false });
	}
	function SnackBarMsg() {
		return (
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={snackBarState.open}
				onClose={handleClose}
			>
				<Alert
					onClose={handleClose}
					severity={snackBarState.severity}
					sx={{ width: "100%" }}
				>
					{snackBarState.message}
				</Alert>
			</Snackbar>
		);
	}
	return (
		<ContactContainer id="contact">
			<SnackBarMsg />
			<ContactsHeaderTitle>Send me a message</ContactsHeaderTitle>
			<ContactsWrapper>
				<Formik
					initialValues={{
						name: "",
						email: "",
						message: "",
					}}
					onSubmit={(formValues, props) => {
						handleSubmit(formValues, props);
					}}
					validationSchema={validationSchema}
				>
					<Form autoComplete="off" autoSave="off" autoCorrect="off" noValidate>
						<Field name="name">
							{({ field, form }) => {
								return (
									<FormControl
										error={Boolean(form.touched.name && form.errors.name)}
									>
										<TextField
											{...field}
											placeholder="Name"
											error={Boolean(form.touched.name && form.errors.name)}
											sx={{
												border:
													Boolean(form.touched.name && form.errors.name) ===
														false && "1px solid #fff",
											}}
											InputProps={{
												style: {
													color: "#fff",
												},
											}}
											id="name"
										/>
										<FormHelperText>
											<ErrorMessage name="name" />
										</FormHelperText>
									</FormControl>
								);
							}}
						</Field>
						<Field name="email">
							{({ field, form }) => {
								return (
									<FormControl
										error={Boolean(form.touched.email && form.errors.email)}
									>
										<TextField
											{...field}
											placeholder="Email"
											error={Boolean(form.touched.email && form.errors.email)}
											sx={{
												border:
													Boolean(form.touched.email && form.errors.email) ===
														false && "1px solid #fff",
											}}
											InputProps={{
												style: {
													color: "#fff",
												},
											}}
											id="email"
											autoComplete="false"
											autoCorrect="off"
											autoCapitalize="off"
											spellCheck="false"
										/>
										<FormHelperText>
											<ErrorMessage name="email" />
										</FormHelperText>
									</FormControl>
								);
							}}
						</Field>
						<Field name="message">
							{({ field, form }) => {
								return (
									<FormControl
										error={Boolean(form.touched.message && form.errors.message)}
									>
										<TextField
											multiline
											rows={4}
											{...field}
											placeholder="Message"
											error={Boolean(
												form.touched.message && form.errors.message
											)}
											sx={{
												border:
													Boolean(
														form.touched.message && form.errors.message
													) === false && "1px solid #fff",
											}}
											InputProps={{
												style: {
													color: "#fff",
												},
											}}
											id="message"
										/>
										<FormHelperText>
											<ErrorMessage name="message" />
										</FormHelperText>
									</FormControl>
								);
							}}
						</Field>

						<Button color="primary" variant="contained" type="submit">
							Send Message
						</Button>
					</Form>
				</Formik>
				<div className="profile-container">
					<IconButton
						size="large"
						onClick={() => {
							handleIconClick("https://github.com/jpranays");
						}}
					>
						<GitHubIcon
							size="large"
							sx={{
								color: "#fff",
								transform: "scale(1.5)",
							}}
							id="github-icon"
						/>
					</IconButton>
					<IconButton
						size="large"
						onClick={() => {
							handleIconClick("https://www.linkedin.com/in/jpranays/");
						}}
					>
						<LinkedInIcon
							size="large"
							sx={{
								color: "#fff",
								transform: "scale(1.5)",
							}}
							id="linkedin-icon"
						/>
					</IconButton>
					<IconButton
						size="large"
						onClick={() => {
							handleIconClick("https://www.leetcode.com/jpranays/");
						}}
					>
						<img
							src="https://leetcode.com/_next/static/images/logo-dark-c96c407d175e36c81e236fcfdd682a0b.png"
							width={25}
							id="leetcode-icon"
						/>
					</IconButton>
					<IconButton
						size="large"
						onClick={() => {
							handleIconClick("mailto:someone@example.com");
						}}
					>
						<EmailIcon
							size="large"
							sx={{
								color: "#fff",
								transform: "scale(1.5)",
							}}
							id="email-icon"
						/>
					</IconButton>
				</div>
			</ContactsWrapper>
		</ContactContainer>
	);
}

export default memo(Contact);
