import React, { memo, useEffect, useRef } from "react";
import { ContactContainer } from "./Contact.styles";

function Contact() {
	return <ContactContainer id="contact" />;
}

export default memo(Contact);
